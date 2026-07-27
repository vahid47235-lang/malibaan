import Link from "next/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { mainNav, serviceLinks } from "@/lib/nav";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <Container className="text-center">
            <p className="font-en text-6xl font-bold text-brand-green-900/20 sm:text-7xl">404</p>
            <h1 className="mt-4 text-2xl font-bold text-brand-ink-900 sm:text-3xl">
              این صفحه پیدا نشد
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-brand-ink-600">
              ممکن است آدرس اشتباه وارد شده باشد یا صفحه جابه‌جا شده باشد. می‌توانید از لینک‌های
              زیر ادامه دهید یا مستقیم با ما تماس بگیرید.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/" size="lg">
                بازگشت به صفحه اصلی
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                تماس با ما
              </Button>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl gap-8 text-start sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-bold text-brand-ink-900">صفحات پرکاربرد</h2>
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
                <h2 className="text-sm font-bold text-brand-ink-900">خدمات مالی‌بان</h2>
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
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
