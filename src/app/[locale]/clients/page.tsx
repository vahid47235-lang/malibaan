import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StatsBar } from "@/components/sections/stats-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { getServices } from "@/lib/data/services";
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
    title: dict.clients.meta.title,
    description: dict.clients.meta.description,
    alternates: buildAlternates(locale, "/clients"),
    openGraph: {
      ...ogLocaleFor(locale),
      title: dict.clients.meta.ogTitle,
      description: dict.clients.meta.ogDescription,
    },
  };
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const { clients, common, home } = dict;
  const industries = Array.from(new Set(getServices(locale).flatMap((service) => service.industries)));

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <Breadcrumbs
          items={[{ label: clients.breadcrumb, href: "/clients" }]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={clients.pageHeader.eyebrow}
          title={clients.pageHeader.title}
          description={clients.pageHeader.description}
        />

        <StatsBar stats={home.stats} />

        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={clients.industriesHeading.eyebrow}
              title={clients.industriesHeading.title}
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-brand-line bg-white px-5 py-2 text-sm font-medium text-brand-ink-700"
                >
                  {industry}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={clients.testimonialsHeading.eyebrow}
              title={clients.testimonialsHeading.title}
              align="center"
              className="mx-auto"
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clients.testimonials.map((testimonial) => (
                <figure
                  key={`${testimonial.name}-${testimonial.context}`}
                  className="flex flex-col justify-between rounded-2xl border border-brand-line bg-brand-cream-50 p-7"
                >
                  <blockquote className="text-[15px] leading-8 text-brand-ink-900">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm font-semibold text-brand-ink-600">
                    {testimonial.name}
                    <span className="block font-normal text-brand-ink-400">{testimonial.context}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>

        <CtaBanner dict={home.ctaBanner} />
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
