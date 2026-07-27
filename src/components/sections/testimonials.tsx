import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const testimonials = [
  {
    quote:
      "بعد از سال‌ها کار با چند حسابدار متفاوت، مالی‌بان اولین تیمی بود که گزارش‌هایش را واقعاً می‌فهمیدم. الان تصمیم‌های مالی را با اطمینان بیشتری می‌گیرم.",
    name: "مدیرعامل، شرکت تولیدی قطعات صنعتی",
  },
  {
    quote:
      "در بازرسی مالیاتی، تیم مالی‌بان کنارمان بود و پرونده را با مستندات دقیق دفاع کرد. جریمه‌ای که انتظارش را داشتیم، هرگز اتفاق نیفتاد.",
    name: "مدیر مالی، مجموعه واردات و توزیع",
  },
  {
    quote:
      "راه‌اندازی سامانه مودیان برایمان پیچیده به نظر می‌رسید. مالی‌بان کل فرآیند را در کمتر از دو هفته و بدون وقفه در فروش پیاده‌سازی کرد.",
    name: "بنیان‌گذار، فروشگاه اینترنتی",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="اعتماد مشتریان"
          title="آنچه کسب‌وکارهایی که با ما کار می‌کنند، می‌گویند"
          align="center"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col justify-between rounded-2xl border border-brand-line bg-brand-cream-50 p-7"
            >
              <blockquote className="text-[15px] leading-8 text-brand-ink-900">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-brand-ink-600">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
