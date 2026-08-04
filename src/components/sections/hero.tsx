import { getTranslations, getLocale } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { toPersianDigits } from "@/lib/utils";

const AMOUNTS = {
  revenue: 482_000_000,
  costs: 310_000_000,
  profit: 172_000_000,
};

export async function Hero() {
  const t = await getTranslations("Hero");
  const locale = await getLocale();
  const isFa = locale === "fa";
  const trustPoints = [t("trustPoint1"), t("trustPoint2"), t("trustPoint3")];
  const titlePart2 = t("titlePart2");

  const fmt = (value: number) => {
    const withCommas = value.toLocaleString("en-US");
    return isFa ? toPersianDigits(withCommas) : withCommas;
  };
  const pct = (value: string) => (isFa ? toPersianDigits(value) : value);

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(13,66,20,0.09) 1px, transparent 1.4px)",
          backgroundSize: "24px 24px",
          // The visual (statement card) sits on the physical left in fa (RTL grid
          // auto-flows right-to-left) and on the physical right in en — fade the
          // texture out on whichever side holds the text, not the card.
          WebkitMaskImage: `linear-gradient(${isFa ? "to right" : "to left"}, black, transparent 70%)`,
          maskImage: `linear-gradient(${isFa ? "to right" : "to left"}, black, transparent 70%)`,
        }}
      />

      <Container className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-green-900/15 bg-white px-4 py-1.5 text-sm font-medium text-brand-green-900">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-mint-500" />
            {t("badge")}
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.25] tracking-tight text-brand-ink-900 sm:text-5xl sm:leading-[1.2]">
            {t("titlePart1")}
            <span className="text-brand-green-900"> {t("titleHighlight")} </span>
            {titlePart2}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-brand-ink-600">{t("description")}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/consultation" size="lg">
              {t("ctaPrimary")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              {t("ctaSecondary")}
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

        <div className="relative py-2">
          <div className="relative mx-auto w-full max-w-md -rotate-3 rounded-2xl border border-brand-line bg-white p-6 shadow-2xl shadow-brand-green-900/20 sm:p-7">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-base font-extrabold text-brand-ink-900">{t("statementTitle")}</p>
                <p className="mt-1 text-xs text-brand-ink-400">{t("statementSubtitle")}</p>
              </div>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-brand-mint-300 px-2.5 py-1 text-[11px] font-bold text-brand-green-700">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("statementBadge")}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-dashed border-brand-line pb-3">
                <span className="text-sm text-brand-ink-600">{t("rowRevenue")}</span>
                <span className="flex items-center gap-1.5">
                  <span dir="ltr" className="text-[15px] font-bold text-brand-ink-900 [font-variant-numeric:tabular-nums]">
                    {fmt(AMOUNTS.revenue)}
                  </span>
                  <span dir="ltr" className="rounded-md bg-brand-mint-300 px-1.5 py-0.5 text-[11px] font-bold text-brand-green-700">
                    +{pct("14")}٪
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-dashed border-brand-line pb-3">
                <span className="text-sm text-brand-ink-600">{t("rowCosts")}</span>
                <span className="flex items-center gap-1.5">
                  <span dir="ltr" className="text-[15px] font-bold text-brand-ink-900 [font-variant-numeric:tabular-nums]">
                    {fmt(AMOUNTS.costs)}
                  </span>
                  <span dir="ltr" className="rounded-md bg-brand-mint-300 px-1.5 py-0.5 text-[11px] font-bold text-brand-green-700">
                    −{pct("3")}٪
                  </span>
                </span>
              </div>

              <div className="-mx-2.5 flex items-center justify-between rounded-xl bg-brand-cream-100 px-2.5 py-2.5">
                <span className="text-sm font-bold text-brand-ink-900">{t("rowProfit")}</span>
                <span className="flex items-center gap-1.5">
                  <svg width="42" height="18" viewBox="0 0 46 20" fill="none" className="shrink-0">
                    <polyline
                      points="1,17 9,14 17,15 25,8 33,9 45,2"
                      stroke="#328848"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span dir="ltr" className="text-[15px] font-bold text-brand-ink-900 [font-variant-numeric:tabular-nums]">
                    {fmt(AMOUNTS.profit)}
                  </span>
                  <span dir="ltr" className="rounded-md bg-brand-mint-300 px-1.5 py-0.5 text-[11px] font-bold text-brand-green-700">
                    +{pct("22")}٪
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-brand-green-700">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6.2 11.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("stampText")}
            </div>

            <div className="absolute -bottom-5 hidden w-48 rotate-2 rounded-xl border border-brand-line border-s-[3px] border-s-brand-mint-500 bg-white p-3 text-xs leading-relaxed text-brand-ink-900 shadow-lg shadow-brand-green-900/15 start-[-1.5rem] sm:block">
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-brand-green-800">
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-brand-green-900 text-[10px] font-extrabold text-white">
                  ✓
                </span>
                {t("calloutRole")}
              </p>
              {t("calloutText")}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
