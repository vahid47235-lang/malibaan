import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/ui/contact-form";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd, faqSchema } from "@/lib/schema";
import { toPersianDigits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "درخواست مشاوره رایگان",
  description:
    "یک جلسه مشاوره ۳۰ دقیقه‌ای و رایگان با کارشناسان مالی‌بان رزرو کنید تا وضعیت حسابداری، مالیاتی و بیمه‌ای کسب‌وکارتان را بررسی کنیم؛ بدون هیچ تعهدی.",
  alternates: { canonical: "/consultation" },
  openGraph: {
    title: "درخواست مشاوره رایگان از مالی‌بان",
    description: "یک جلسه ۳۰ دقیقه‌ای رایگان برای بررسی وضعیت مالی و مالیاتی کسب‌وکار شما.",
    url: "https://malibaan.com/consultation",
  },
};

const expectations = [
  {
    title: "بررسی بی‌طرفانه وضعیت فعلی",
    description:
      "دفاتر، اظهارنامه‌ها و لیست بیمه فعلی کسب‌وکارتان را مرور می‌کنیم تا نقاط ریسک و فرصت‌های اصلاح را پیدا کنیم.",
  },
  {
    title: "شناسایی ریسک‌های مالیاتی و بیمه‌ای",
    description:
      "اگر جریمه یا بازرسی در راه باشد، معمولاً می‌شود از قبل تشخیصش داد. همین جلسه اول، سرنخ‌های اصلی را روشن می‌کند.",
  },
  {
    title: "پیشنهاد مسیر عملی، نه فروش بسته خدمات",
    description:
      "اگر متوجه شویم نیاز شما با یک اصلاح کوچک داخلی حل می‌شود، همان را پیشنهاد می‌دهیم؛ نه لزوماً همکاری بلندمدت.",
  },
];

const steps = [
  {
    number: "۰۱",
    title: "فرم را پر کنید",
    description: "نام، شماره تماس و توضیح کوتاهی از نیاز کسب‌وکارتان را بنویسید؛ کمتر از دو دقیقه.",
  },
  {
    number: "۰۲",
    title: "تماس کارشناس ظرف یک روز کاری",
    description: "یکی از کارشناسان مالی‌بان با شما تماس می‌گیرد تا زمان و شکل جلسه (حضوری یا آنلاین) را هماهنگ کند.",
  },
  {
    number: "۰۳",
    title: "جلسه ۳۰ دقیقه‌ای رایگان",
    description: "در یک گفت‌وگوی مستقیم و بدون تعهد، وضعیت کسب‌وکارتان را بررسی و مسیر پیشنهادی را دریافت می‌کنید.",
  },
];

const faq = [
  {
    question: "آیا این مشاوره واقعاً رایگان است؟",
    answer:
      "بله. جلسه اول مشاوره برای همه کسب‌وکارها رایگان و بدون هیچ تعهدی برای همکاری بعدی است. هدف این جلسه، شناخت نیاز شما و ارائه یک ارزیابی صادقانه است.",
  },
  {
    question: "جلسه چقدر طول می‌کشد و چطور برگزار می‌شود؟",
    answer:
      "معمولاً حدود ۳۰ دقیقه؛ به‌صورت حضوری در دفتر مالی‌بان در تهران یا به‌صورت آنلاین (تماس تلفنی یا تماس تصویری)، هرکدام که برایتان راحت‌تر باشد.",
  },
  {
    question: "برای جلسه چه مدارکی لازم است؟",
    answer:
      "چیز خاصی لازم نیست. اگر آخرین اظهارنامه مالیاتی، دفاتر حسابداری یا لیست بیمه در دسترس دارید همراه داشته باشید، اما نبودشان مانع برگزاری جلسه نمی‌شود.",
  },
  {
    question: "بعد از جلسه مشاوره، مجبور به همکاری هستم؟",
    answer:
      "خیر. در پایان جلسه، جمع‌بندی و پیشنهاد مسیر را دریافت می‌کنید و تصمیم ادامه یا عدم ادامه همکاری کاملاً با شماست.",
  },
];

export default function ConsultationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd data={faqSchema(faq)} />

        <Breadcrumbs items={[{ label: "مشاوره رایگان", href: "/consultation" }]} />
        <PageHeader
          eyebrow="مشاوره رایگان و بدون تعهد"
          title="۳۰ دقیقه که مسیر مالی کسب‌وکارتان را روشن می‌کند"
          description="فرم زیر را پر کنید تا یکی از کارشناسان مالی‌بان با شما تماس بگیرد و یک جلسه مشاوره رایگان درباره وضعیت حسابداری، مالیاتی و بیمه‌ای کسب‌وکارتان هماهنگ کند."
        />

        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow="در این جلسه چه می‌گذرد"
              title="یک ارزیابی صادقانه، نه یک جلسه فروش"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {expectations.map((item) => (
                <div key={item.title} className="rounded-2xl border border-brand-line bg-white p-6">
                  <h3 className="text-lg font-bold text-brand-ink-900">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-ink-600">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow="بعد از ثبت فرم" title="از فرم تا جلسه، سه قدم ساده" align="center" className="mx-auto" />
            <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
              <div className="absolute top-6 hidden h-px w-full bg-brand-line sm:block" />
              {steps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-brand-green-900/20 bg-brand-cream-50 text-lg font-bold text-brand-green-900">
                    {step.number}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-brand-ink-900 sm:text-3xl">
                یا مستقیم با ما در ارتباط باشید
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-brand-ink-600">
                اگر فرم پرکردن را ترجیح نمی‌دهید، از هر یک از راه‌های زیر هم می‌توانید درخواست مشاوره
                رایگان خود را ثبت کنید.
              </p>
              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="tel:+989900035009"
                  dir="ltr"
                  className="rounded-2xl border border-brand-line bg-white p-5 text-lg font-bold text-brand-ink-900 hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  {toPersianDigits("0990-003-5009")}
                </a>
                <a
                  href="https://wa.me/989900035009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-brand-line bg-white p-5 text-lg font-bold text-brand-ink-900 hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  پیام در واتساپ
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-line bg-white p-8 sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">فرم رزرو مشاوره رایگان</h2>
              <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">
                نام، شماره تماس و توضیح کوتاهی از نیاز خود را وارد کنید؛ حداکثر تا یک روز کاری با شما
                تماس می‌گیریم.
              </p>
              <ContactForm serviceLabel="مشاوره رایگان" className="mt-8" />
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="سؤالات متداول"
              title="سؤالاتی که پیش از رزرو مشاوره بیشتر می‌پرسند"
              align="center"
              className="mx-auto"
            />
            <div className="mx-auto mt-12 max-w-3xl">
              <FaqAccordion items={faq} />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
