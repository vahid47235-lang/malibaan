import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { LegalContent, type LegalSection } from "@/components/ui/legal-content";
import { formatJalaliDate } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Terms");
  return {
    title: t("eyebrow"),
    description: t("description"),
    alternates: { canonical: "/terms" },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://malibaan.com/terms",
    },
  };
}

export default async function TermsPage() {
  const t = await getTranslations("Terms");
  const locale = await getLocale();

  const sections: LegalSection[] = [
    { heading: t("s1Heading"), paragraphs: [t("s1Para1")] },
    { heading: t("s2Heading"), paragraphs: [t("s2Para1")] },
    { heading: t("s3Heading"), paragraphs: [t("s3Para1")] },
    { heading: t("s4Heading"), paragraphs: [t("s4Para1")] },
    { heading: t("s5Heading"), paragraphs: [t("s5Para1")] },
    { heading: t("s6Heading"), paragraphs: [t("s6Para1")] },
    { heading: t("s7Heading"), paragraphs: [t("s7Para1")] },
    { heading: t("s8Heading"), paragraphs: [t("s8Para1")] },
    { heading: t("s9Heading"), paragraphs: [t("s9Para1")] },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/terms" }]} />
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <LegalContent
          sections={sections}
          lastUpdated={formatJalaliDate("2026-07-27", locale)}
          lastUpdatedLabel={t("lastUpdated")}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
