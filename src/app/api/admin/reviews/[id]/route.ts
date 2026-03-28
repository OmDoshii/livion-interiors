import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { z } from "zod";

const updateSchema = z.object({
  name:       z.string().min(2).max(100).optional(),
  location:   z.string().min(2).max(100).optional(),
  text:       z.string().min(10).max(500).optional(),
  rating:     z.number().int().min(1).max(5).optional(),
  image_url:  z.string().url().nullable().optional(),
  initials:   z.string().min(1).max(4).optional(),
  is_active:  z.boolean().optional(),
  sort_order: z.number().int().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const data = updateSchema.parse(body);

    const fields  = Object.keys(data);
    if (!fields.length) {
      return NextResponse.json({ success: false, error: "Nothing to update" }, { status: 400 });
    }

    const setClauses = fields.map((f, i) => `${f} = $${i + 1}`);
    const values     = [...fields.map((f) => (data as Record<string, unknown>)[f]), params.id];

    const [updated] = await query(
      `UPDATE reviews SET ${setClauses.join(", ")}, updated_at = NOW()
       WHERE id = $${fields.length + 1} RETURNING *`,
      values
    );

    if (!updated) return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("[PATCH /api/admin/reviews/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await query("DELETE FROM reviews WHERE id = $1", [params.id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/reviews/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to delete review" }, { status: 500 });
  }
}
