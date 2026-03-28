import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { z } from "zod";

const reviewSchema = z.object({
  name:      z.string().min(2).max(100),
  location:  z.string().min(2).max(100),
  text:      z.string().min(10).max(500),
  rating:    z.number().int().min(1).max(5).default(5),
  image_url: z.string().url().optional().nullable(),
  initials:  z.string().min(1).max(4),
  is_active: z.boolean().default(true),
  sort_order:z.number().int().default(0),
});

// ─── GET — public fetch for website ───────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true"; // admin fetches all

    const rows = await query(
      `SELECT * FROM reviews
       ${all ? "" : "WHERE is_active = true"}
       ORDER BY sort_order ASC, created_at ASC`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("[GET /api/admin/reviews]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// ─── POST — create new review ──────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = reviewSchema.parse(body);

    const [review] = await query(
      `INSERT INTO reviews (name, location, text, rating, image_url, initials, is_active, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [data.name, data.location, data.text, data.rating,
       data.image_url ?? null, data.initials, data.is_active, data.sort_order]
    );

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Invalid data", details: err.errors }, { status: 400 });
    }
    console.error("[POST /api/admin/reviews]", err);
    return NextResponse.json({ success: false, error: "Failed to create review" }, { status: 500 });
  }
}
