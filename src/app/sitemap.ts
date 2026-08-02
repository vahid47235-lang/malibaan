import type { MetadataRoute } from "next";
import { rawServices } from "@/lib/services-data";
import { rawBlogPosts, getAllCategories } from "@/lib/blog-data";

const SITE_URL = "https://malibaan.com";

function localizedPath(path: string, locale: "fa" | "en") {
  return locale === "en" ? `/en${path}` : path || "/";
}

function entriesFor(
  path: string,
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
    lastModified?: string;
  }
): MetadataRoute.Sitemap {
  const languages = {
    fa: `${SITE_URL}${localizedPath(path, "fa")}`,
    en: `${SITE_URL}${localizedPath(path, "en")}`,
  };

  return (["fa", "en"] as const).map((locale) => ({
    url: languages[locale],
    ...options,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "yearly", priority: 0.6 },
    { path: "/clients", changeFrequency: "monthly", priority: 0.6 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/consultation", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  ];

  const staticRoutes = staticPaths.flatMap((route) =>
    entriesFor(route.path, { changeFrequency: route.changeFrequency, priority: route.priority })
  );

  const serviceRoutes = rawServices.flatMap((service) =>
    entriesFor(`/services/${service.slug}`, { changeFrequency: "monthly", priority: 0.8 })
  );

  const blogCategoryRoutes = getAllCategories().flatMap((category) =>
    entriesFor(`/blog/category/${category.slug}`, { changeFrequency: "weekly", priority: 0.6 })
  );

  const blogPostRoutes = rawBlogPosts.flatMap((post) =>
    entriesFor(`/blog/${post.slug}`, {
      changeFrequency: "yearly",
      priority: 0.6,
      lastModified: post.publishedAt,
    })
  );

  return [...staticRoutes, ...serviceRoutes, ...blogCategoryRoutes, ...blogPostRoutes];
}
