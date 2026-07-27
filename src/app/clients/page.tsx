import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StatsBar } from "@/components/sections/stats-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "مشتریان مالی‌بان",
  description:
    "کسب‌وکارهای ایرانی از استارتاپ تا شرکت‌های تولیدی و بازرگانی، مسیر حسابداری، مالیاتی و بیمه‌ای خود را به مالی‌بان سپرده‌اند؛ صنایع تحت پوشش و تجربه واقعی مشتریان را ببینید.",
  alternates: { canonical: "/clients" },
  openGraph: {
    title: "مشتریان مالی‌بان",
    description: "صنایع و کسب‌وکارهایی که با مالی‌بان همکاری می‌کنند.",
    url: "https://malibaan.com/clients",
  },
};

const industries = Array.from(new Set(services.flatMap((service) => service.industries)));

const clientTestimonials = [
  {
    quote:
      "بعد از سال‌ها کار با چند حسابدار متفاوت، مالی‌بان اولین تیمی بود که گزارش‌هایش را واقعاً می‌فهمیدم. الان تصمیم‌های مالی را با اطمینان بیشتری می‌گیرم.",
    name: "مدیرعامل",
    context: "شرکت تولیدی قطعات صنعتی",
  },
  {
    quote:
      "در بازرسی مالیاتی، تیم مالی‌بان کنارمان بود و پرونده را با مستندات دقیق دفاع کرد. جریمه‌ای که انتظارش را داشتیم، هرگز اتفاق نیفتاد.",
    name: "مدیر مالی",
    context: "مجموعه واردات و توزیع",
  },
  {
    quote:
      "راه‌اندازی سامانه مودیان برایمان پیچیده به نظر می‌رسید. مالی‌بان کل فرآیند را در کمتر از دو هفته و بدون وقفه در فروش پیاده‌سازی کرد.",
    name: "بنیان‌گذار",
    context: "فروشگاه اینترنتی",
  },
  {
    quote:
      "با رشد تیم، لیست بیمه و حقوق و دستمزدمان پیچیده شده بود. مالی‌بان یک فرآیند ماهانه منظم گذاشت که دیگر هیچ‌وقت دیر یا اشتباه ارسال نمی‌شود.",
    name: "مدیر منابع انسانی",
    context: "شرکت پیمانکاری ساختمانی",
  },
  {
    quote:
      "برای افزایش سرمایه به یک حسابرسی معتبر نیاز داشتیم. تیم مالی‌بان کل مسیر را هماهنگ کرد، از آماده‌سازی اسناد تا جلسه نهایی با حسابرس مستقل.",
    name: "مدیرعامل",
    context: "هلدینگ در حال افزایش سرمایه",
  },
  {
    quote:
      "به‌عنوان یک استارتاپ، نمی‌دانستیم از کجا شروع کنیم. مالی‌بان از همان جلسه اول، مسیر ثبت شرکت و ساختار مالیاتی مناسب را روشن کرد.",
    name: "هم‌بنیان‌گذار",
    context: "استارتاپ فناوری",
  },
];

export default function ClientsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: "مشتریان", href: "/clients" }]} />
        <PageHeader
          eyebrow="مشتریان مالی‌بان"
          title="کسب‌وکارهایی که مسیر مالی‌شان را به ما سپرده‌اند"
          description="از استارتاپ‌های در حال رشد تا شرکت‌های تولیدی و بازرگانی بزرگ؛ در هر صنعت، یک کارشناس ثابت پرونده مالی و مالیاتی مشتری را می‌شناسد."
        />

        <StatsBar />

        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="صنایع تحت پوشش"
              title="در این صنایع، بیشترین همکاری را داشته‌ایم"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-brand-line bg-white px-5 py-2 text-sm font-medium text-brand-ink-700"
                >
                  {industry}
                </span>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="اعتماد مشتریان"
              title="آنچه کسب‌وکارهایی که با ما کار می‌کنند، می‌گویند"
              align="center"
              className="mx-auto"
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {clientTestimonials.map((testimonial) => (
                <figure
                  key={`${testimonial.name}-${testimonial.context}`}
                  className="flex flex-col justify-between rounded-2xl border border-brand-line bg-brand-cream-50 p-7"
                >
                  <blockquote className="text-[15px] leading-8 text-brand-ink-900">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-semibold text-brand-ink-600">
                    {testimonial.name}
                    <span className="block font-normal text-brand-ink-400">{testimonial.context}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </section>

        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
