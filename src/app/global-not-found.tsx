import type { Metadata } from "next";
import Link from "next/link";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({ subsets: ["arabic", "latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Not Found | مالی‌بان",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.className} h-full antialiased`}>
      <body className="grid min-h-full place-items-center bg-brand-cream-50 px-6 text-center text-brand-ink-900">
        <div>
          <p className="text-5xl font-bold text-brand-green-900/20">404</p>
          <h1 className="mt-4 text-2xl font-bold">این صفحه پیدا نشد</h1>
          <p className="mt-2 text-brand-ink-600">This page does not exist.</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/" className="rounded-full bg-brand-green-900 px-6 py-3 text-white">
              بازگشت به مالی‌بان
            </Link>
            <Link href="/en" className="rounded-full border border-brand-line px-6 py-3 text-brand-green-900">
              Malibaan in English
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
