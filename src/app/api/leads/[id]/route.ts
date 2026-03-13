import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/lib/db";

const updateSchema = z.object({
  status: z
    .enum(["new", "contacted", "site_visit", "quotation", "confirmed", "lost"])
    .optional(),
  notes: z.string().max(1000).optional(),
});

// ─── PATCH /api/leads/[id] — update status or notes ───────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    if (!data.status && data.notes === undefined) {
      return NextResponse.json(
        { success: false, error: "Nothing to update" },
        { status: 400 }
      );
    }

    const setClauses: string[] = ["updated_at = NOW()"];
    const values: unknown[]    = [];
    let paramIndex = 1;

    if (data.status) {
      setClauses.push(`status = $${paramIndex++}`);
      values.push(data.status);
    }
    if (data.notes !== undefined) {
      setClauses.push(`notes = $${paramIndex++}`);
      values.push(data.notes);
    }

    values.push(params.id);

    const [lead] = await query(
      `UPDATE leads SET ${setClauses.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: lead });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid data" },
        { status: 400 }
      );
    }
    console.error("[PATCH /api/leads/:id]", err);
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

// ─── DELETE /api/leads/[id] ───────────────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await query("DELETE FROM leads WHERE id = $1", [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/leads/:id]", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
