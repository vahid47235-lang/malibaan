import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { mainNav, serviceLinks } from "@/lib/nav";
import { toPersianDigits } from "@/lib/utils";

const social = [
  { label: "اینستاگرام", href: "https://instagram.com/malibaan" },
  { label: "تلگرام", href: "https://t.me/malibaan" },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-7 text-brand-ink-600">
              مشاور حسابداری، مالیاتی و بیمه‌ای برای کسب‌وکارهای ایرانی؛ با
              شفافیت، دقت و استقلالی که هر کسب‌وکار سزاوار آن است.
            </p>
            <div className="mt-6 flex gap-3">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-brand-line px-4 py-1.5 text-sm text-brand-ink-600 hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-ink-900">صفحات</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-brand-ink-600 hover:text-brand-green-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-ink-900">خدمات</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-brand-ink-600 hover:text-brand-green-900">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-ink-900">تماس با ما</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-brand-ink-600">
              <li dir="ltr">
                <a href="tel:+989900035009" className="hover:text-brand-green-900">
                  {toPersianDigits("0990-003-5009")}
                </a>
              </li>
              <li dir="ltr">
                <a href="mailto:info@malibaan.com" className="hover:text-brand-green-900">
                  info@malibaan.com
                </a>
              </li>
              <li>تهران، خیابان ولیعصر، ساختمان مالی‌بان</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-brand-line pt-8 text-sm text-brand-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {toPersianDigits(new Date().getFullYear())} مالی‌بان. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-green-900">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="hover:text-brand-green-900">
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
