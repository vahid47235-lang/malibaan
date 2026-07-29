import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/components/i18n/link";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { ArticleCover } from "@/components/ui/article-cover";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { getBlogPosts, getAllCategories } from "@/lib/data/blog";
import { formatDate, formatNumber } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates, ogLocaleFor } from "@/i18n/seo";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale;
  const dict = await getDictionary(locale);

  return {
    title: dict.blog.meta.title,
    description: dict.blog.meta.description,
    alternates: buildAlternates(locale, "/blog"),
    openGraph: {
      ...ogLocaleFor(locale),
      title: dict.blog.meta.ogTitle,
      description: dict.blog.meta.ogDescription,
    },
  };
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const { blog, common } = dict;

  const categories = getAllCategories(locale);
  const categoryLabels = Object.fromEntries(categories.map((c) => [c.slug, c.label]));
  const sortedPosts = [...getBlogPosts(locale)].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <Breadcrumbs
          items={[{ label: blog.breadcrumb, href: "/blog" }]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={blog.pageHeader.eyebrow}
          title={blog.pageHeader.title}
          description={blog.pageHeader.description}
        />

        <section className="py-14 sm:py-16">
          <Container>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  className="rounded-full border border-brand-line bg-white px-5 py-2 text-sm font-medium text-brand-ink-700 transition-colors hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  {category.label}
                  <span className="ms-1.5 text-brand-ink-400">({formatNumber(category.count, locale)})</span>
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <section className="pb-20 sm:pb-28">
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-brand-line bg-white p-4 transition-all hover:-translate-y-1 hover:border-brand-green-900/25 hover:shadow-lg hover:shadow-brand-ink-900/5"
                >
                  <ArticleCover tone={post.coverTone} label={categoryLabels[post.categorySlug] ?? ""} />
                  <div className="flex flex-1 flex-col p-3 pt-5">
                    <span className="text-xs font-medium text-brand-ink-400" dir="ltr">
                      {formatDate(post.publishedAt, locale)}
                    </span>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-brand-ink-900">{post.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-brand-ink-600">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-900">
                      {common.buttons.readMore}
                      <ArrowIcon groupHover />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
