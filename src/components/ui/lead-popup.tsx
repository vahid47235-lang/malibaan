"use client";

import { useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import type { CommonDictionary } from "@/i18n/dictionary-types";
import type { Locale } from "@/i18n/config";

type Variant = {
  key: string;
  title: string;
  description: string;
  ctaLabel: string;
  delaySeconds: number;
};

const SESSION_FLAG = "malibaan_popup_shown";

export function LeadPopup({ dict }: { dict: CommonDictionary; locale: Locale }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const [variant, setVariant] = useState<Variant | null>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isAdminRoute) return;
    if (sessionStorage.getItem(SESSION_FLAG)) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    fetch("/api/popup")
      .then((res) => res.json())
      .then((data: { variant: Variant | null }) => {
        if (!data.variant) return;
        setVariant(data.variant);
        timer = setTimeout(() => {
          setVisible(true);
          sessionStorage.setItem(SESSION_FLAG, "1");
        }, data.variant.delaySeconds * 1000);
      })
      .catch(() => null);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAdminRoute]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^0?9\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/popup/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, variantKey: variant?.key }),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("success");
      setTimeout(() => setVisible(false), 2500);
    } catch {
      setStatus("error");
    }
  }

  if (isAdminRoute || !visible || !variant) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-brand-ink-900/40 p-4 sm:items-center" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label={dict.forms.close}
          className="float-left text-brand-ink-400 hover:text-brand-ink-900"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="pt-4 text-center">
            <p className="text-lg font-bold text-brand-green-900">{dict.forms.successTitle}</p>
            <p className="mt-2 text-sm text-brand-ink-600">{dict.forms.successBody}</p>
          </div>
        ) : (
          <>
            <h2 className="mt-2 text-lg font-bold text-brand-ink-900">{variant.title}</h2>
            <p className="mt-2 text-sm leading-6 text-brand-ink-600">{variant.description}</p>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                dir="ltr"
                placeholder={dict.forms.phonePlaceholder}
                required
                className="rounded-lg border border-brand-line px-3 py-2.5 text-sm outline-none focus:border-brand-green-900/50"
              />
              {status === "error" && (
                <p className="text-xs text-red-600">{dict.forms.errorPhoneInvalid}</p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-full bg-brand-green-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-green-800 disabled:opacity-60"
              >
                {status === "submitting" ? dict.forms.submitting : variant.ctaLabel}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
