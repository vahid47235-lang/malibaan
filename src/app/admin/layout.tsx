import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "پنل مدیریت مالی‌بان", template: "%s | پنل مدیریت" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div dir="rtl" className="min-h-screen bg-brand-cream-50 text-brand-ink-900">{children}</div>;
}
