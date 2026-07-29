import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/i18n/link";
import { getMainNav, getServiceLinks } from "@/lib/nav";
import { getServices } from "@/lib/data/services";
import { getDictionary } from "@/i18n/get-dictionary";
import { NEXT_LOCALE_COOKIE, defaultLocale, isLocale } from "@/i18n/config";

async function resolveLocale() {
  const cookieStore = await cookies();
  const value = cookieStore.get(NEXT_LOCALE_COOKIE)?.value;
  return value && isLocale(value) ? value : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const dict = await getDictionary(locale);
  return {
    title: dict.common.notFound.metaTitle,
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const locale = await resolveLocale();
  const dict = await getDictionary(locale);
  const mainNav = getMainNav(dict.common);
  const serviceLinks = getServiceLinks(getServices(locale));

  return (
    <>
      <Header locale={locale} dict={dict.common} />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <Container className="text-center">
            <p className="font-en text-6xl font-bold text-brand-green-900/20 sm:text-7xl">
              {dict.common.notFound.eyebrow}
            </p>
            <h1 className="mt-4 text-2xl font-bold text-brand-ink-900 sm:text-3xl">
              {dict.common.notFound.title}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-brand-ink-600">
              {dict.common.notFound.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/" size="lg">
                {dict.common.buttons.backToHome}
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                {dict.common.buttons.contactUs}
              </Button>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl gap-8 text-start sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-bold text-brand-ink-900">{dict.common.notFound.popularPages}</h2>
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
                <h2 className="text-sm font-bold text-brand-ink-900">{dict.common.notFound.ourServices}</h2>
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
      <Footer locale={locale} dict={dict.common} />
      <WhatsAppButton dict={dict.common} />
    </>
  );
}
