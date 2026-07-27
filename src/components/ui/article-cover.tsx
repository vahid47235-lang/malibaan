import Image from "next/image";
import { cn } from "@/lib/utils";

export type CoverTone = "deep" | "primary" | "medium" | "sage" | "blue";

const toneStyles: Record<CoverTone, { bg: string; text: string; symbol: "white" | "brand" }> = {
  deep: { bg: "bg-brand-green-950", text: "text-white", symbol: "white" },
  primary: { bg: "bg-brand-green-900", text: "text-white", symbol: "white" },
  medium: { bg: "bg-brand-green-600", text: "text-white", symbol: "white" },
  sage: { bg: "bg-brand-sage-tint", text: "text-brand-green-900", symbol: "brand" },
  blue: { bg: "bg-brand-blue-tint", text: "text-brand-green-900", symbol: "brand" },
};

export function ArticleCover({
  tone,
  label,
  className,
}: {
  tone: CoverTone;
  label: string;
  className?: string;
}) {
  const style = toneStyles[tone];

  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] w-full items-end overflow-hidden rounded-2xl",
        style.bg,
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(-35deg, currentColor 0px, currentColor 3px, transparent 3px, transparent 26px)`,
          color: style.symbol === "white" ? "#ffffff" : "#0d4214",
        }}
      />
      <Image
        src={`/brand/svg/${style.symbol}/malibaan-symbol-${style.symbol}.svg`}
        alt=""
        aria-hidden="true"
        width={160}
        height={160}
        className="absolute -end-4 -top-6 w-24 opacity-20 sm:w-28"
      />
      <span className={cn("relative z-10 p-5 text-sm font-bold sm:p-6 sm:text-base", style.text)}>
        {label}
      </span>
    </div>
  );
}
