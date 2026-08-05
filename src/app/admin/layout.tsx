import type { Metadata } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import "../globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const latin = Inter({
  variable: "--font-latin",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "پنل مدیریت مالی‌بان", template: "%s | پنل مدیریت" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${latin.variable} h-full antialiased`}>
      <body className="min-h-full bg-brand-cream-50 text-brand-ink-900">{children}</body>
    </html>
  );
}
