export const SITE_URL = "https://malibaan.com";

export const locales = ["fa", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export const NEXT_LOCALE_COOKIE = "NEXT_LOCALE";

type LocaleMeta = {
  dir: "rtl" | "ltr";
  htmlLang: string;
  ogLocale: string;
  label: string;
  nativeLabel: string;
};

// Adding a new language only requires: (1) a new entry here, (2) a new
// src/locales/<code>/*.json set, (3) locale variants in src/lib/data/*.
// No routing, component, or SEO code needs to change.
export const localeMeta: Record<Locale, LocaleMeta> = {
  fa: { dir: "rtl", htmlLang: "fa", ogLocale: "fa_IR", label: "Persian", nativeLabel: "فارسی" },
  en: { dir: "ltr", htmlLang: "en", ogLocale: "en_US", label: "English", nativeLabel: "English" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Strips a known locale prefix from a pathname, returning the locale-agnostic path (always starting with "/"). */
export function stripLocaleFromPathname(pathname: string): { locale: Locale | null; path: string } {
  const segments = pathname.split("/");
  const candidate = segments[1];
  if (candidate && isLocale(candidate)) {
    const rest = "/" + segments.slice(2).join("/");
    return { locale: candidate, path: rest === "/" ? "/" : rest.replace(/\/+$/, "") || "/" };
  }
  return { locale: null, path: pathname || "/" };
}

/** Builds the visible URL path for a given locale-agnostic path. fa has no prefix (default, unprefixed). */
export function localizePath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path;
  if (locale === defaultLocale) return normalized || "/";
  return `/${locale}${normalized}`;
}
