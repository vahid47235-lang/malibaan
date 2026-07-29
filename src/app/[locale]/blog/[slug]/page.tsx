import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/components/i18n/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArticleCover } from "@/components/ui/article-cover";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { JsonLd, articleSchema } from "@/lib/schema";
import {
  getBlogPosts,
  getPostBySlug,
  getRelatedPosts,
  getCategoryInfo,
  getAvailableLocalesForPost,
  getAlternateSlug,
} from "@/lib/data/blog";
import { getServiceBySlug } from "@/lib/data/services";
import { formatDate, formatNumber, t } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { absoluteUrl, ogLocaleFor } from "@/i18n/seo";
import { isLocale, defaultLocale, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  // Slugs are localized per language, so build params from the union of every
  // locale's posts - the page itself 404s any combination that doesn't exist.
  const slugs = new Set([...getBlogPosts("fa"), ...getBlogPosts("en")].map((post) => post.slug));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale;
  const post = getPostBySlug(locale, slug);
  if (!post) return {};

  const availableLocales = getAvailableLocalesForPost(post.id);
  const languages: Record<string, string> = {};
  for (const l of availableLocales) {
    const slugForLocale = l === locale ? post.slug : getAlternateSlug(post.id, l);
    if (slugForLocale) languages[l] = absoluteUrl(l, `/blog/${slugForLocale}`);
  }
  if (availableLocales.includes(defaultLocale)) {
    languages["x-default"] = languages[defaultLocale];
  }

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages,
    },
    openGraph: {
      ...ogLocaleFor(locale),
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const post = getPostBySlug(locale, slug);
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const { blog, common, home } = dict;
  const category = getCategoryInfo(locale, post.categorySlug);
  const relatedService = getServiceBySlug(locale, post.categorySlug);
  const relatedPosts = getRelatedPosts(locale, post);

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <JsonLd
          data={articleSchema({
            title: post.title,
            description: post.metaDescription,
            slug: post.slug,
            publishedAt: post.publishedAt,
            locale,
          })}
        />

        <Breadcrumbs
          items={[
            { label: blog.breadcrumb, href: "/blog" },
            { label: category.label, href: `/blog/category/${category.slug}` },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />

        <article className="py-14 sm:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Link
                href={`/blog/category/${category.slug}`}
                className="text-sm font-semibold text-brand-green-700 hover:underline"
              >
                {category.label}
              </Link>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-ink-900 sm:text-4xl">{post.title}</h1>
              <div className="mt-4 flex items-center gap-3 text-sm text-brand-ink-400">
                <span dir="ltr">{formatDate(post.publishedAt, locale)}</span>
                <span>·</span>
                <span>
                  {formatNumber(post.readingMinutes, locale)} {blog.readingMinutesSuffix}
                </span>
                <span>·</span>
                <span>{blog.authorLabel}</span>
              </div>

              <ArticleCover tone={post.coverTone} label={category.label} className="mt-8" />

              <div className="prose-content mt-10 flex flex-col gap-8">
                {post.sections.map((section, index) => (
                  <div key={index}>
                    {section.heading && (
                      <h2 className="mb-3 text-xl font-bold text-brand-ink-900 sm:text-2xl">{section.heading}</h2>
                    )}
                    {section.paragraphs?.map((paragraph, pIndex) => (
                      <p key={pIndex} className="mt-3 text-[16px] leading-8 text-brand-ink-700 first:mt-0">
                        {paragraph}
                      </p>
                    ))}
                    {section.list && (
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {section.list.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-[16px] leading-7 text-brand-ink-700">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="mt-1.5 shrink-0 text-brand-green-700"
                            >
                              <path
                                d="M3 8.5L6.2 11.5L13 4.5"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {relatedService && (
                <div className="mt-12 rounded-2xl border border-brand-line bg-brand-cream-100 p-6">
                  <p className="text-sm text-brand-ink-600">
                    {t(blog.relatedServicePromptTemplate, { service: relatedService.navLabel })}
                  </p>
                  <Link
                    href={`/services/${relatedService.slug}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-base font-bold text-brand-green-900 hover:underline"
                  >
                    {t(blog.viewServiceCtaTemplate, { service: relatedService.navLabel })}
                    <ArrowIcon />
                  </Link>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-lg font-bold text-brand-ink-900">{blog.relatedArticlesHeading}</h2>
                  <div className="mt-5 flex flex-col gap-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="rounded-xl border border-brand-line bg-white p-4 text-sm font-semibold text-brand-ink-900 hover:border-brand-green-900/30 hover:text-brand-green-900"
                      >
                        {related.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </article>

        <CtaBanner dict={home.ctaBanner} />
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
