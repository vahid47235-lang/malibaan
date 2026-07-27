import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  tone = "dark",
  showWordmark = true,
}: {
  className?: string;
  tone?: "dark" | "light";
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/brand/malibaan-mark.png"
        alt="نماد مالی‌بان"
        width={28}
        height={36}
        className="shrink-0"
        priority
      />
      {showWordmark && (
        <span
          className={cn(
            "flex flex-col leading-none",
            tone === "dark" ? "text-brand-green-900" : "text-white"
          )}
        >
          <span className="text-xl font-bold tracking-tight">مالی‌بان</span>
          <span
            className={cn(
              "text-[11px] font-medium tracking-tight",
              tone === "dark" ? "text-brand-ink-600" : "text-white/70"
            )}
          >
            حسابداری هوشمند برای رشد
          </span>
        </span>
      )}
    </div>
  );
}
