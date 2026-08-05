import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { mainNavHrefs, serviceNavSlugs } from "@/lib/nav";
import { toPersianDigits } from "@/lib/utils";

const navKeyByHref: Record<string, string> = {
  "/services": "services",
  "/calculator": "calculator",
  "/about": "about",
  "/clients": "clients",
  "/blog": "blog",
  "/contact": "contact",
};

const social = [
  { key: "socialInstagram", href: "https://instagram.com/malibaan" },
  { key: "socialTelegram", href: "https://t.me/malibaan" },
];

export async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");
  const tServiceNav = await getTranslations("ServiceNav");
  const locale = await getLocale();
  const isFa = locale === "fa";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-line bg-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[15px] leading-7 text-brand-ink-600">{t("description")}</p>
            <div className="mt-6 flex gap-3">
              {social.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="rounded-full border border-brand-line px-4 py-1.5 text-sm text-brand-ink-600 hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-ink-900">{t("pagesHeading")}</h3>
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
            <h3 className="text-sm font-bold text-brand-ink-900">{t("servicesHeading")}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {serviceNavSlugs.map((slug) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="text-sm text-brand-ink-600 hover:text-brand-green-900">
                    {tServiceNav(slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-ink-900">{t("contactHeading")}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-brand-ink-600">
              <li dir="ltr">
                <a href="tel:+989900035009" className="hover:text-brand-green-900">
                  {isFa ? toPersianDigits("0990-003-5009") : "0990-003-5009"}
                </a>
              </li>
              <li dir="ltr">
                <a href="mailto:info@malibaan.com" className="hover:text-brand-green-900">
                  info@malibaan.com
                </a>
              </li>
              <li>{t("address")}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-brand-line pt-8 text-sm text-brand-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year: isFa ? toPersianDigits(year) : year })}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-green-900">
              {t("privacyLink")}
            </Link>
            <Link href="/terms" className="hover:text-brand-green-900">
              {t("termsLink")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
