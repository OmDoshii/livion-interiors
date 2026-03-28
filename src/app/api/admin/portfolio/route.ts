import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { z } from "zod";

const projectSchema = z.object({
  title:       z.string().min(2).max(100),
  location:    z.string().min(2).max(100),
  size:        z.string().min(1).max(50),
  tag:         z.enum(["1BHK", "2BHK", "3BHK", "4BHK", "Villa", "Duplex"]),
  image_url:   z.string().url().optional().nullable(),
  is_active:   z.boolean().default(true),
  is_featured: z.boolean().default(false),
  sort_order:  z.number().int().default(0),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const rows = await query(
      `SELECT * FROM portfolio_projects
       ${all ? "" : "WHERE is_active = true"}
       ORDER BY sort_order ASC, created_at ASC`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("[GET /api/admin/portfolio]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = projectSchema.parse(body);

    const [project] = await query(
      `INSERT INTO portfolio_projects (title, location, size, tag, image_url, is_active, is_featured, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [data.title, data.location, data.size, data.tag,
       data.image_url ?? null, data.is_active, data.is_featured, data.sort_order]
    );

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Invalid data", details: err.errors }, { status: 400 });
    }
    console.error("[POST /api/admin/portfolio]", err);
    return NextResponse.json({ success: false, error: "Failed to create project" }, { status: 500 });
  }
}
