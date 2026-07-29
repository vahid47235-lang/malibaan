import { toPersianDigits, formatJalaliDate } from "@/lib/utils";
import type { Locale } from "./config";

/** Interpolates {key} placeholders in a dictionary template string, e.g. t("Hi {name}", { name: "Ali" }). */
export function t(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = vars[key];
    return value === undefined ? match : String(value);
  });
}

/** Renders a number/index using locale-correct numerals (Persian digits for fa, Latin for en). */
export function formatNumber(value: string | number, locale: Locale): string {
  return locale === "fa" ? toPersianDigits(value) : String(value);
}

/** Renders an ISO date using the locale's calendar and numerals (Jalali for fa, Gregorian for en). */
export function formatDate(isoDate: string, locale: Locale): string {
  if (locale === "fa") return formatJalaliDate(isoDate);
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
