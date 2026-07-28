import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { toPersianDigits } from "@/lib/utils";

const services = [
  {
    title: "حسابداری و دفترداری",
    description:
      "تنظیم اسناد حسابداری، کدینگ استاندارد و گزارش‌های دوره‌ای دقیق؛ به‌گونه‌ای که همیشه بدانید وضعیت مالی کسب‌وکارتان کجاست.",
    href: "/services/accounting",
  },
  {
    title: "مشاوره مالیاتی",
    description:
      "تنظیم اظهارنامه، دفاع در هیئت‌های مالیاتی و برنامه‌ریزی برای کاهش قانونی مالیات و جرایم عملکرد.",
    href: "/services/tax-consulting",
  },
  {
    title: "سامانه مودیان و ارزش‌افزوده",
    description:
      "ثبت‌نام، صدور صورتحساب الکترونیکی و تطبیق کامل با الزامات سامانه مودیان بدون دغدغه جریمه.",
    href: "/services/vat",
  },
  {
    title: "حقوق، دستمزد و بیمه",
    description:
      "محاسبه دقیق حقوق و دستمزد، لیست بیمه تأمین اجتماعی و دریافت مفاصا‌حساب، هر ماه به‌موقع و بدون خطا.",
    href: "/services/payroll",
  },
  {
    title: "حسابرسی و کنترل داخلی",
    description:
      "گزارش حسابرسی برای ارائه به بانک‌ها و دارایی، به‌همراه استقرار کنترل‌های داخلی برای رشد پایدار.",
    href: "/services/audit",
  },
  {
    title: "ثبت شرکت و برند",
    description:
      "از انتخاب نوع شرکت تا ثبت در روزنامه رسمی و اخذ برند تجاری، تمام مراحل قانونی راه‌اندازی کسب‌وکار را برایتان مدیریت می‌کنیم.",
    href: "/services/company-registration",
  },
];

export function ServicesGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="خدمات مالی‌بان"
            title="هر آنچه کسب‌وکار شما برای سلامت مالی نیاز دارد"
            description="از تأسیس شرکت تا حسابرسی سالانه؛ یک تیم واحد، مسئول همه فرآیندهای مالی، مالیاتی و بیمه‌ای شما."
          />
          <Link
            href="/services"
            className="hidden shrink-0 text-sm font-semibold text-brand-green-900 hover:underline sm:block"
          >
            مشاهده همه خدمات ←
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col justify-between rounded-2xl border border-brand-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-brand-green-900/25 hover:shadow-lg hover:shadow-brand-ink-900/5"
            >
              <div>
                <span className="text-sm font-semibold text-brand-green-700/50">
                  {toPersianDigits(String(index + 1).padStart(2, "0"))}
                </span>
                <h3 className="mt-4 text-xl font-bold text-brand-ink-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">
                  {service.description}
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
      </Container>
    </section>
  );
}
