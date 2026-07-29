import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates, ogLocaleFor } from "@/i18n/seo";
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
    title: dict.home.meta.title,
    description: dict.home.meta.description,
    alternates: buildAlternates(locale, "/"),
    openGraph: {
      ...ogLocaleFor(locale),
      title: dict.home.meta.title,
      description: dict.home.meta.ogDescription,
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict.common} />
      <main className="flex-1">
        <Hero locale={locale} dict={dict.home} commonDict={dict.common} />
        <StatsBar stats={dict.home.stats} />
        <ServicesGrid locale={locale} dict={dict.home.servicesGrid} viewAllLabel={dict.common.buttons.viewAll} />
        <WhyUs dict={dict.home.whyUs} />
        <Process locale={locale} dict={dict.home.process} />
        <Testimonials locale={locale} eyebrow={dict.home.testimonials.eyebrow} title={dict.home.testimonials.title} />
        <CtaBanner dict={dict.home.ctaBanner} />
      </main>
      <Footer locale={locale} dict={dict.common} />
      <WhatsAppButton dict={dict.common} />
    </>
  );
}
