import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { ArticleCover } from "@/components/ui/article-cover";
import { getAllCategories, getCategoryInfo, getPostsByCategory } from "@/lib/blog-data";
import { getServiceBySlug } from "@/lib/services-data";
import { formatJalaliDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("Blog");
  const category = getCategoryInfo(slug, locale);
  const posts = getPostsByCategory(slug, locale);
  if (posts.length === 0) return {};

  return {
    title: t("categoryTitle", { category: category.label }),
    description: t("categoryMetaDescription", { category: category.label }),
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("Blog");
  const posts = getPostsByCategory(slug, locale);
  if (posts.length === 0) notFound();

  const category = getCategoryInfo(slug, locale);
  const service = getServiceBySlug(slug, locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs
          items={[
            { label: t("breadcrumb"), href: "/blog" },
            { label: category.label, href: `/blog/category/${slug}` },
          ]}
        />
        <PageHeader
          eyebrow={t("categoryEyebrow")}
          title={t("categoryTitle", { category: category.label })}
          description={
            service
              ? t("categoryDescriptionWithService", { category: category.label, service: service.navLabel })
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
                      {formatJalaliDate(post.publishedAt, locale)}
                    </span>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-brand-ink-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-brand-ink-600">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
