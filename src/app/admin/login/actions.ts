"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { verifyPassword } from "@/lib/admin/password";
import { createSession } from "@/lib/admin/session";

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "ایمیل و رمز عبور را وارد کنید." };
  }

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);

  // Always run a verify to keep timing similar whether the email exists or not.
  const valid = user ? verifyPassword(password, user.passwordHash) : verifyPassword(password, `${"a".repeat(32)}:${"b".repeat(128)}`);

  if (!user || !valid) {
    return { error: "ایمیل یا رمز عبور اشتباه است." };
  }

  await createSession(user.id);
  redirect("/admin");
}
