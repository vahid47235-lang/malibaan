import type { Metadata } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { JsonLd, organizationSchema, localBusinessSchema } from "@/lib/schema";
import { LeadPopup } from "@/components/ui/lead-popup";
import { LocaleProvider } from "@/components/i18n/locale-context";
import { locales, localeMeta, isLocale, SITE_URL, type Locale } from "@/i18n/config";
import { buildAlternates, ogLocaleFor } from "@/i18n/seo";
import { getDictionary } from "@/i18n/get-dictionary";
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
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.home.meta.title,
      template: `%s | ${dict.common.siteName}`,
    },
    description: dict.home.meta.description,
    alternates: buildAlternates(locale, "/"),
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
      ...ogLocaleFor(locale),
      siteName: dict.common.siteName,
      title: dict.home.meta.title,
      description: dict.home.meta.ogDescription,
      url: `${SITE_URL}${locale === "fa" ? "" : `/${locale}`}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.meta.title,
      description: dict.home.meta.ogDescription,
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
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const meta = localeMeta[locale];
  const dict = await getDictionary(locale);

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={`${vazirmatn.variable} ${latin.variable} h-full antialiased`}
    >
      <body
        className={`min-h-full flex flex-col bg-brand-cream-50 text-brand-ink-900 ${
          locale === "en" ? "font-en" : ""
        }`}
      >
        <LocaleProvider locale={locale}>
          <JsonLd data={organizationSchema(locale)} />
          <JsonLd data={localBusinessSchema(locale)} />
          {children}
          {locale === "fa" && <LeadPopup dict={dict.common} locale={locale} />}
        </LocaleProvider>
      </body>
    </html>
  );
}
