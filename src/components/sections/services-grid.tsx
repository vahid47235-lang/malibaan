import { Link } from "@/components/i18n/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { formatNumber } from "@/i18n/format";
import type { HomeDictionary } from "@/i18n/dictionary-types";
import type { Locale } from "@/i18n/config";

export function ServicesGrid({
  locale,
  dict,
  viewAllLabel,
}: {
  locale: Locale;
  dict: HomeDictionary["servicesGrid"];
  viewAllLabel: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} description={dict.description} />
          <Link
            href="/services"
            className="hidden shrink-0 text-sm font-semibold text-brand-green-900 hover:underline sm:block"
          >
            {viewAllLabel}
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-green-900/25 hover:shadow-lg hover:shadow-brand-ink-900/5"
            >
              <div>
                <span className="text-sm font-semibold text-brand-green-700/50">
                  {formatNumber(String(index + 1).padStart(2, "0"), locale)}
                </span>
                <h3 className="mt-4 text-xl font-bold text-brand-ink-900">{service.title}</h3>
                <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{service.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-900">
                {dict.detailCta}
                <ArrowIcon groupHover />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
