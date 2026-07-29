import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { getServiceBySlug } from "./services";
import { blogPosts as blogPostsFa } from "./blog.fa";
import { blogPosts as blogPostsEn } from "./blog.en";

export type { BlogPost, BlogSection } from "./blog.fa";
import type { BlogPost } from "./blog.fa";

const blogPostsByLocale: Record<Locale, BlogPost[]> = {
  fa: blogPostsFa,
  en: blogPostsEn,
};

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPostsByLocale[locale];
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | undefined {
  return blogPostsByLocale[locale].find((post) => post.slug === slug);
}

export function getPostsByCategory(locale: Locale, categorySlug: string): BlogPost[] {
  return blogPostsByLocale[locale].filter((post) => post.categorySlug === categorySlug);
}

export function getRelatedPosts(locale: Locale, post: BlogPost, limit = 3): BlogPost[] {
  return blogPostsByLocale[locale]
    .filter((p) => p.id !== post.id && p.categorySlug === post.categorySlug)
    .slice(0, limit);
}

export function getCategoryInfo(locale: Locale, categorySlug: string) {
  const service = getServiceBySlug(locale, categorySlug);
  return {
    slug: categorySlug,
    label: service?.navLabel ?? categorySlug,
  };
}

export function getAllCategories(locale: Locale) {
  const slugs = Array.from(new Set(blogPostsByLocale[locale].map((post) => post.categorySlug)));
  return slugs.map((slug) => ({
    ...getCategoryInfo(locale, slug),
    count: getPostsByCategory(locale, slug).length,
  }));
}

/** Locales this post (by cross-locale id) is actually published in - used to build accurate hreflang alternates. */
export function getAvailableLocalesForPost(id: string): Locale[] {
  return locales.filter((locale) => blogPostsByLocale[locale].some((post) => post.id === id));
}

/** The same logical post's slug in another locale, if it's been published there. */
export function getAlternateSlug(id: string, targetLocale: Locale): string | undefined {
  return blogPostsByLocale[targetLocale].find((post) => post.id === id)?.slug;
}
