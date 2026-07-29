import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatNumber } from "@/i18n/format";
import type { HomeDictionary } from "@/i18n/dictionary-types";
import type { Locale } from "@/i18n/config";

export function Process({ locale, dict }: { locale: Locale; dict: HomeDictionary["process"] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} align="center" />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 hidden h-px w-full bg-brand-line lg:block" />
          {dict.steps.map((step, index) => (
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
  );
}
