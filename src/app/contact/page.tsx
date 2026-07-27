import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/ui/contact-form";
import { toPersianDigits } from "@/lib/utils";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های تماس با مالی‌بان؛ تلفن، واتساپ، ایمیل و آدرس دفتر. فرم درخواست مشاوره را پر کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "تماس با مالی‌بان",
    description: "راه‌های تماس با تیم مشاوره حسابداری، مالیاتی و بیمه‌ای مالی‌بان.",
    url: "https://malibaan.com/contact",
  },
};

const contactChannels = [
  {
    title: "تماس تلفنی",
    value: toPersianDigits("0990-003-5009"),
    href: "tel:+989900035009",
    dir: "ltr" as const,
  },
  {
    title: "واتساپ",
    value: "پیام در واتساپ",
    href: "https://wa.me/989900035009",
  },
  {
    title: "تلگرام",
    value: "@malibaan",
    href: "https://t.me/malibaan",
    dir: "ltr" as const,
  },
  {
    title: "اینستاگرام",
    value: "@malibaan",
    href: "https://instagram.com/malibaan",
    dir: "ltr" as const,
  },
  {
    title: "ایمیل",
    value: "info@malibaan.com",
    href: "mailto:info@malibaan.com",
    dir: "ltr" as const,
  },
  {
    title: "ساعات پاسخگویی",
    value: "شنبه تا چهارشنبه، ۹ تا ۱۸",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: "تماس با ما", href: "/contact" }]} />
        <PageHeader
          eyebrow="تماس با ما"
          title="راهی که برایتان راحت‌تر است، انتخاب کنید"
          description="از تماس تلفنی و واتساپ گرفته تا پر کردن فرم مشاوره؛ در هر مسیر، یک کارشناس واقعی پاسخگوی شماست، نه سیستم پاسخ خودکار."
        />

        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactChannels.map((channel) => (
                  <div key={channel.title} className="rounded-2xl border border-brand-line bg-white p-6">
                    <h3 className="text-sm font-semibold text-brand-green-700">{channel.title}</h3>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        dir={channel.dir}
                        className="mt-2 block text-lg font-bold text-brand-ink-900 hover:text-brand-green-900"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-lg font-bold text-brand-ink-900">{channel.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-brand-line bg-brand-cream-100 p-6">
                <h3 className="text-sm font-semibold text-brand-green-700">آدرس دفتر</h3>
                <p className="mt-2 text-[15px] leading-7 text-brand-ink-700">
                  تهران، خیابان ولیعصر، ساختمان مالی‌بان
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=%D8%AA%D9%87%D8%B1%D8%A7%D9%86%20%D8%AE%DB%8C%D8%A7%D8%A8%D8%A7%D9%86%20%D9%88%D9%84%DB%8C%D8%B9%D8%B5%D8%B1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-brand-green-900 hover:underline"
                >
                  مسیریابی در Google Maps ←
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-line bg-white p-8 sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">فرم درخواست مشاوره رایگان</h2>
              <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">
                نام، شماره تماس و توضیح کوتاهی از نیاز خود را وارد کنید؛ حداکثر تا یک روز کاری با
                شما تماس می‌گیریم.
              </p>
              <ContactForm className="mt-8" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
