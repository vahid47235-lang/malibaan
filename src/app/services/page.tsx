import type { Metadata } from "next";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { services } from "@/lib/services-data";
import { toPersianDigits } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "خدمات مالی‌بان",
  description:
    "خدمات حسابداری، مالیاتی، بیمه‌ای و ثبتی مالی‌بان برای کسب‌وکارهای ایرانی؛ از ثبت شرکت تا حسابرسی، با یک تیم واحد و کارشناس ثابت.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "خدمات مالی‌بان",
    description: "خدمات حسابداری، مالیاتی، بیمه‌ای و ثبتی مالی‌بان برای کسب‌وکارهای ایرانی.",
    url: "https://malibaan.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: "خدمات", href: "/services" }]} />
        <PageHeader
          eyebrow="خدمات مالی‌بان"
          title="خدمات حسابداری، مالیاتی و بیمه‌ای برای هر مرحله از رشد کسب‌وکار"
          description="از تأسیس شرکت تا حسابرسی سالانه؛ هر خدمت با کارشناس ثابت، فرآیند شفاف و گزارش قابل دفاع در برابر دارایی و بیمه ارائه می‌شود."
        />

        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-green-900/25 hover:shadow-lg hover:shadow-brand-ink-900/5"
                >
                  <div>
                    <span className="text-sm font-semibold text-brand-green-700/50">
                      {toPersianDigits(String(index + 1).padStart(2, "0"))}
                    </span>
                    <h2 className="mt-4 text-xl font-bold text-brand-ink-900">
                      {service.navLabel}
                    </h2>
                    <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">
                      {service.metaDescription}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-900">
                    جزئیات خدمت
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="rotate-180 transition-transform group-hover:-translate-x-1"
                    >
                      <path
                        d="M3 8H13M13 8L9 4M13 8L9 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-brand-line bg-brand-cream-100 p-8 text-center sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">
                خدمت مورد نظرتان را در این فهرست پیدا نکردید؟
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-brand-ink-600">
                علاوه بر خدمات بالا، مالی‌بان در حوزه‌های تخصصی‌تری مانند ثبت صورتجلسات، افزایش
                سرمایه، منابع انسانی و راه‌اندازی نرم‌افزار حسابداری نیز به کسب‌وکارها مشاوره
                می‌دهد. کافی است با ما تماس بگیرید تا نیاز دقیق‌تان را بررسی کنیم.
              </p>
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
