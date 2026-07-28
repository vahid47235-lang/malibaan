import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { popupVariants } from "@/db/schema";

const VARIANT_COOKIE = "malibaan_popup_variant";

function pickWeighted(variants: (typeof popupVariants.$inferSelect)[]) {
  const totalWeight = variants.reduce((sum, v) => sum + Math.max(0, v.weightPercent), 0);
  if (totalWeight <= 0) return variants[0];

  let roll = Math.random() * totalWeight;
  for (const variant of variants) {
    roll -= Math.max(0, variant.weightPercent);
    if (roll <= 0) return variant;
  }
  return variants[variants.length - 1];
}

export async function GET() {
  const activeVariants = await db.select().from(popupVariants).where(eq(popupVariants.isActive, true));
  if (activeVariants.length === 0) {
    return NextResponse.json({ variant: null });
  }

  const cookieStore = await cookies();
  const existingKey = cookieStore.get(VARIANT_COOKIE)?.value;
  let variant = existingKey ? activeVariants.find((v) => v.variantKey === existingKey) : undefined;

  const isNewImpression = !variant;
  if (!variant) {
    variant = pickWeighted(activeVariants);
  }

  if (isNewImpression) {
    await db
      .update(popupVariants)
      .set({ impressions: sql`${popupVariants.impressions} + 1` })
      .where(eq(popupVariants.id, variant.id));
  }

  const response = NextResponse.json({
    variant: {
      key: variant.variantKey,
      title: variant.title,
      description: variant.description,
      ctaLabel: variant.ctaLabel,
      delaySeconds: variant.delaySeconds,
    },
  });

  if (isNewImpression) {
    response.cookies.set(VARIANT_COOKIE, variant.variantKey, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}
