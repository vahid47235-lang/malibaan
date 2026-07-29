import type { Locale } from "@/i18n/config";
import { services as servicesFa } from "./services.fa";
import { services as servicesEn } from "./services.en";

export type {
  Service,
  ServiceBenefit,
  ServiceProcessStep,
  ServiceFaq,
} from "./services.fa";
import type { Service } from "./services.fa";

const servicesByLocale: Record<Locale, Service[]> = {
  fa: servicesFa,
  en: servicesEn,
};

export function getServices(locale: Locale): Service[] {
  return servicesByLocale[locale];
}

export function getServiceBySlug(locale: Locale, slug: string): Service | undefined {
  return servicesByLocale[locale].find((service) => service.slug === slug);
}

export function getRelatedServices(locale: Locale, service: Service): Service[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(locale, slug))
    .filter((item): item is Service => Boolean(item));
}
