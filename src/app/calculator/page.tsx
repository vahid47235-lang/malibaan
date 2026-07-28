import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Container } from "@/components/ui/container";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { db } from "@/db";
import { categories, services } from "@/db/schema";
import { CalculatorClient } from "./calculator-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ماشین‌حساب هزینه خدمات",
  description:
    "خدمات مورد نیاز کسب‌وکار خود را انتخاب کنید و پیش‌فاکتور آنی، به‌همراه تخفیف‌های باندلی و کد معرف، دریافت کنید.",
  alternates: { canonical: "/calculator" },
};

export default async function CalculatorPage() {
  const [allCategories, allServices] = await Promise.all([
    db.select().from(categories).orderBy(asc(categories.sortOrder)),
    db.select().from(services).where(eq(services.isActive, true)).orderBy(asc(services.sortOrder)),
  ]);

  const categoryOptions = allCategories
    .map((category) => ({
      id: category.id,
      label: category.label,
      services: allServices
        .filter((service) => service.categoryId === category.id)
        .map((service) => ({ id: service.id, name: service.name, priceToman: service.priceToman })),
    }))
    .filter((category) => category.services.length > 0);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: "ماشین‌حساب هزینه", href: "/calculator" }]} />
        <PageHeader
          eyebrow="ماشین‌حساب هزینه خدمات"
          title="هزینه دقیق خدماتی که نیاز دارید را همین‌جا محاسبه کنید"
          description="خدمات مورد نظرتان را انتخاب کنید؛ پیش‌فاکتور به همراه تخفیف‌های باندلی و کد معرف به‌صورت آنی محاسبه می‌شود."
        />

        <section className="py-14 sm:py-20">
          <Container>
            {categoryOptions.length > 0 ? (
              <CalculatorClient categories={categoryOptions} />
            ) : (
              <p className="text-center text-brand-ink-400">هنوز خدمتی برای محاسبه ثبت نشده است.</p>
            )}
          </Container>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
