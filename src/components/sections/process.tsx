import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    number: "۰۱",
    title: "مشاوره اولیه و شناخت کسب‌وکار",
    description: "در یک جلسه رایگان، وضعیت فعلی مالی و اهداف رشد کسب‌وکارتان را بررسی می‌کنیم.",
  },
  {
    number: "۰۲",
    title: "تحلیل و طراحی مسیر مالی",
    description: "بر اساس نوع فعالیت، ساختار حسابداری، مالیاتی و بیمه‌ای مناسب شما را طراحی می‌کنیم.",
  },
  {
    number: "۰۳",
    title: "اجرا توسط کارشناس ثابت",
    description: "یک کارشناس مشخص، مسئول اجرای دقیق و به‌موقع تمام فرآیندهای مالی شما می‌شود.",
  },
  {
    number: "۰۴",
    title: "گزارش‌دهی شفاف و مستمر",
    description: "هر ماه گزارشی روشن از وضعیت مالی، مالیاتی و بیمه‌ای کسب‌وکارتان دریافت می‌کنید.",
  },
];

export function Process() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="روند همکاری"
          title="از جلسه اول تا گزارش ماهانه؛ مسیری روشن"
          align="center"
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 hidden h-px w-full bg-brand-line lg:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-brand-green-900/20 bg-brand-cream-50 text-lg font-bold text-brand-green-900">
                {step.number}
              </div>
              <h3 className="mt-5 text-lg font-bold text-brand-ink-900">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
