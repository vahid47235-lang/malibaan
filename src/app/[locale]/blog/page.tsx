import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { ArticleCover } from "@/components/ui/article-cover";
import { getAllPosts, getAllCategories } from "@/lib/blog-data";
import { formatJalaliDate, toPersianDigits } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Blog");
  return {
    title: t("indexTitle"),
    description: t("indexDescription"),
    alternates: { canonical: "/blog" },
    openGraph: {
      title: t("indexTitle"),
      description: t("indexOgDescription"),
      url: "https://malibaan.com/blog",
    },
  };
}

export default async function BlogIndexPage() {
  const t = await getTranslations("Blog");
  const locale = await getLocale();
  const isFa = locale === "fa";

  const categories = getAllCategories(locale);
  const categoryLabels = Object.fromEntries(categories.map((c) => [c.slug, c.label]));
  const sortedPosts = [...getAllPosts(locale)].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/blog" }]} />
        <PageHeader eyebrow={t("indexTitle")} title={t("pageTitle")} description={t("pageDescription")} />

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
                  <span className="ms-1.5 text-brand-ink-400">
                    ({isFa ? toPersianDigits(category.count) : category.count})
                  </span>
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
                      {formatJalaliDate(post.publishedAt, locale)}
                    </span>
                    <h2 className="mt-2 text-lg font-bold leading-snug text-brand-ink-900">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-brand-ink-600">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-900">
                      {t("continueReading")}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={isFa ? "rotate-180 transition-transform group-hover:-translate-x-1" : "transition-transform group-hover:translate-x-1"}
                      >
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
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
