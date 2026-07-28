import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin/session";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-brand-line bg-white p-8 shadow-lg shadow-brand-ink-900/5">
        <h1 className="text-xl font-bold text-brand-ink-900">ورود به پنل مدیریت</h1>
        <p className="mt-1.5 text-sm text-brand-ink-600">پنل مدیریت مالی‌بان</p>
        <LoginForm />
      </div>
    </main>
  );
}
