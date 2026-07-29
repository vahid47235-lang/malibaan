import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Link } from "@/components/i18n/link";
import { getServices } from "@/lib/data/services";
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
    title: dict.services.listMeta.title,
    description: dict.services.listMeta.description,
    alternates: buildAlternates(locale, "/services"),
    openGraph: {
      ...ogLocaleFor(locale),
      title: dict.services.listMeta.ogTitle,
      description: dict.services.listMeta.ogDescription,
    },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const { services, common, home } = dict;
  const allServices = getServices(locale);

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <Breadcrumbs
          items={[{ label: services.listBreadcrumb, href: "/services" }]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={services.listPageHeader.eyebrow}
          title={services.listPageHeader.title}
          description={services.listPageHeader.description}
        />

        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-green-900/25 hover:shadow-lg hover:shadow-brand-ink-900/5"
                >
                  <div>
                    <span className="text-sm font-semibold text-brand-green-700/50">
                      {formatNumber(String(index + 1).padStart(2, "0"), locale)}
                    </span>
                    <h2 className="mt-4 text-xl font-bold text-brand-ink-900">{service.navLabel}</h2>
                    <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{service.metaDescription}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-900">
                    {services.detailCta}
                    <ArrowIcon groupHover />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-brand-line bg-brand-cream-100 p-8 text-center sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">{services.notListedHeading}</h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-brand-ink-600">
                {services.notListedDescription}
              </p>
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
