import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import type { HomeDictionary, CommonDictionary } from "@/i18n/dictionary-types";
import type { Locale } from "@/i18n/config";

export function Hero({
  locale,
  dict,
  commonDict,
}: {
  locale: Locale;
  dict: HomeDictionary;
  commonDict: CommonDictionary;
}) {
  const { hero, trustPoints } = dict;

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green-900/15 bg-white px-4 py-1.5 text-sm font-medium text-brand-green-900">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint-500" />
            {hero.eyebrow}
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight text-brand-ink-900 sm:text-5xl sm:leading-[1.2]">
            {hero.title}
            <span className="text-brand-green-900"> {hero.highlight} </span>
            {hero.titleSuffix}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-brand-ink-600">{hero.description}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/consultation" size="lg">
              {hero.ctaPrimary}
              <ArrowIcon />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              {hero.ctaSecondary}
            </Button>
          </div>

          <ul className="mt-10 flex flex-col gap-3 border-t border-brand-line pt-6 sm:flex-row sm:gap-8">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-brand-ink-600">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-brand-green-700">
                  <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand-green-900 to-brand-green-950 shadow-2xl shadow-brand-green-900/25 sm:mx-auto lg:mx-0 lg:me-0">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-35deg, white 0px, white 3px, transparent 3px, transparent 26px)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-mint-500/40 to-transparent" />

            <div className="relative flex h-full flex-col items-center justify-center gap-6 p-8 pb-16">
              <Image
                src="/brand/png/white/malibaan-symbol-white-512.png"
                alt={locale === "fa" ? "نماد مالی‌بان" : "The Malibaan mark"}
                width={310}
                height={397}
                className="w-[62%] max-w-[240px] opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                priority
              />
              <p className="text-center text-2xl font-bold leading-tight text-white">
                {commonDict.brandTagline}
              </p>
            </div>
          </div>

          <div className="absolute -bottom-6 start-4 hidden w-56 rounded-2xl border border-brand-line bg-white p-4 shadow-lg shadow-brand-ink-900/5 sm:block">
            <p className="text-3xl font-bold text-brand-green-900">{hero.trustLineValue}</p>
            <p className="mt-1 text-sm text-brand-ink-600">{hero.trustLineLabel}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
