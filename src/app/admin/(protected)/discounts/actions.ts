"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { discountRules, referralCodes, settings } from "@/db/schema";

export async function createRuleAction(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  const discountPercent = String(formData.get("discountPercent") ?? "0");
  const minCategoriesRaw = String(formData.get("minCategories") ?? "").trim();
  const minServicesRaw = String(formData.get("minServices") ?? "").trim();
  const requiredServiceIds = formData
    .getAll("requiredServiceIds")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n));
  const requiredCategoryIds = formData
    .getAll("requiredCategoryIds")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n));

  if (!label) return;

  await db.insert(discountRules).values({
    label,
    discountPercent,
    minCategories: minCategoriesRaw ? Number(minCategoriesRaw) : null,
    minServices: minServicesRaw ? Number(minServicesRaw) : null,
    requiredCategoryIds: requiredCategoryIds.length > 0 ? requiredCategoryIds : null,
    requiredServiceIds: requiredServiceIds.length > 0 ? requiredServiceIds : null,
  });
  revalidatePath("/admin/discounts");
}

export async function toggleRuleAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const isActive = formData.get("isActive") === "true";
  if (!id) return;
  await db.update(discountRules).set({ isActive: !isActive }).where(eq(discountRules.id, id));
  revalidatePath("/admin/discounts");
}

export async function deleteRuleAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(discountRules).where(eq(discountRules.id, id));
  revalidatePath("/admin/discounts");
}

export async function createReferralCodeAction(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const ownerName = String(formData.get("ownerName") ?? "").trim();
  const discountPercent = String(formData.get("discountPercent") ?? "0");
  if (!code) return;
  await db.insert(referralCodes).values({ code, ownerName: ownerName || null, discountPercent });
  revalidatePath("/admin/discounts");
}

export async function toggleReferralCodeAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const isActive = formData.get("isActive") === "true";
  if (!id) return;
  await db.update(referralCodes).set({ isActive: !isActive }).where(eq(referralCodes.id, id));
  revalidatePath("/admin/discounts");
}

export async function deleteReferralCodeAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(referralCodes).where(eq(referralCodes.id, id));
  revalidatePath("/admin/discounts");
}

export async function updateMaxDiscountAction(formData: FormData) {
  const value = Number(formData.get("maxTotalDiscountPercent") ?? 50);
  await db
    .insert(settings)
    .values({ key: "maxTotalDiscountPercent", value })
    .onConflictDoUpdate({ target: settings.key, set: { value } });
  revalidatePath("/admin/discounts");
}
