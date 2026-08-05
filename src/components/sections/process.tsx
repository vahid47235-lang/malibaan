import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { toPersianDigits } from "@/lib/utils";

export async function Process() {
  const t = await getTranslations("Process");
  const locale = await getLocale();
  const steps = [
    { title: t("step1Title"), description: t("step1Description") },
    { title: t("step2Title"), description: t("step2Description") },
    { title: t("step3Title"), description: t("step3Description") },
    { title: t("step4Title"), description: t("step4Description") },
  ];

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} align="center" />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 hidden h-px w-full bg-brand-line lg:block" />
          {steps.map((step, index) => (
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
  );
}
