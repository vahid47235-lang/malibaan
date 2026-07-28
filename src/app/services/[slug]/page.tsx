import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  const service = getServiceBySlug(slug);
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
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = getRelatedServices(service);

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
            { label: "خدمات", href: "/services" },
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
              eyebrow="چرا این خدمت را از مالی‌بان بگیرید"
              title="مزیت‌هایی که در عمل تفاوت ایجاد می‌کند"
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
                eyebrow="دامنه خدمات"
                title={`مواردی که در «${service.navLabel}» پوشش می‌دهیم`}
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
              eyebrow="مشکلاتی که حل می‌کنیم"
              title="اگر یکی از این‌ها را تجربه کرده‌اید، جای درستی آمده‌اید"
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
              eyebrow="روند اجرا"
              title="مسیری روشن، قدم به قدم"
              align="center"
            />
            <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="absolute top-6 hidden h-px w-full bg-brand-line lg:block" />
              {service.process.map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-brand-green-900/20 bg-brand-cream-50 text-lg font-bold text-brand-green-900">
                    {toPersianDigits(String(index + 1).padStart(2, "0"))}
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
              eyebrow="مناسب چه کسب‌وکارهایی"
              title="صنایعی که بیشترین همکاری را با ما در این حوزه دارند"
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
              eyebrow="سؤالات متداول"
              title={`سؤالاتی که درباره «${service.navLabel}» بیشتر می‌پرسند`}
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
              <h2 className="text-xl font-bold text-brand-ink-900">خدمات مرتبط</h2>
              <div className="mt-6 flex flex-wrap gap-4">
                {relatedServices.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/services/${related.slug}`}
                    className="rounded-xl border border-brand-line bg-brand-cream-50 px-5 py-3 text-sm font-semibold text-brand-green-900 hover:border-brand-green-900/30"
                  >
                    {related.navLabel} ←
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
                  برای «{service.navLabel}» با یک کارشناس صحبت کنید
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-brand-ink-600">
                  فرم را پر کنید تا در اسرع وقت با شما تماس بگیریم، یا مستقیم از طریق واتساپ یا
                  تماس تلفنی با ما در ارتباط باشید.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="tel:+989900035009" variant="secondary">
                    تماس تلفنی
                  </Button>
                  <Button href="https://wa.me/989900035009" variant="secondary">
                    پیام در واتساپ
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
