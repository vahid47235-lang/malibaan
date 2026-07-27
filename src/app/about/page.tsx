import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StatsBar } from "@/components/sections/stats-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "مالی‌بان یک تیم مشاوره حسابداری، مالیاتی و بیمه‌ای است که کنار کسب‌وکارهای ایرانی می‌ایستد؛ با شفافیت، استقلال حرفه‌ای و پاسخگویی مستقیم کارشناس.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "درباره مالی‌بان",
    description: "تیم مشاوره حسابداری، مالیاتی و بیمه‌ای برای کسب‌وکارهای ایرانی.",
    url: "https://malibaan.com/about",
  },
};

const values = [
  {
    title: "شفافیت به‌جای پیچیدگی",
    description:
      "هر گزارش مالی را با زبانی ساده توضیح می‌دهیم؛ نه فقط یک فایل عددی که فقط حسابدار آن را می‌فهمد.",
  },
  {
    title: "استقلال حرفه‌ای",
    description:
      "مشاوره ما بر مبنای منافع بلندمدت کسب‌وکار شماست، حتی اگر این توصیه به معنای فروش کمتر خدمات باشد.",
  },
  {
    title: "پاسخگویی، نه صف پشتیبانی",
    description:
      "برای هر کسب‌وکار یک کارشناس مشخص تعیین می‌شود که از روز اول تا امروز، پرونده شما را می‌شناسد.",
  },
  {
    title: "دقتی که قابل دفاع است",
    description:
      "اسناد و گزارش‌ها را طوری آماده می‌کنیم که در بازرسی دارایی، بیمه یا حسابرسی، بدون دغدغه ارائه شود.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: "درباره ما", href: "/about" }]} />
        <PageHeader
          eyebrow="درباره مالی‌بان"
          title="مشاوری که کنار میز کسب‌وکار شما می‌نشیند، نه پشت یک فرم اداری"
          description="مالی‌بان از یک باور ساده شکل گرفت: هر کسب‌وکار ایرانی، صرف‌نظر از اندازه‌اش، سزاوار مشاوره مالی دقیق، شفاف و مستقل است."
        />

        <section className="py-20 sm:py-28">
          <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="داستان ما" title="از یک دفتر کوچک حسابداری، تا شریک مالی صدها کسب‌وکار" />
              <div className="mt-6 flex flex-col gap-5 text-[15px] leading-8 text-brand-ink-600">
                <p>
                  مالی‌بان کار خود را با مشاوره به تعداد محدودی کسب‌وکار کوچک آغاز کرد؛ کسب‌وکارهایی
                  که از دست حسابدارهای پراکنده، گزارش‌های ناهماهنگ و جریمه‌های غیرمنتظره مالیاتی و
                  بیمه‌ای خسته شده بودند. مسئله مشترک همه آن‌ها یک چیز بود: نبود یک تیم واحد و
                  پاسخگو که مسئولیت کل چرخه مالی کسب‌وکار را بر عهده بگیرد.
                </p>
                <p>
                  امروز این تیم به مجموعه‌ای از کارشناسان حسابداری، مشاوران مالیاتی و متخصصان بیمه
                  تأمین اجتماعی تبدیل شده که در کنار هم، از لحظه ثبت شرکت تا حسابرسی سالانه، یک
                  مسیر مالی واحد و شفاف برای مشتریان می‌سازند. رشد مالی‌بان همیشه از طریق معرفی
                  مشتریان راضی بوده، نه تبلیغات پرهزینه؛ و همین موضوع، اولویت ما را روشن نگه داشته:
                  کیفیت کار، نه تعداد پرونده.
                </p>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand-green-900 to-brand-green-950 shadow-2xl shadow-brand-green-900/25">
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-35deg, white 0px, white 3px, transparent 3px, transparent 26px)",
                }}
              />
              <div className="relative flex h-full flex-col items-center justify-center gap-6 p-8">
                <Image
                  src="/brand/png/white/malibaan-symbol-white-512.png"
                  alt="نماد مالی‌بان"
                  width={310}
                  height={397}
                  className="w-[55%] max-w-[220px] opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                />
                <p className="text-center text-xl font-bold leading-tight text-white">
                  شفافیت، تخصص، تحول در حسابداری.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <StatsBar />

        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="اصول کاری ما"
              title="چهار اصلی که هیچ‌وقت زیر فشار کار قربانی نمی‌شوند"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl border border-brand-line bg-white p-7">
                  <h3 className="text-lg font-bold text-brand-ink-900">{value.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-ink-600">{value.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow="تیم مالی‌بان"
              title="کارشناسانی که پرونده شما را واقعاً می‌شناسند"
              description="تیم ما را حسابداران و مشاوران مالیاتی با سال‌ها تجربه اجرایی در صنایع مختلف تشکیل می‌دهند و در پرونده‌های پیچیده‌تر، با کارشناسان رسمی دادگستری و حسابرسان مستقل همکاری می‌کنیم."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { title: "کارشناسان حسابداری و دفترداری", description: "مسئول ثبت اسناد، کدینگ و گزارش‌های دوره‌ای مالی." },
                { title: "مشاوران مالیاتی و بیمه‌ای", description: "مسئول تنظیم اظهارنامه، لیست بیمه و دفاع در هیئت‌های رسیدگی." },
                { title: "کارشناسان ثبت شرکت و برند", description: "مسئول فرآیندهای حقوقی تأسیس، تغییرات و ثبت مالکیت فکری." },
                { title: "همکاران حسابرسی مستقل", description: "برای پروژه‌های حسابرسی و کنترل داخلی با تیم شما همکاری می‌کنند." },
              ].map((role) => (
                <div key={role.title} className="rounded-xl border border-brand-line bg-brand-cream-50 p-5">
                  <h3 className="text-[15px] font-bold text-brand-ink-900">{role.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-ink-600">{role.description}</p>
                </div>
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
