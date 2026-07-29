import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { db } from "@/db";
import { categories, services } from "@/db/schema";
import { CalculatorClient } from "./calculator-client";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates } from "@/i18n/seo";
import { isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

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
    title: dict.calculator.meta.title,
    description: dict.calculator.meta.description,
    alternates: buildAlternates(locale, "/calculator"),
    openGraph: {
      title: dict.calculator.meta.ogTitle,
      description: dict.calculator.meta.ogDescription,
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const { calculator, common } = dict;

  const [allCategories, allServices] = await Promise.all([
    db.select().from(categories).orderBy(asc(categories.sortOrder)),
    db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.sortOrder)),
  ]);

  const categoryOptions = allCategories
    .map((category) => ({
      id: category.id,
      label: category.label,
      services: allServices
        .filter((service) => service.categoryId === category.id)
        .map((service) => ({ id: service.id, name: service.name, priceToman: service.priceToman })),
    }))
    .filter((category) => category.services.length > 0);

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <Breadcrumbs
          items={[{ label: calculator.breadcrumb, href: "/calculator" }]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={calculator.pageHeader.eyebrow}
          title={calculator.pageHeader.title}
          description={calculator.pageHeader.description}
        />

        <section className="py-14 sm:py-20">
          <Container>
            {categoryOptions.length > 0 ? (
              <CalculatorClient
                categories={categoryOptions}
                locale={locale}
                dict={calculator}
                submittingLabel={common.buttons.submitting}
              />
            ) : (
              <p className="text-center text-brand-ink-400">{calculator.noServicesConfigured}</p>
            )}
          </Container>
        </section>
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
