"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { categories, services } from "@/db/schema";

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 100);
}

export async function createCategoryAction(formData: FormData) {
  const label = String(formData.get("label") ?? "").trim();
  if (!label) return;
  const slug = slugify(label) || `cat-${Date.now()}`;
  await db.insert(categories).values({ slug, label });
  revalidatePath("/admin/services");
}

export async function deleteCategoryAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/admin/services");
}

export async function createServiceAction(formData: FormData) {
  const categoryId = Number(formData.get("categoryId"));
  const name = String(formData.get("name") ?? "").trim();
  const priceToman = Number(formData.get("priceToman") ?? 0);
  if (!categoryId || !name) return;
  await db.insert(services).values({ categoryId, name, priceToman: Math.max(0, priceToman) });
  revalidatePath("/admin/services");
}

export async function updateServiceAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const name = String(formData.get("name") ?? "").trim();
  const priceToman = Number(formData.get("priceToman") ?? 0);
  const isActive = formData.get("isActive") === "on";
  if (!id || !name) return;
  await db
    .update(services)
    .set({ name, priceToman: Math.max(0, priceToman), isActive, updatedAt: new Date() })
    .where(eq(services.id, id));
  revalidatePath("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/admin/services");
}
