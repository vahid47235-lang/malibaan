"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function deleteLeadAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!id) return;
  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/admin/leads");
}
