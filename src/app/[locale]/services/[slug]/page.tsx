import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/components/i18n/link";
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
import { getRelatedServices, getServiceBySlug, getServices } from "@/lib/data/services";
import { formatNumber, t } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates, ogLocaleFor } from "@/i18n/seo";
import { isLocale, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return getServices("fa").map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale;
  const service = getServiceBySlug(locale, slug);
  if (!service) return {};

  return {
    title: service.navLabel,
    description: service.metaDescription,
    alternates: buildAlternates(locale, `/services/${slug}`),
    openGraph: {
      ...ogLocaleFor(locale),
      title: service.navLabel,
      description: service.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: service.navLabel,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const service = getServiceBySlug(locale, slug);
  if (!service) notFound();

  const dict = await getDictionary(locale);
  const { services, common } = dict;
  const relatedServices = getRelatedServices(locale, service);

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <JsonLd
          data={serviceSchema({
            name: service.navLabel,
            description: service.metaDescription,
            slug: service.slug,
            locale,
          })}
        />
        <JsonLd data={faqSchema(service.faq)} />

        <Breadcrumbs
          items={[
            { label: services.detailBreadcrumbServices, href: "/services" },
            { label: service.navLabel, href: `/services/${service.slug}` },
          ]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader eyebrow={service.eyebrow} title={service.title} description={service.heroDescription} />

        {/* Benefits */}
        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={services.benefitsHeading.eyebrow}
              title={services.benefitsHeading.title}
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-2xl border border-brand-line bg-white p-6">
                  <h3 className="text-lg font-bold text-brand-ink-900">{benefit.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-ink-600">{benefit.description}</p>
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
                eyebrow={services.offeringsHeading.eyebrow}
                title={t(services.offeringsHeading.titleTemplate, { service: service.navLabel })}
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
              eyebrow={services.problemsHeading.eyebrow}
              title={services.problemsHeading.title}
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
            <SectionHeading eyebrow={services.processHeading.eyebrow} title={services.processHeading.title} align="center" />
            <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="absolute top-6 hidden h-px w-full bg-brand-line lg:block" />
              {service.process.map((step, index) => (
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

        {/* Industries */}
        <section className="bg-white py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={services.industriesHeading.eyebrow}
              title={services.industriesHeading.title}
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

        <Testimonials
          locale={locale}
          eyebrow={dict.home.testimonials.eyebrow}
          title={dict.home.testimonials.title}
          serviceSlug={service.slug}
        />

        {/* FAQ */}
        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={services.faqEyebrow}
              title={t(services.faqHeadingTemplate, { service: service.navLabel })}
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
              <h2 className="text-xl font-bold text-brand-ink-900">{services.relatedHeading}</h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="rounded-xl border border-brand-line bg-brand-cream-50 px-5 py-3 text-sm font-semibold text-brand-green-900 hover:border-brand-green-900/30"
                  >
                    {related.navLabel}
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
                  {t(services.leadFormTitleTemplate, { service: service.navLabel })}
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-brand-ink-600">{services.leadFormDescription}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="tel:+989900035009" variant="secondary">
                    {services.callCta}
                  </Button>
                  <Button href="https://wa.me/989900035009" variant="secondary">
                    {services.whatsappCta}
                  </Button>
                </div>
              </div>
              <ContactForm dict={common} serviceLabel={service.navLabel} />
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
