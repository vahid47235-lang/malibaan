import { cn } from "@/lib/utils";

/** A "continue" arrow that points toward reading-end in both RTL and LTR, and nudges further on hover. */
export function ArrowIcon({ className, groupHover = false }: { className?: string; groupHover?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "rtl:rotate-180 transition-transform",
        groupHover && "rtl:group-hover:translate-x-1 ltr:group-hover:-translate-x-1",
        className
      )}
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
