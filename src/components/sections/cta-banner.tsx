import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export async function CtaBanner() {
  const t = await getTranslations("CtaBanner");

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-green-900 px-8 py-14 text-center sm:px-16 sm:py-20">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-35deg, white 0px, white 3px, transparent 3px, transparent 26px)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-white/70">{t("description")}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/consultation" variant="mint" size="lg">
                {t("ctaPrimary")}
              </Button>
              <Button href="/contact" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
