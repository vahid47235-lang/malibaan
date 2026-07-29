import { SITE_URL, locales, defaultLocale, localeMeta, localizePath, type Locale } from "./config";

export function absoluteUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localizePath(locale, path)}`;
}

/**
 * Canonical + hreflang alternates for a page. Pass a narrower `availableLocales`
 * list for content that doesn't exist in every language (e.g. a blog post
 * published in only one locale) so hreflang never points at a 404.
 */
export function buildAlternates(locale: Locale, path: string, availableLocales: readonly Locale[] = locales) {
  const languages: Record<string, string> = {};
  for (const l of availableLocales) {
    languages[l] = absoluteUrl(l, path);
  }
  if (availableLocales.includes(defaultLocale)) {
    languages["x-default"] = absoluteUrl(defaultLocale, path);
  }
  return {
    canonical: localizePath(locale, path),
    languages,
  };
}

export function ogLocaleFor(locale: Locale) {
  return {
    locale: localeMeta[locale].ogLocale,
    alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
  };
}
