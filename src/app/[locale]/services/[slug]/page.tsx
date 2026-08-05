import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { ContactForm } from "@/components/ui/contact-form";
import { JsonLd, faqSchema, serviceSchema } from "@/lib/schema";
import { getRelatedServices, getServiceBySlug, services } from "@/lib/services-data";
import { toPersianDigits } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const service = getServiceBySlug(slug, locale);
  if (!service) return {};

  return {
    title: service.navLabel,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.navLabel,
      description: service.metaDescription,
      url: `https://malibaan.com/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const service = getServiceBySlug(slug, locale);
  if (!service) notFound();

  const t = await getTranslations("ServiceDetail");
  const tNav = await getTranslations("Nav");
  const relatedServices = getRelatedServices(service, locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          data={serviceSchema({
            name: service.navLabel,
            description: service.metaDescription,
            slug: service.slug,
          })}
        />
        <JsonLd data={faqSchema(service.faq)} />

        <Breadcrumbs
          items={[
            { label: tNav("services"), href: "/services" },
            { label: service.navLabel, href: `/services/${service.slug}` },
          ]}
        />
        <PageHeader
          eyebrow={service.eyebrow}
          title={service.title}
          description={service.heroDescription}
        />

        {/* Benefits */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={t("benefitsEyebrow")}
              title={t("benefitsTitle")}
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-brand-line bg-white p-6">
                  <h3 className="text-lg font-bold text-brand-ink-900">{benefit.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-ink-600">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Offerings checklist */}
        {service.offerings && service.offerings.length > 0 && (
          <section className="bg-white py-20 sm:py-24">
            <Container>
              <SectionHeading
                eyebrow={t("offeringsEyebrow")}
                title={t("offeringsTitle", { service: service.navLabel })}
                align="center"
                className="mx-auto"
              />
              <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
                {service.offerings.map((offering) => (
                  <div
                    key={offering}
                    className="flex items-start gap-3 rounded-xl border border-brand-line bg-brand-cream-50 p-4 text-[15px] leading-7 text-brand-ink-700"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 shrink-0 text-brand-green-700"
                    >
                      <path
                        d="M3 8.5L6.2 11.5L13 4.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {offering}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Problems solved */}
        <section className="bg-brand-green-950 py-20 text-white sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={t("problemsEyebrow")}
              title={t("problemsTitle")}
              className="[&_h2]:text-white [&_p:first-child]:text-brand-mint-400"
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.problems.map((problem) => (
                <li
                  key={problem}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5 text-[15px] leading-7 text-white/80"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mt-0.5 shrink-0 text-brand-mint-400"
                  >
                    <path
                      d="M3 8.5L6.2 11.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {problem}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Process */}
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={t("processEyebrow")}
              title={t("processTitle")}
              align="center"
            />
            <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="absolute top-6 hidden h-px w-full bg-brand-line lg:block" />
              {service.process.map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-brand-green-900/20 bg-brand-cream-50 text-lg font-bold text-brand-green-900">
                    {locale === "fa" ? toPersianDigits(String(index + 1).padStart(2, "0")) : String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Industries */}
        <section className="bg-white py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={t("industriesEyebrow")}
              title={t("industriesTitle")}
              align="center"
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {service.industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-brand-line bg-brand-cream-50 px-5 py-2 text-sm font-medium text-brand-ink-700"
                >
                  {industry}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <Testimonials serviceSlug={service.slug} />

        {/* FAQ */}
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={t("faqEyebrow")}
              title={t("faqTitle", { service: service.navLabel })}
              align="center"
              className="mx-auto"
            />
            <div className="mx-auto mt-12 max-w-3xl">
              <FaqAccordion items={service.faq} />
            </div>
          </Container>
        </section>

        {/* Related services */}
        {relatedServices.length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <Container>
              <h2 className="text-xl font-bold text-brand-ink-900">{t("relatedTitle")}</h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="rounded-xl border border-brand-line bg-brand-cream-50 px-5 py-3 text-sm font-semibold text-brand-green-900 hover:border-brand-green-900/30"
                  >
                    {locale === "fa" ? `${related.navLabel} ←` : `${related.navLabel} →`}
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Lead form */}
        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-10 rounded-[2rem] border border-brand-line bg-brand-cream-100 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold leading-tight text-brand-ink-900 sm:text-3xl">
                  {t("leadTitle", { service: service.navLabel })}
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-brand-ink-600">
                  {t("leadDescription")}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="tel:+989900035009" variant="secondary">
                    {t("callButton")}
                  </Button>
                  <Button href="https://wa.me/989900035009" variant="secondary">
                    {t("whatsappButton")}
                  </Button>
                </div>
              </div>
              <ContactForm serviceLabel={service.navLabel} />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
