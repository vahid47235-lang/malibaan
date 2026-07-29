import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Link } from "@/components/i18n/link";
import { getMainNav, getServiceLinks } from "@/lib/nav";
import { getServices } from "@/lib/data/services";
import type { CommonDictionary } from "@/i18n/dictionary-types";
import type { Locale } from "@/i18n/config";
import { formatNumber } from "@/i18n/format";

export function Footer({ locale, dict }: { locale: Locale; dict: CommonDictionary }) {
  const mainNav = getMainNav(dict);
  const serviceLinks = getServiceLinks(getServices(locale));
  const social = [
    { label: dict.footer.socialInstagram, href: "https://instagram.com/malibaan" },
    { label: dict.footer.socialTelegram, href: "https://t.me/malibaan" },
  ];

  return (
    <footer className="border-t border-brand-line bg-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo locale={locale} />
            <p className="mt-5 max-w-xs text-[15px] leading-7 text-brand-ink-600">
              {dict.footer.description}
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
            <h3 className="text-sm font-bold text-brand-ink-900">{dict.footer.pagesHeading}</h3>
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
            <h3 className="text-sm font-bold text-brand-ink-900">{dict.footer.servicesHeading}</h3>
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
            <h3 className="text-sm font-bold text-brand-ink-900">{dict.footer.contactHeading}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-brand-ink-600">
              <li dir="ltr">
                <a href="tel:+989900035009" className="hover:text-brand-green-900">
                  {formatNumber("0990-003-5009", locale)}
                </a>
              </li>
              <li dir="ltr">
                <a href="mailto:info@malibaan.com" className="hover:text-brand-green-900">
                  info@malibaan.com
                </a>
              </li>
              <li>{dict.footer.addressLine}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-brand-line pt-8 text-sm text-brand-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {formatNumber(new Date().getFullYear(), locale)} {dict.footer.rightsReserved}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand-green-900">
              {dict.footer.privacy}
            </Link>
            <Link href="/terms" className="hover:text-brand-green-900">
              {dict.footer.terms}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
