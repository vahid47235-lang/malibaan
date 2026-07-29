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
import { getAllCategories, getCategoryInfo, getPostsByCategory } from "@/lib/data/blog";
import { getServiceBySlug } from "@/lib/data/services";
import { formatDate, t } from "@/i18n/format";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates } from "@/i18n/seo";
import { isLocale, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return getAllCategories("fa").map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale = rawLocale;
  const dict = await getDictionary(locale);
  const category = getCategoryInfo(locale, slug);
  const posts = getPostsByCategory(locale, slug);
  if (posts.length === 0) return {};

  return {
    title: t(dict.blog.categoryMetaTitleTemplate, { category: category.label }),
    description: t(dict.blog.categoryMetaDescriptionTemplate, { category: category.label }),
    alternates: buildAlternates(locale, `/blog/category/${slug}`),
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const posts = getPostsByCategory(locale, slug);
  if (posts.length === 0) notFound();

  const dict = await getDictionary(locale);
  const { blog, common } = dict;
  const category = getCategoryInfo(locale, slug);
  const service = getServiceBySlug(locale, slug);

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <Breadcrumbs
          items={[
            { label: blog.breadcrumb, href: "/blog" },
            { label: category.label, href: `/blog/category/${slug}` },
          ]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={blog.categoryEyebrow}
          title={t(blog.categoryTitleTemplate, { category: category.label })}
          description={
            service
              ? t(blog.categoryDescriptionTemplate, { category: category.label, service: service.navLabel })
              : undefined
          }
        />

        <section className="py-14 sm:py-20">
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-brand-line bg-white p-4 transition-all hover:-translate-y-1 hover:border-brand-green-900/25 hover:shadow-lg hover:shadow-brand-ink-900/5"
                >
                  <ArticleCover tone={post.coverTone} label={category.label} />
                  <div className="flex flex-1 flex-col p-3 pt-5">
                    <span className="text-xs font-medium text-brand-ink-400" dir="ltr">
                      {formatDate(post.publishedAt, locale)}
                    </span>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-brand-ink-900">{post.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-brand-ink-600">{post.excerpt}</p>
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
