import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "mint";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-brand-green-900 text-white hover:bg-brand-green-800 shadow-sm shadow-brand-green-900/20",
  secondary:
    "bg-white text-brand-green-900 border border-brand-line hover:border-brand-green-900/40 hover:bg-brand-cream-100",
  ghost: "text-brand-green-900 hover:bg-brand-green-900/5",
  mint: "bg-brand-mint-400 text-brand-green-950 hover:bg-brand-mint-500",
};

const sizes = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-[15px] px-5 py-2.5 gap-2",
  lg: "text-base px-7 py-3.5 gap-2",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 whitespace-nowrap",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
