"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, localeMeta, stripLocaleFromPathname, localizePath, type Locale } from "@/i18n/config";
import { useLocale } from "./locale-context";

export function LanguageSwitcher({
  label,
  switchToLabel,
  variant = "desktop",
}: {
  label: string;
  switchToLabel: string;
  variant?: "desktop" | "mobile";
}) {
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const activeIndexRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const { path: agnosticPath } = stripLocaleFromPathname(pathname);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      activeIndexRef.current = locales.indexOf(locale);
      itemRefs.current[activeIndexRef.current]?.focus();
    }
  }, [open, locale]);

  function selectLocale(target: Locale) {
    setOpen(false);
    buttonRef.current?.focus();
    if (target === locale) return;
    router.push(localizePath(target, agnosticPath));
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function handleMenuKeyDown(event: React.KeyboardEvent) {
    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const next = (activeIndexRef.current + 1) % locales.length;
        activeIndexRef.current = next;
        itemRefs.current[next]?.focus();
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const next = (activeIndexRef.current - 1 + locales.length) % locales.length;
        activeIndexRef.current = next;
        itemRefs.current[next]?.focus();
        break;
      }
      case "Home":
        event.preventDefault();
        activeIndexRef.current = 0;
        itemRefs.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        activeIndexRef.current = locales.length - 1;
        itemRefs.current[locales.length - 1]?.focus();
        break;
      case "Escape":
        event.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div className={cn("relative", variant === "mobile" && "w-full")}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-brand-line px-3.5 py-1.5 text-sm font-medium text-brand-ink-600 transition-colors hover:border-brand-green-900/30 hover:text-brand-green-900",
          variant === "mobile" && "w-full justify-center"
        )}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 14.5A6.5 6.5 0 1 0 8 1.5a6.5 6.5 0 0 0 0 13ZM1.6 8h12.8M8 1.5c1.6 1.8 2.5 4.1 2.5 6.5s-.9 4.7-2.5 6.5c-1.6-1.8-2.5-4.1-2.5-6.5S6.4 3.3 8 1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {localeMeta[locale].nativeLabel}
        <svg
          width="11"
          height="11"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn("transition-transform", open && "rotate-180")}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={label}
          onKeyDown={handleMenuKeyDown}
          className={cn(
            "absolute top-full z-50 mt-2 min-w-[9rem] overflow-hidden rounded-xl border border-brand-line bg-white py-1.5 shadow-lg shadow-brand-ink-900/10",
            variant === "mobile" ? "start-0 w-full" : "end-0"
          )}
        >
          {locales.map((code, index) => (
            <button
              key={code}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={code === locale}
              tabIndex={-1}
              onClick={() => selectLocale(code)}
              className={cn(
                "flex w-full items-center justify-between gap-3 px-4 py-2 text-start text-[15px] transition-colors",
                code === locale
                  ? "font-semibold text-brand-green-900"
                  : "text-brand-ink-700 hover:bg-brand-cream-100"
              )}
            >
              <span>
                <span className="sr-only">{switchToLabel} </span>
                {localeMeta[code].nativeLabel}
              </span>
              {code === locale && (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8.5L6.2 11.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
