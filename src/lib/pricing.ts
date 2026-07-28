export type PricedService = {
  id: number;
  categoryId: number;
  name: string;
  priceToman: number;
};

export type DiscountRuleInput = {
  id: number;
  label: string;
  minCategories: number | null;
  minServices: number | null;
  requiredCategoryIds: number[] | null;
  requiredServiceIds: number[] | null;
  discountPercent: number;
  isActive: boolean;
};

export type ReferralCodeInput = {
  code: string;
  discountPercent: number;
  isActive: boolean;
};

export type QuoteResult = {
  lineItems: PricedService[];
  subtotalToman: number;
  bundleDiscountPercent: number;
  bundleRuleLabel: string | null;
  referralDiscountPercent: number;
  referralCodeApplied: string | null;
  totalDiscountPercent: number;
  discountToman: number;
  totalToman: number;
};

function ruleMatches(rule: DiscountRuleInput, cart: PricedService[]): boolean {
  if (!rule.isActive) return false;

  const cartIds = new Set(cart.map((s) => s.id));
  const distinctCategories = new Set(cart.map((s) => s.categoryId));

  if (rule.requiredServiceIds && rule.requiredServiceIds.length > 0) {
    if (!rule.requiredServiceIds.every((id) => cartIds.has(id))) return false;
  }
  if (rule.requiredCategoryIds && rule.requiredCategoryIds.length > 0) {
    if (!rule.requiredCategoryIds.every((categoryId) => distinctCategories.has(categoryId))) return false;
  }
  if (rule.minCategories != null && distinctCategories.size < rule.minCategories) return false;
  if (rule.minServices != null && cart.length < rule.minServices) return false;

  // A rule with no constraints at all should never auto-match.
  const hasAnyConstraint =
    (rule.requiredServiceIds && rule.requiredServiceIds.length > 0) ||
    (rule.requiredCategoryIds && rule.requiredCategoryIds.length > 0) ||
    rule.minCategories != null ||
    rule.minServices != null;

  return Boolean(hasAnyConstraint);
}

export function computeQuote({
  cart,
  rules,
  referralCode,
  referralCodes,
  maxTotalDiscountPercent,
}: {
  cart: PricedService[];
  rules: DiscountRuleInput[];
  referralCode?: string | null;
  referralCodes: ReferralCodeInput[];
  maxTotalDiscountPercent: number;
}): QuoteResult {
  const subtotalToman = cart.reduce((sum, item) => sum + item.priceToman, 0);

  const matchingRules = rules.filter((rule) => ruleMatches(rule, cart));
  const bestRule = matchingRules.reduce<DiscountRuleInput | null>((best, rule) => {
    if (!best || rule.discountPercent > best.discountPercent) return rule;
    return best;
  }, null);

  const bundleDiscountPercent = bestRule?.discountPercent ?? 0;
  const bundleRuleLabel = bestRule?.label ?? null;

  const normalizedCode = referralCode?.trim().toUpperCase() || null;
  const matchedReferral = normalizedCode
    ? referralCodes.find((r) => r.isActive && r.code.toUpperCase() === normalizedCode)
    : undefined;
  const referralDiscountPercent = matchedReferral?.discountPercent ?? 0;

  const totalDiscountPercent = Math.min(
    bundleDiscountPercent + referralDiscountPercent,
    maxTotalDiscountPercent
  );

  const discountToman = Math.round((subtotalToman * totalDiscountPercent) / 100);
  const totalToman = subtotalToman - discountToman;

  return {
    lineItems: cart,
    subtotalToman,
    bundleDiscountPercent,
    bundleRuleLabel,
    referralDiscountPercent,
    referralCodeApplied: matchedReferral ? matchedReferral.code : null,
    totalDiscountPercent,
    discountToman,
    totalToman,
  };
}
