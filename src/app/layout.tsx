import type { Metadata } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://malibaan.com"),
  title: {
    default: "مالی‌بان | حسابداری هوشمند برای رشد کسب‌وکار",
    template: "%s | مالی‌بان",
  },
  description:
    "مالی‌بان، مشاور حسابداری، مالیاتی و بیمه‌ای برای کسب‌وکارهای ایرانی؛ از ثبت شرکت تا حسابرسی، با شفافیت و دقتی که کسب‌وکار شما شایسته آن است.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "مالی‌بان",
    title: "مالی‌بان | حسابداری هوشمند برای رشد کسب‌وکار",
    description:
      "مشاور حسابداری، مالیاتی و بیمه‌ای برای کسب‌وکارهای ایرانی. شفافیت، دقت و استقلال در هر گزارش.",
    url: "https://malibaan.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${latin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream-50 text-brand-ink-900">
        {children}
      </body>
    </html>
  );
}
