"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { popupVariants } from "@/db/schema";

export async function updateVariantAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const ctaLabel = String(formData.get("ctaLabel") ?? "").trim();
  const delaySeconds = Number(formData.get("delaySeconds") ?? 15);
  const weightPercent = Number(formData.get("weightPercent") ?? 50);
  const isActive = formData.get("isActive") === "on";

  if (!id || !title || !description || !ctaLabel) return;

  await db
    .update(popupVariants)
    .set({
      title,
      description,
      ctaLabel,
      delaySeconds: Math.max(0, delaySeconds),
      weightPercent: Math.min(100, Math.max(0, weightPercent)),
      isActive,
    })
    .where(eq(popupVariants.id, id));

  revalidatePath("/admin/popup");
}

export async function resetStatsAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.update(popupVariants).set({ impressions: 0, submissions: 0 }).where(eq(popupVariants.id, id));
  revalidatePath("/admin/popup");
}
