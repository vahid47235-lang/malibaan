import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { LegalContent } from "@/components/ui/legal-content";
import { formatDate } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates } from "@/i18n/seo";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale;
  const dict = await getDictionary(locale);

  return {
    title: dict.legal.terms.title,
    description: dict.legal.terms.description,
    alternates: buildAlternates(locale, "/terms"),
    openGraph: {
      title: dict.legal.terms.title,
      description: dict.legal.terms.description,
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const { legal, common } = dict;

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <Breadcrumbs
          items={[{ label: legal.terms.title, href: "/terms" }]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={legal.terms.title}
          title={legal.terms.heading}
          description={legal.terms.description2}
        />
        <LegalContent
          sections={legal.terms.sections}
          lastUpdated={formatDate(legal.terms.updated, locale)}
          updatedLabel={legal.updatedLabel}
        />
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
