import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { leads, popupVariants } from "@/db/schema";

type SubmitPayload = {
  phone?: unknown;
  variantKey?: unknown;
  honeypot?: unknown;
};

export async function POST(request: Request) {
  let payload: SubmitPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (typeof payload.honeypot === "string" && payload.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const variantKey = typeof payload.variantKey === "string" ? payload.variantKey : null;

  if (!/^0?9\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  await db.insert(leads).values({
    phone,
    source: "popup",
    popupVariant: variantKey,
  });

  if (variantKey) {
    await db
      .update(popupVariants)
      .set({ submissions: sql`${popupVariants.submissions} + 1` })
      .where(eq(popupVariants.variantKey, variantKey));
  }

  return NextResponse.json({ ok: true });
}
