import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/ui/contact-form";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { JsonLd, faqSchema } from "@/lib/schema";
import { toPersianDigits } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Consultation");
  return {
    title: t("breadcrumb"),
    description: t("description"),
    alternates: { canonical: "/consultation" },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://malibaan.com/consultation",
    },
  };
}

export default async function ConsultationPage() {
  const t = await getTranslations("Consultation");
  const tContact = await getTranslations("Contact");
  const locale = await getLocale();
  const isFa = locale === "fa";

  const expectations = [
    { title: t("expectation1Title"), description: t("expectation1Description") },
    { title: t("expectation2Title"), description: t("expectation2Description") },
    { title: t("expectation3Title"), description: t("expectation3Description") },
  ];

  const stepNumbers = isFa ? ["۰۱", "۰۲", "۰۳"] : ["01", "02", "03"];
  const steps = [
    { number: stepNumbers[0], title: t("step1Title"), description: t("step1Description") },
    { number: stepNumbers[1], title: t("step2Title"), description: t("step2Description") },
    { number: stepNumbers[2], title: t("step3Title"), description: t("step3Description") },
  ];

  const faq = [
    { question: t("faq1Question"), answer: t("faq1Answer") },
    { question: t("faq2Question"), answer: t("faq2Answer") },
    { question: t("faq3Question"), answer: t("faq3Answer") },
    { question: t("faq4Question"), answer: t("faq4Answer") },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd data={faqSchema(faq)} />

        <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/consultation" }]} />
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <section className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={t("expectationsEyebrow")}
              title={t("expectationsTitle")}
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {expectations.map((item) => (
                <div key={item.title} className="rounded-2xl border border-brand-line bg-white p-6">
                  <h3 className="text-lg font-bold text-brand-ink-900">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-ink-600">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <Container>
            <SectionHeading eyebrow={t("stepsEyebrow")} title={t("stepsTitle")} align="center" className="mx-auto" />
            <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
              <div className="absolute top-6 hidden h-px w-full bg-brand-line sm:block" />
              {steps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-brand-green-900/20 bg-brand-cream-50 text-lg font-bold text-brand-green-900">
                    {step.number}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-brand-ink-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-brand-ink-900 sm:text-3xl">{t("directTitle")}</h2>
              <p className="mt-4 text-[15px] leading-7 text-brand-ink-600">{t("directDescription")}</p>
              <div className="mt-6 flex flex-col gap-4">
                <a
                  href="tel:+989900035009"
                  dir="ltr"
                  className="rounded-2xl border border-brand-line bg-white p-5 text-lg font-bold text-brand-ink-900 hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  {isFa ? toPersianDigits("0990-003-5009") : "0990-003-5009"}
                </a>
                <a
                  href="https://wa.me/989900035009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-brand-line bg-white p-5 text-lg font-bold text-brand-ink-900 hover:border-brand-green-900/30 hover:text-brand-green-900"
                >
                  {tContact("whatsappValue")}
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-line bg-white p-8 sm:p-10">
              <h2 className="text-xl font-bold text-brand-ink-900">{t("formHeading")}</h2>
              <p className="mt-2 text-[15px] leading-7 text-brand-ink-600">{t("formDescription")}</p>
              <ContactForm serviceLabel={t("formServiceLabel")} source="consultation_form" className="mt-8" />
            </div>
          </Container>
        </section>

        <section className="bg-white py-20 sm:py-28">
          <Container>
            <SectionHeading eyebrow={t("faqEyebrow")} title={t("faqTitle")} align="center" className="mx-auto" />
            <div className="mx-auto mt-12 max-w-3xl">
              <FaqAccordion items={faq} />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
