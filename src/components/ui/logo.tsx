import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

const wordmarkByLocale: Record<Locale, string> = { fa: "مالی‌بان", en: "Malibaan" };
const taglineByLocale: Record<Locale, string> = {
  fa: "حسابداری هوشمند برای رشد",
  en: "Smart accounting for growth",
};
const altByLocale: Record<Locale, string> = { fa: "نماد مالی‌بان", en: "The Malibaan mark" };

export function Logo({
  locale = "fa",
  className,
  tone = "dark",
  showWordmark = true,
}: {
  locale?: Locale;
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/brand/malibaan-mark.png"
        alt={altByLocale[locale]}
        width={28}
        height={36}
        className="shrink-0"
        priority
      />
      {showWordmark && (
        <span
          className={cn(
            "flex flex-col leading-none",
            tone === "dark" ? "text-brand-green-900" : "text-white",
            locale === "en" && "font-en"
          )}
        >
          <span className="text-xl font-bold tracking-tight">{wordmarkByLocale[locale]}</span>
          <span
            className={cn(
              "text-[11px] font-medium tracking-tight",
              tone === "dark" ? "text-brand-ink-600" : "text-white/70"
            )}
          >
            {taglineByLocale[locale]}
          </span>
        </span>
      )}
    </div>
  );
}
