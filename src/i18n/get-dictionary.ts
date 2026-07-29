import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionary-types";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  fa: () => import("@/locales/fa").then((m) => m.default),
  en: () => import("@/locales/en").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
