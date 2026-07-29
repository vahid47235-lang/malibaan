"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { formatNumber, t } from "@/i18n/format";
import type { Locale } from "@/i18n/config";
import type { CalculatorDictionary } from "@/i18n/dictionary-types";
import { previewQuoteAction, submitQuoteLeadAction, type SubmitQuoteState } from "./actions";
import type { QuoteResult } from "@/lib/pricing";

type ServiceOption = {
  id: number;
  name: string;
  priceToman: number;
};

type CategoryOption = {
  id: number;
  label: string;
  services: ServiceOption[];
};

const initialSubmitState: SubmitQuoteState = {};

export function CalculatorClient({
  categories,
  locale,
  dict,
  submittingLabel,
}: {
  categories: CategoryOption[];
  locale: Locale;
  dict: CalculatorDictionary;
  submittingLabel: string;
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [referralCode, setReferralCode] = useState("");
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [submitState, submitAction, submitPending] = useActionState(
    (state: SubmitQuoteState, formData: FormData) => submitQuoteLeadAction(locale, state, formData),
    initialSubmitState
  );

  function formatToman(value: number): string {
    return `${formatNumber(value.toLocaleString("en-US"), locale)} ${dict.currencySuffix}`;
  }

  useEffect(() => {
    if (selectedIds.length === 0) return;
    startTransition(async () => {
      const result = await previewQuoteAction(selectedIds, referralCode || null);
      setQuote(result);
    });
  }, [selectedIds, referralCode]);

  const displayedQuote = selectedIds.length === 0 ? null : quote;

  function toggleService(id: number) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  if (submitState.success) {
    return (
      <div className="rounded-2xl border border-brand-green-900/20 bg-brand-mint-300/40 p-8 text-center">
        <p className="text-lg font-bold text-brand-green-900">{dict.successTitle}</p>
        <p className="mt-2 text-[15px] leading-7 text-brand-ink-700">{dict.successBody}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
      <div className="flex flex-col gap-6">
        {categories.map((category) => (
          <div key={category.id} className="rounded-2xl border border-brand-line bg-white p-6">
            <h2 className="text-base font-bold text-brand-ink-900">{category.label}</h2>
            <div className="mt-4 flex flex-col gap-2">
              {category.services.map((service) => (
                <label
                  key={service.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-brand-line px-4 py-3 text-[15px] hover:border-brand-green-900/30"
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(service.id)}
                      onChange={() => toggleService(service.id)}
                    />
                    {service.name}
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-brand-ink-600" dir="ltr">
                    {formatToman(service.priceToman)}
                  </span>
                </label>
              ))}
              {category.services.length === 0 && (
                <p className="text-sm text-brand-ink-400">{dict.noServicesInCategory}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky top-24 rounded-2xl border border-brand-line bg-brand-cream-100 p-6 sm:p-8">
        <h2 className="text-lg font-bold text-brand-ink-900">{dict.quoteHeading}</h2>

        <div className="mt-2">
          <label className="mb-1.5 block text-sm font-medium text-brand-ink-900">{dict.referralLabel}</label>
          <input
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            dir="ltr"
            placeholder={dict.referralPlaceholder}
            className="w-full rounded-lg border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-green-900/50"
          />
        </div>

        {!displayedQuote && <p className="mt-6 text-sm text-brand-ink-400">{dict.selectAtLeastOne}</p>}

        {displayedQuote && (
          <div className={isPending ? "opacity-60" : ""}>
            <ul className="mt-6 flex flex-col gap-2 border-b border-brand-line/70 pb-4">
              {displayedQuote.lineItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between text-sm text-brand-ink-700">
                  <span>{item.name}</span>
                  <span dir="ltr">{formatToman(item.priceToman)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              <div className="flex items-center justify-between text-brand-ink-600">
                <span>{dict.subtotalLabel}</span>
                <span dir="ltr">{formatToman(displayedQuote.subtotalToman)}</span>
              </div>
              {displayedQuote.bundleDiscountPercent > 0 && (
                <div className="flex items-center justify-between text-brand-green-800">
                  <span>
                    {t(dict.bundleDiscountTemplate, {
                      rule: displayedQuote.bundleRuleLabel ?? "",
                      percent: formatNumber(displayedQuote.bundleDiscountPercent, locale),
                    })}
                  </span>
                </div>
              )}
              {displayedQuote.referralDiscountPercent > 0 && (
                <div className="flex items-center justify-between text-brand-green-800">
                  <span>
                    {t(dict.referralDiscountTemplate, {
                      percent: formatNumber(displayedQuote.referralDiscountPercent, locale),
                    })}
                  </span>
                </div>
              )}
              {displayedQuote.totalDiscountPercent > 0 && (
                <div className="flex items-center justify-between font-semibold text-brand-green-800">
                  <span>
                    {t(dict.totalDiscountTemplate, {
                      percent: formatNumber(displayedQuote.totalDiscountPercent, locale),
                    })}
                  </span>
                  <span dir="ltr">-{formatToman(displayedQuote.discountToman)}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-brand-line pt-4 text-lg font-bold text-brand-ink-900">
              <span>{dict.totalLabel}</span>
              <span dir="ltr">{formatToman(displayedQuote.totalToman)}</span>
            </div>

            <form action={submitAction} className="mt-6 flex flex-col gap-3 border-t border-brand-line pt-6">
              {selectedIds.map((id) => (
                <input key={id} type="hidden" name="serviceIds" value={id} />
              ))}
              <input type="hidden" name="referralCode" value={referralCode} />
              <input
                name="name"
                placeholder={dict.namePlaceholder}
                required
                className="rounded-lg border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-green-900/50"
              />
              <input
                name="phone"
                type="tel"
                dir="ltr"
                placeholder={dict.phonePlaceholder}
                required
                className="rounded-lg border border-brand-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-green-900/50"
              />
              {submitState.error && <p className="text-sm text-red-600">{submitState.error}</p>}
              <button
                type="submit"
                disabled={submitPending}
                className="rounded-full bg-brand-green-900 px-5 py-3 text-[15px] font-medium text-white hover:bg-brand-green-800 disabled:opacity-60"
              >
                {submitPending ? submittingLabel : dict.submitCta}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
