"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { mainNavHrefs } from "@/lib/nav";
import { toPersianDigits } from "@/lib/utils";

const navKeyByHref: Record<string, string> = {
  "/services": "services",
  "/calculator": "calculator",
  "/about": "about",
  "/clients": "clients",
  "/blog": "blog",
  "/contact": "contact",
};

export function Header() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isFa = locale === "fa";

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/70 bg-brand-cream-50/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="/" aria-label="مالی‌بان">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {mainNavHrefs.map((href) => (
            <Link
              key={href}
              href={href}
              className="text-[15px] font-medium text-brand-ink-600 transition-colors hover:text-brand-green-900"
            >
              {t(navKeyByHref[href])}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+989900035009"
            className="text-sm font-medium text-brand-ink-600 hover:text-brand-green-900"
            dir="ltr"
          >
            {isFa ? toPersianDigits("0990-003-5009") : "0990-003-5009"}
          </a>
          <Link
            href={pathname}
            locale={isFa ? "en" : "fa"}
            className="text-sm font-medium text-brand-ink-600 hover:text-brand-green-900"
          >
            {t("languageSwitch")}
          </Link>
          <Button href="/consultation" size="sm">
            {t("consultationCta")}
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-brand-line lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("menuOpen")}
          aria-expanded={open}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {open ? (
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M1 4H17M1 9H17M1 14H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-brand-line bg-brand-cream-50 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNavHrefs.map((href) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-brand-ink-900 hover:bg-brand-cream-100"
                onClick={() => setOpen(false)}
              >
                {t(navKeyByHref[href])}
              </Link>
            ))}
            <Link
              href={pathname}
              locale={isFa ? "en" : "fa"}
              className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-brand-ink-900 hover:bg-brand-cream-100"
              onClick={() => setOpen(false)}
            >
              {t("languageSwitch")}
            </Link>
            <div className="mt-2 flex items-center gap-3 px-3">
              <Button href="/consultation" size="sm" className="w-full">
                {t("consultationCta")}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
