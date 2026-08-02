import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Vazirmatn, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { JsonLd, organizationSchema, localBusinessSchema } from "@/lib/schema";
import { LeadPopup } from "@/components/ui/lead-popup";
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
    alternates: {
      canonical: path,
      languages: {
        fa: "/",
        en: "/en",
      },
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/brand/favicon/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/brand/favicon/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: "/brand/favicon/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : "en_US",
      siteName: t("siteName"),
      title: t("title"),
      description: t("ogDescription"),
      url: `https://malibaan.com${path}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${vazirmatn.variable} ${latin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream-50 text-brand-ink-900">
        <NextIntlClientProvider>
          <JsonLd data={organizationSchema(locale)} />
          <JsonLd data={localBusinessSchema(locale)} />
          {children}
          <LeadPopup />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
