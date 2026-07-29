import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/ui/contact-form";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd, faqSchema } from "@/lib/schema";
import { formatNumber } from "@/i18n/format";
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
    title: dict.consultation.meta.title,
    description: dict.consultation.meta.description,
    alternates: buildAlternates(locale, "/consultation"),
    openGraph: {
      ...ogLocaleFor(locale),
      title: dict.consultation.meta.ogTitle,
      description: dict.consultation.meta.ogDescription,
    },
  };
}

export default async function ConsultationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const { consultation, common } = dict;

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <JsonLd data={faqSchema(consultation.faq)} />

        <Breadcrumbs
          items={[{ label: consultation.breadcrumb, href: "/consultation" }]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={consultation.pageHeader.eyebrow}
          title={consultation.pageHeader.title}
          description={consultation.pageHeader.description}
        />

        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={consultation.expectationsHeading.eyebrow}
              title={consultation.expectationsHeading.title}
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {consultation.benefits.map((item) => (
                <div key={item.title} className="rounded-2xl border border-brand-line bg-white p-6">
                  <h3 className="text-lg font-bold text-brand-ink-900">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-ink-600">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={consultation.stepsHeading}
              title={consultation.stepsTitle}
              align="center"
              className="mx-auto"
            />
            <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
              <div className="absolute top-6 hidden h-px w-full bg-brand-line sm:block" />
              {consultation.steps.map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-brand-green-900/20 bg-brand-cream-50 text-lg font-bold text-brand-green-900">
                    {formatNumber(String(index + 1).padStart(2, "0"), locale)}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-brand-ink-900 sm:text-3xl">
                {consultation.directContactHeading}
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-brand-ink-600">{consultation.directContactDescription}</p>
              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="tel:+989900035009"
                  dir="ltr"
                  className="rounded-2xl border border-brand-line bg-white p-5 text-lg font-bold text-brand-ink-900 hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  {consultation.phoneValue}
                </a>
                <a
                  href="https://wa.me/989900035009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-brand-line bg-white p-5 text-lg font-bold text-brand-ink-900 hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  {consultation.whatsappValue}
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-line bg-white p-8 sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">{consultation.formHeading}</h2>
              <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{consultation.formDescription}</p>
              <ContactForm dict={common} serviceLabel={consultation.formServiceLabel} className="mt-8" />
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={consultation.faqEyebrow}
              title={consultation.faqHeading}
              align="center"
              className="mx-auto"
            />
            <div className="mx-auto mt-12 max-w-3xl">
              <FaqAccordion items={consultation.faq} />
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
