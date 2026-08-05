import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArticleCover } from "@/components/ui/article-cover";
import { JsonLd, articleSchema } from "@/lib/schema";
import { rawBlogPosts, getPostBySlug, getRelatedPosts, getCategoryInfo } from "@/lib/blog-data";
import { getServiceBySlug } from "@/lib/services-data";
import { formatJalaliDate, toPersianDigits } from "@/lib/utils";

export function generateStaticParams() {
  return rawBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPostBySlug(slug, locale);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://malibaan.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const isFa = locale === "fa";
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const t = await getTranslations("Blog");
  const category = getCategoryInfo(post.categorySlug, locale);
  const relatedService = getServiceBySlug(post.categorySlug, locale);
  const relatedPosts = getRelatedPosts(post, locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd
          data={articleSchema({
            title: post.title,
            description: post.metaDescription,
            slug: post.slug,
            publishedAt: post.publishedAt,
          })}
        />

        <Breadcrumbs
          items={[
            { label: t("breadcrumb"), href: "/blog" },
            { label: category.label, href: `/blog/category/${category.slug}` },
            { label: post.title, href: `/blog/${post.slug}` },
          ]}
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
              <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-ink-900 sm:text-4xl">
                {post.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-sm text-brand-ink-400">
                <span dir="ltr">{formatJalaliDate(post.publishedAt, locale)}</span>
                <span>·</span>
                <span>{t("minutesRead", { minutes: isFa ? toPersianDigits(post.readingMinutes) : post.readingMinutes })}</span>
                <span>·</span>
                <span>{t("byTeam")}</span>
              </div>

              <ArticleCover tone={post.coverTone} label={category.label} className="mt-8" />

              <div className="prose-content mt-10 flex flex-col gap-8">
                {post.sections.map((section, index) => (
                  <div key={index}>
                    {section.heading && (
                      <h2 className="mb-3 text-xl font-bold text-brand-ink-900 sm:text-2xl">
                        {section.heading}
                      </h2>
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
                    {t("checkServiceLabel", { service: relatedService.navLabel })}
                  </p>
                  <Link
                    href={`/services/${relatedService.slug}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-base font-bold text-brand-green-900 hover:underline"
                  >
                    {t("viewService", { service: relatedService.navLabel })}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={isFa ? "rotate-180" : ""}
                    >
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-lg font-bold text-brand-ink-900">{t("relatedArticles")}</h2>
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

        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
