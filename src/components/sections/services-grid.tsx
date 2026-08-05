import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { toPersianDigits } from "@/lib/utils";

const slugs = ["accounting", "tax-consulting", "vat", "payroll", "audit", "company-registration"] as const;

export async function ServicesGrid() {
  const t = await getTranslations("ServicesGrid");
  const tServiceNav = await getTranslations("ServiceNav");
  const locale = await getLocale();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
          <Link
            href="/services"
            className="hidden shrink-0 text-sm font-semibold text-brand-green-900 hover:underline sm:block"
          >
            {t("viewAll")}
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {slugs.map((slug, index) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-green-900/25 hover:shadow-lg hover:shadow-brand-ink-900/5"
            >
              <div>
                <span className="text-sm font-semibold text-brand-green-700/50">
                  {locale === "fa" ? toPersianDigits(String(index + 1).padStart(2, "0")) : String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-bold text-brand-ink-900">{tServiceNav(slug)}</h3>
                <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{t(slug)}</p>
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
      </Container>
    </section>
  );
}
