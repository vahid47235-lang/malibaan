import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export async function WhyUs() {
  const t = await getTranslations("WhyUs");
  const reasons = [
    { title: t("reason1Title"), description: t("reason1Description") },
    { title: t("reason2Title"), description: t("reason2Description") },
    { title: t("reason3Title"), description: t("reason3Description") },
    { title: t("reason4Title"), description: t("reason4Description") },
  ];

  return (
    <section className="bg-brand-green-950 py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              className="text-white [&_h2]:text-white [&_p]:text-white/70 [&_p:first-child]:text-brand-mint-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-bold text-brand-mint-400">{reason.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-white/70">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
