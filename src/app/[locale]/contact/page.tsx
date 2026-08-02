import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/ui/contact-form";
import { toPersianDigits } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Contact");
  return {
    title: t("title"),
    description: t("headerDescription"),
    alternates: { canonical: "/contact" },
    openGraph: {
      title: t("title"),
      description: t("headerDescription"),
      url: "https://malibaan.com/contact",
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const locale = await getLocale();
  const isFa = locale === "fa";
  const phone = isFa ? toPersianDigits("0990-003-5009") : "0990-003-5009";

  const contactChannels = [
    { title: t("phoneLabel"), value: phone, href: "tel:+989900035009", dir: "ltr" as const },
    { title: t("whatsappLabel"), value: t("whatsappValue"), href: "https://wa.me/989900035009" },
    { title: t("telegramLabel"), value: "@malibaan", href: "https://t.me/malibaan", dir: "ltr" as const },
    { title: t("instagramLabel"), value: "@malibaan", href: "https://instagram.com/malibaan", dir: "ltr" as const },
    { title: t("emailLabel"), value: "info@malibaan.com", href: "mailto:info@malibaan.com", dir: "ltr" as const },
    { title: t("hoursLabel"), value: t("hoursValue") },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/contact" }]} />
        <PageHeader eyebrow={t("title")} title={t("headerTitle")} description={t("headerDescription")} />

        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactChannels.map((channel) => (
                  <div key={channel.title} className="rounded-2xl border border-brand-line bg-white p-6">
                    <h3 className="text-sm font-semibold text-brand-green-700">{channel.title}</h3>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        dir={channel.dir}
                        className="mt-2 block text-lg font-bold text-brand-ink-900 hover:text-brand-green-900"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-lg font-bold text-brand-ink-900">{channel.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-brand-line bg-brand-cream-100 p-6">
                <h3 className="text-sm font-semibold text-brand-green-700">{t("addressHeading")}</h3>
                <p className="mt-2 text-[15px] leading-7 text-brand-ink-700">{t("addressText")}</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=%D8%AA%D9%87%D8%B1%D8%A7%D9%86%20%D8%AE%DB%8C%D8%A7%D8%A8%D8%A7%D9%86%20%D9%88%D9%84%DB%8C%D8%B9%D8%B5%D8%B1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-semibold text-brand-green-900 hover:underline"
                >
                  {t("mapLink")}
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-line bg-white p-8 sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">{t("formHeading")}</h2>
              <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{t("formDescription")}</p>
              <ContactForm className="mt-8" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
