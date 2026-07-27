import { Container } from "@/components/ui/container";

const stats = [
  { value: "۱۲+", label: "سال تجربه اجرایی" },
  { value: "۲۰۰+", label: "کسب‌وکار فعال" },
  { value: "۴۰۰۰+", label: "اظهارنامه ثبت‌شده" },
  { value: "۲۴ساعته", label: "پاسخگویی به کارفرمایان" },
];

export function StatsBar() {
  return (
    <section className="border-y border-brand-line bg-white">
      <Container>
        <div className="grid grid-cols-2 divide-y divide-brand-line sm:grid-cols-4 sm:divide-y-0 sm:divide-x sm:divide-x-reverse">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 py-8 text-center">
              <span className="text-3xl font-bold text-brand-green-900">
                {stat.value}
              </span>
              <span className="text-sm text-brand-ink-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
