import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";
import { sendWhatsAppText, buildWelcomeMessage, buildTeamNotificationMessage } from "@/lib/whatsapp";
import { sendTeamLeadNotification } from "@/lib/email";

// ─── Validation ────────────────────────────────────────────────────────────────
const leadSchema = z.object({
  name:            z.string().min(2).max(60),
  phone:           z.string().regex(/^[6-9]\d{9}$/),
  projectLocation: z.string().min(3).max(100),
  flatSize:        z.enum(["1BHK", "2BHK", "3BHK", "4BHK", "Villa", "Duplex"]),
  possessionDate:  z.string().min(1),
  budgetRange:     z.enum([
    "Under ₹5 Lakhs", "₹5–10 Lakhs", "₹10–15 Lakhs",
    "₹15–20 Lakhs",   "₹20–30 Lakhs", "Above ₹30 Lakhs",
  ]),
  message: z.string().max(300).optional(),
});

// ─── POST /api/leads ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = leadSchema.parse(body);

    // 1. Save to database
    const [lead] = await query<{ id: string }>(
      `INSERT INTO leads (name, phone, project_location, flat_size, possession_date, budget_range, message, status, source)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'new', 'landing_page')
       RETURNING id`,
      [
        data.name,
        data.phone,
        data.projectLocation,
        data.flatSize,
        data.possessionDate,
        data.budgetRange,
        data.message ?? null,
      ]
    );

    // 2. Send WhatsApp to lead (welcome message)
    // Non-blocking — don't fail submission if WA fails
    sendWhatsAppText({
      to:      data.phone,
      message: buildWelcomeMessage(data.name),
    }).catch((err) => console.error("[WhatsApp] Lead message failed:", err));

    // 3. Send WhatsApp to team (internal notification)
    const teamPhone = process.env.TEAM_WHATSAPP_NUMBER;
    if (teamPhone) {
      sendWhatsAppText({
        to:      teamPhone,
        message: buildTeamNotificationMessage({
          name:            data.name,
          phone:           data.phone,
          projectLocation: data.projectLocation,
          flatSize:        data.flatSize,
          possessionDate:  data.possessionDate,
          budgetRange:     data.budgetRange,
        }),
      }).catch((err) => console.error("[WhatsApp] Team notification failed:", err));
    }

    // 4. Send email to team via SendGrid
    sendTeamLeadNotification({
      name:            data.name,
      phone:           data.phone,
      projectLocation: data.projectLocation,
      flatSize:        data.flatSize,
      possessionDate:  data.possessionDate,
      budgetRange:     data.budgetRange,
    }).catch((err) => console.error("[Email] Team notification failed:", err));

    return NextResponse.json(
      { success: true, data: { id: lead.id } },
      { status: 201 }
    );

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid form data", details: err.errors },
        { status: 400 }
      );
    }
    console.error("[POST /api/leads]", err);
    return NextResponse.json(
      { success: false, error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

// ─── GET /api/leads — for dashboard ───────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page   = parseInt(searchParams.get("page") ?? "1", 10);
    const limit  = parseInt(searchParams.get("limit") ?? "20", 10);
    const offset = (page - 1) * limit;

    const whereClause = status ? "WHERE status = $3" : "";
    const params: (string | number)[] = status
      ? [limit, offset, status]
      : [limit, offset];

    const leads = await query(
      `SELECT id, name, phone, project_location, flat_size, possession_date,
              budget_range, status, source, created_at, updated_at, notes
       FROM leads
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      params
    );

    const [{ count }] = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM leads ${whereClause}`,
      status ? [status] : []
    );

    return NextResponse.json({
      success: true,
      data:    leads,
      meta: {
        total:  parseInt(count, 10),
        page,
        limit,
        pages:  Math.ceil(parseInt(count, 10) / limit),
      },
    });

  } catch (err) {
    console.error("[GET /api/leads]", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
