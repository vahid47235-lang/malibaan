import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { serviceNavSlugs } from "@/lib/nav";
import { toPersianDigits } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("ServicesHub");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/services" },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://malibaan.com/services",
    },
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("ServicesHub");
  const tServiceNav = await getTranslations("ServiceNav");
  const tDescriptions = await getTranslations("ServiceDescriptions");
  const locale = await getLocale();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/services" }]} />
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceNavSlugs.map((slug, index) => (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-green-900/25 hover:shadow-lg hover:shadow-brand-ink-900/5"
                >
                  <div>
                    <span className="text-sm font-semibold text-brand-green-700/50">
                      {locale === "fa" ? toPersianDigits(String(index + 1).padStart(2, "0")) : String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-4 text-xl font-bold text-brand-ink-900">{tServiceNav(slug)}</h2>
                    <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{tDescriptions(slug)}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-900">
                    {t("detailsLink")}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="rotate-180 transition-transform group-hover:-translate-x-1"
                    >
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-brand-line bg-brand-cream-100 p-8 text-center sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">{t("notFoundHeading")}</h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-brand-ink-600">
                {t("notFoundDescription")}
              </p>
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
