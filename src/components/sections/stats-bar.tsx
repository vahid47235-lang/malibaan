import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";

export async function StatsBar() {
  const t = await getTranslations("StatsBar");
  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
    { value: t("stat4Value"), label: t("stat4Label") },
  ];

  return (
    <section className="border-y border-brand-line bg-white">
      <Container>
        <div className="grid grid-cols-2 divide-y divide-brand-line sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-x-reverse">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 py-8 text-center">
              <span className="text-3xl font-bold text-brand-green-900">{stat.value}</span>
              <span className="text-sm text-brand-ink-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
