import type { MetadataRoute } from "next";
import { getServices } from "@/lib/data/services";
import { getBlogPosts, getAllCategories, getAvailableLocalesForPost, getAlternateSlug } from "@/lib/data/blog";
import { locales, defaultLocale, localizePath, SITE_URL, type Locale } from "@/i18n/config";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

const staticPaths: { path: string; changeFrequency: ChangeFrequency; priority: number }[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/clients", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/consultation", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/calculator", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

function alternatesFor(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${SITE_URL}${localizePath(l, path)}`;
  languages["x-default"] = `${SITE_URL}${localizePath(defaultLocale, path)}`;
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Every locale-agnostic path (same URL shape across languages, just prefixed differently).
  const sharedPathEntries: MetadataRoute.Sitemap = staticPaths.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: `${SITE_URL}${localizePath(locale, path)}`,
      changeFrequency,
      priority,
      alternates: { languages: alternatesFor(path) },
    }))
  );

  const serviceRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getServices(locale).map((service) => ({
      url: `${SITE_URL}${localizePath(locale, `/services/${service.slug}`)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: alternatesFor(`/services/${service.slug}`) },
    }))
  );

  const blogCategoryRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllCategories(locale).map((category) => ({
      url: `${SITE_URL}${localizePath(locale, `/blog/category/${category.slug}`)}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      alternates: { languages: alternatesFor(`/blog/category/${category.slug}`) },
    }))
  );

  // Blog posts have per-locale slugs, so alternates are built per post id rather than a shared path.
  const blogPostRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getBlogPosts(locale).map((post) => {
      const availableLocales = getAvailableLocalesForPost(post.id);
      const languages: Record<string, string> = {};
      for (const l of availableLocales) {
        const slugForLocale = l === locale ? post.slug : getAlternateSlug(post.id, l);
        if (slugForLocale) languages[l] = `${SITE_URL}${localizePath(l as Locale, `/blog/${slugForLocale}`)}`;
      }
      if (availableLocales.includes(defaultLocale)) languages["x-default"] = languages[defaultLocale];

      return {
        url: `${SITE_URL}${localizePath(locale, `/blog/${post.slug}`)}`,
        lastModified: post.publishedAt,
        changeFrequency: "yearly" as const,
        priority: 0.6,
        alternates: { languages },
      };
    })
  );

  return [...sharedPathEntries, ...serviceRoutes, ...blogCategoryRoutes, ...blogPostRoutes];
}
