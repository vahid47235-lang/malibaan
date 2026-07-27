"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line/70 bg-brand-cream-50/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="/" aria-label="مالی‌بان، صفحه اصلی">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="منوی اصلی">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-brand-ink-600 transition-colors hover:text-brand-green-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+982100000000"
            className="text-sm font-medium text-brand-ink-600 hover:text-brand-green-900"
            dir="ltr"
          >
            ۰۲۱-۰۰۰۰-۰۰۰۰
          </a>
          <Button href="/consultation" size="sm">
            درخواست مشاوره رایگان
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-brand-line lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="باز کردن منو"
          aria-expanded={open}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {open ? (
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M1 4H17M1 9H17M1 14H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </Container>

      {open && (
        <div className="border-t border-brand-line bg-brand-cream-50 lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-brand-ink-900 hover:bg-brand-cream-100"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 px-3">
              <Button href="/consultation" size="sm" className="w-full">
                درخواست مشاوره رایگان
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
