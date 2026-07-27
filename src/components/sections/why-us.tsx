import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [
  {
    title: "شفافیت در هر گزارش",
    description:
      "هیچ عددی بدون توضیح تحویل داده نمی‌شود. هر گزارش مالی با زبانی ساده برایتان تشریح می‌شود، نه فقط یک فایل اکسل.",
  },
  {
    title: "استقلال حرفه‌ای",
    description:
      "مشاوره ما بر اساس منافع بلندمدت کسب‌وکار شماست، نه فروش خدمات اضافه؛ همان‌طور که در تصمیم‌گیری‌های حساس مالیاتی نشان داده‌ایم.",
  },
  {
    title: "کارشناس ثابت، نه صف پشتیبانی",
    description:
      "برای هر کسب‌وکار یک کارشناس مشخص تعیین می‌شود که پرونده شما را از ابتدا تا انتها می‌شناسد.",
  },
  {
    title: "دفاع در برابر دارایی و بیمه",
    description:
      "در صورت بازرسی یا اعتراض مالیاتی و بیمه‌ای، تیم ما در هیئت‌های رسیدگی کنار شما و از پرونده‌تان دفاع می‌کند.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-brand-green-950 py-20 text-white sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <div>
            <SectionHeading
              eyebrow="چرا مالی‌بان"
              title="سپری که ساختیم، برای دفاع از کسب‌وکار شماست"
              description="برند مالی‌بان از یک باور ساده شکل گرفت: عدالت مالی حق هر کسب‌وکار است. این باور امروز در نحوه کار ما با هر مشتری جاری است."
              className="text-white [&_h2]:text-white [&_p]:text-white/70 [&_p:first-child]:text-brand-mint-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-bold text-brand-mint-400">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-white/70">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
