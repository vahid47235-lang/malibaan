import { Container } from "@/components/ui/container";
import type { HomeDictionary } from "@/i18n/dictionary-types";

export function StatsBar({ stats }: { stats: HomeDictionary["stats"] }) {
  return (
    <section className="border-y border-brand-line bg-white">
      <Container>
        <div className="grid grid-cols-2 divide-y divide-brand-line rtl:divide-x-reverse sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
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
