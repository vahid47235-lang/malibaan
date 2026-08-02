import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StatsBar } from "@/components/sections/stats-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Clients");
  return {
    title: t("eyebrow"),
    description: t("description"),
    alternates: { canonical: "/clients" },
    openGraph: {
      title: t("eyebrow"),
      description: t("description"),
      url: "https://malibaan.com/clients",
    },
  };
}

export default async function ClientsPage() {
  const t = await getTranslations("Clients");

  const industries = Array.from({ length: 28 }, (_, i) => t(`industry${i + 1}`));
  const testimonials = Array.from({ length: 6 }, (_, i) => ({
    quote: t(`testimonial${i + 1}Quote`),
    name: t(`testimonial${i + 1}Name`),
    context: t(`testimonial${i + 1}Context`),
  }));

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/clients" }]} />
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <StatsBar />

        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={t("industriesEyebrow")}
              title={t("industriesTitle")}
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
              eyebrow={t("testimonialsEyebrow")}
              title={t("testimonialsTitle")}
              align="center"
              className="mx-auto"
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure
                  key={`${testimonial.name}-${testimonial.context}`}
                  className="flex flex-col justify-between rounded-2xl border border-brand-line bg-brand-cream-50 p-7"
                >
                  <blockquote className="text-[15px] leading-8 text-brand-ink-900">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-semibold text-brand-ink-600">
                    {testimonial.name}
                    <span className="block font-normal text-brand-ink-400">{testimonial.context}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>

        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
