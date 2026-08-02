import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { mainNavHrefs, serviceNavSlugs } from "@/lib/nav";

const navKeyByHref: Record<string, string> = {
  "/services": "services",
  "/calculator": "calculator",
  "/about": "about",
  "/clients": "clients",
  "/blog": "blog",
  "/contact": "contact",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  return {
    title: t("title"),
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  const tNav = await getTranslations("Nav");
  const tServiceNav = await getTranslations("ServiceNav");

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <Container className="text-center">
            <p className="font-en text-6xl font-bold text-brand-green-900/20 sm:text-7xl">404</p>
            <h1 className="mt-4 text-2xl font-bold text-brand-ink-900 sm:text-3xl">{t("title")}</h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-7 text-brand-ink-600">
              {t("description")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/" size="lg">
                {t("backHome")}
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                {t("contactUs")}
              </Button>
            </div>

            <div className="mx-auto mt-16 grid max-w-2xl gap-8 text-start sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-bold text-brand-ink-900">{t("popularPages")}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {mainNavHrefs.map((href) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-brand-ink-600 hover:text-brand-green-900">
                        {tNav(navKeyByHref[href])}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-bold text-brand-ink-900">{t("popularServices")}</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {serviceNavSlugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/services/${slug}`}
                        className="text-sm text-brand-ink-600 hover:text-brand-green-900"
                      >
                        {tServiceNav(slug)}
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
