"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { services, discountRules, referralCodes, settings, leads } from "@/db/schema";
import { computeQuote, type QuoteResult } from "@/lib/pricing";

async function loadPricingContext() {
  const [allServices, rulesRaw, referralCodesRaw, [maxDiscountSetting]] = await Promise.all([
    db.select().from(services).where(eq(services.isActive, true)),
    db.select().from(discountRules),
    db.select().from(referralCodes),
    db.select().from(settings).where(eq(settings.key, "maxTotalDiscountPercent")),
  ]);
  const maxTotalDiscountPercent = (maxDiscountSetting?.value as number | undefined) ?? 50;
  const allRules = rulesRaw.map((r) => ({ ...r, discountPercent: Number(r.discountPercent) }));
  const allReferralCodes = referralCodesRaw.map((r) => ({ ...r, discountPercent: Number(r.discountPercent) }));
  return { allServices, allRules, allReferralCodes, maxTotalDiscountPercent };
}

export async function previewQuoteAction(
  selectedServiceIds: number[],
  referralCode: string | null
): Promise<QuoteResult> {
  const { allServices, allRules, allReferralCodes, maxTotalDiscountPercent } = await loadPricingContext();
  const cart = allServices.filter((s) => selectedServiceIds.includes(s.id));

  return computeQuote({
    cart,
    rules: allRules,
    referralCode,
    referralCodes: allReferralCodes,
    maxTotalDiscountPercent,
  });
}

export type SubmitQuoteState = { success?: boolean; error?: string };

export async function submitQuoteLeadAction(
  _prevState: SubmitQuoteState,
  formData: FormData
): Promise<SubmitQuoteState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const referralCode = String(formData.get("referralCode") ?? "").trim() || null;
  const selectedServiceIds = formData
    .getAll("serviceIds")
    .map((v) => Number(v))
    .filter((n) => Number.isFinite(n));

  if (name.length < 2) return { error: "لطفاً نام و نام‌خانوادگی خود را وارد کنید." };
  if (!/^0?9\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
    return { error: "شماره موبایل معتبر نیست. مثال: 09121234567" };
  }
  if (selectedServiceIds.length === 0) {
    return { error: "حداقل یک خدمت را انتخاب کنید." };
  }

  const { allServices, allRules, allReferralCodes, maxTotalDiscountPercent } = await loadPricingContext();
  const cart = allServices.filter((s) => selectedServiceIds.includes(s.id));
  const quote = computeQuote({
    cart,
    rules: allRules,
    referralCode,
    referralCodes: allReferralCodes,
    maxTotalDiscountPercent,
  });

  await db.insert(leads).values({
    name,
    phone,
    source: "calculator",
    selectedServiceIds,
    quoteTotalToman: quote.totalToman,
    referralCode: quote.referralCodeApplied,
  });

  return { success: true };
}
