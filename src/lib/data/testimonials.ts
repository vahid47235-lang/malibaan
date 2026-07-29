import type { Locale } from "@/i18n/config";
import { testimonials as testimonialsFa } from "./testimonials.fa";
import { testimonials as testimonialsEn } from "./testimonials.en";

export type { Testimonial } from "./testimonials.fa";
import type { Testimonial } from "./testimonials.fa";

const testimonialsByLocale: Record<Locale, Testimonial[]> = {
  fa: testimonialsFa,
  en: testimonialsEn,
};

export function getTestimonialsForService(locale: Locale, slug: string): Testimonial[] {
  return testimonialsByLocale[locale].filter((t) => t.serviceSlugs.includes(slug));
}

export function getFeaturedTestimonials(locale: Locale): Testimonial[] {
  return testimonialsByLocale[locale].filter((t) => t.serviceSlugs.length === 0);
}
