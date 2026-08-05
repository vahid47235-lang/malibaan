import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { StatsBar } from "@/components/sections/stats-bar";
import { CtaBanner } from "@/components/sections/cta-banner";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("About");
  return {
    title: t("eyebrow"),
    description: t("description"),
    alternates: { canonical: "/about" },
    openGraph: {
      title: t("eyebrow"),
      description: t("description"),
      url: "https://malibaan.com/about",
    },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("About");

  const values = [
    { title: t("value1Title"), description: t("value1Description") },
    { title: t("value2Title"), description: t("value2Description") },
    { title: t("value3Title"), description: t("value3Description") },
    { title: t("value4Title"), description: t("value4Description") },
  ];

  const roles = [
    { title: t("role1Title"), description: t("role1Description") },
    { title: t("role2Title"), description: t("role2Description") },
    { title: t("role3Title"), description: t("role3Description") },
    { title: t("role4Title"), description: t("role4Description") },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/about" }]} />
        <PageHeader eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <section className="py-20 sm:py-28">
          <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow={t("storyEyebrow")} title={t("storyTitle")} />
              <div className="mt-6 flex flex-col gap-5 text-[15px] leading-8 text-brand-ink-600">
                <p>{t("storyPara1")}</p>
                <p>{t("storyPara2")}</p>
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
                  alt="Malibaan"
                  width={310}
                  height={397}
                  className="w-[55%] max-w-[220px] opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
                />
                <p className="text-center text-xl font-bold leading-tight text-white">{t("markCaption")}</p>
              </div>
            </div>
          </Container>
        </section>

        <StatsBar />

        <section className="py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow={t("valuesEyebrow")}
              title={t("valuesTitle")}
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
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
            <SectionHeading eyebrow={t("teamEyebrow")} title={t("teamTitle")} description={t("teamDescription")} />
            <div className="grid gap-5 sm:grid-cols-2">
              {roles.map((role) => (
                <div key={role.title} className="rounded-xl border border-brand-line bg-brand-cream-50 p-5">
                  <h3 className="text-[15px] font-bold text-brand-ink-900">{role.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-ink-600">{role.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <CtaBanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
