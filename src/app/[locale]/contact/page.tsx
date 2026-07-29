import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/ui/contact-form";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { getDictionary } from "@/i18n/get-dictionary";
import { buildAlternates, ogLocaleFor } from "@/i18n/seo";
import { isLocale, type Locale } from "@/i18n/config";

const channelHrefs = [
  { href: "tel:+989900035009", dir: "ltr" as const },
  { href: "https://wa.me/989900035009" },
  { href: "https://t.me/malibaan", dir: "ltr" as const },
  { href: "https://instagram.com/malibaan", dir: "ltr" as const },
  { href: "mailto:info@malibaan.com", dir: "ltr" as const },
  { href: undefined },
];

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
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
    alternates: buildAlternates(locale, "/contact"),
    openGraph: {
      ...ogLocaleFor(locale),
      title: dict.contact.meta.ogTitle,
      description: dict.contact.meta.ogDescription,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = await getDictionary(locale);
  const { contact, common } = dict;

  return (
    <>
      <Header locale={locale} dict={common} />
      <main className="flex-1">
        <Breadcrumbs
          items={[{ label: contact.breadcrumb, href: "/contact" }]}
          locale={locale}
          homeLabel={common.breadcrumbs.home}
          navAriaLabel={common.breadcrumbs.navAriaLabel}
        />
        <PageHeader
          eyebrow={contact.pageHeader.eyebrow}
          title={contact.pageHeader.title}
          description={contact.pageHeader.description}
        />

        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contact.channels.map((channel, index) => {
                  const meta = channelHrefs[index];
                  return (
                    <div key={channel.title} className="rounded-2xl border border-brand-line bg-white p-6">
                      <h3 className="text-sm font-semibold text-brand-green-700">{channel.title}</h3>
                      {meta?.href ? (
                        <a
                          href={meta.href}
                          target={meta.href.startsWith("http") ? "_blank" : undefined}
                          rel={meta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          dir={meta.dir}
                          className="mt-2 block text-lg font-bold text-brand-ink-900 hover:text-brand-green-900"
                        >
                          {channel.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-lg font-bold text-brand-ink-900">{channel.value}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-brand-line bg-brand-cream-100 p-6">
                <h3 className="text-sm font-semibold text-brand-green-700">{contact.addressTitle}</h3>
                <p className="mt-2 text-[15px] leading-7 text-brand-ink-700">{contact.addressValue}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=%D8%AA%D9%87%D8%B1%D8%A7%D9%86%20%D8%AE%DB%8C%D8%A7%D8%A8%D8%A7%D9%86%20%D9%88%D9%84%DB%8C%D8%B9%D8%B5%D8%B1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-900 hover:underline"
                >
                  {contact.mapCta}
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-line bg-white p-8 sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">{contact.formHeading}</h2>
              <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{contact.formDescription}</p>
              <ContactForm dict={common} className="mt-8" />
            </div>
          </Container>
        </section>
      </main>
      <Footer locale={locale} dict={common} />
      <WhatsAppButton dict={common} />
    </>
  );
}
