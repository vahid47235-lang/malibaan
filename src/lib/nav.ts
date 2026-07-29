import type { CommonDictionary } from "@/i18n/dictionary-types";
import type { Service } from "@/lib/data/services";

export type NavItem = { label: string; href: string };

export function getMainNav(dict: CommonDictionary): NavItem[] {
  return [
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.calculator, href: "/calculator" },
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.clients, href: "/clients" },
    { label: dict.nav.blog, href: "/blog" },
    { label: dict.nav.contact, href: "/contact" },
  ];
}

export function getServiceLinks(services: Service[]): NavItem[] {
  return services.map((service) => ({ label: service.navLabel, href: `/services/${service.slug}` }));
}
