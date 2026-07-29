import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StatsBar } from "@/components/sections/stats-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
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
    title: dict.about.meta.title,
    description: dict.about.meta.description,
    alternates: buildAlternates(locale, "/about"),
    openGraph: {
      ...ogLocaleFor(locale),
      title: dict.about.meta.ogTitle,
      description: dict.about.meta.ogDescription,
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const { about, common, home } = dict;

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <Breadcrumbs
          items={[{ label: about.breadcrumb, href: "/about" }]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={about.pageHeader.eyebrow}
          title={about.pageHeader.title}
          description={about.pageHeader.description}
        />

        <section className="py-20 sm:py-28">
          <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow={about.story.eyebrow} title={about.story.title} />
              <div className="mt-6 flex flex-col gap-5 text-[15px] leading-8 text-brand-ink-600">
                {about.story.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand-green-900 to-brand-green-950 shadow-2xl shadow-brand-green-900/25">
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(-35deg, white 0px, white 3px, transparent 3px, transparent 26px)",
                }}
              />
              <div className="relative flex h-full flex-col items-center justify-center gap-6 p-8">
                <Image
                  src="/brand/png/white/malibaan-symbol-white-512.png"
                  alt={about.story.imageAlt}
                  width={310}
                  height={397}
                  className="w-[55%] max-w-[220px] opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                />
                <p className="text-center text-xl font-bold leading-tight text-white">{about.story.imageQuote}</p>
              </div>
            </div>
          </Container>
        </section>

        <StatsBar stats={home.stats} />

        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={about.values.eyebrow}
              title={about.values.title}
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {about.values.items.map((value) => (
                <div key={value.title} className="rounded-2xl border border-brand-line bg-white p-7">
                  <h3 className="text-lg font-bold text-brand-ink-900">{value.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-ink-600">{value.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow={about.team.eyebrow}
              title={about.team.title}
              description={about.team.description}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {about.team.roles.map((role) => (
                <div key={role.title} className="rounded-xl border border-brand-line bg-brand-cream-50 p-5">
                  <h3 className="text-[15px] font-bold text-brand-ink-900">{role.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-ink-600">{role.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <CtaBanner dict={home.ctaBanner} />
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
