import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin/session";
import { logoutAction } from "./actions";

const navItems = [
  { href: "/admin", label: "داشبورد" },
  { href: "/admin/services", label: "خدمات و دسته‌بندی‌ها" },
  { href: "/admin/discounts", label: "تخفیف‌ها و کد معرف" },
  { href: "/admin/popup", label: "پاپ‌آپ تماس" },
  { href: "/admin/leads", label: "لیدها" },
];

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-l border-brand-line bg-white p-6 sm:block">
        <p className="text-lg font-bold text-brand-green-900">مالی‌بان</p>
        <p className="text-xs text-brand-ink-400">پنل مدیریت</p>
        <nav className="mt-8 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-[15px] text-brand-ink-700 hover:bg-brand-cream-100 hover:text-brand-green-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-brand-line pt-4">
          <p className="truncate text-xs text-brand-ink-400" dir="ltr">
            {admin.email}
          </p>
          <form action={logoutAction}>
            <button type="submit" className="mt-2 text-sm font-medium text-red-600 hover:underline">
              خروج
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
