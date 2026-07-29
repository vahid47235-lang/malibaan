"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { t } from "@/i18n/format";
import type { CommonDictionary } from "@/i18n/dictionary-types";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  dict,
  serviceLabel,
  className,
}: {
  dict: CommonDictionary;
  serviceLabel?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const f = dict.forms;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) {
      setError(f.errorNameTooShort);
      return;
    }
    if (!/^0?9\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      setError(f.errorPhoneInvalid);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message,
          service: serviceLabel,
          honeypot: data.get("company_website"),
        }),
      });

      if (!response.ok) throw new Error("submit_failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(f.errorGeneric);
    }
  }

  if (status === "success") {
    return (
      <div className={className}>
        <div className="rounded-2xl border border-brand-green-900/20 bg-brand-mint-300/40 p-6 text-center">
          <p className="text-lg font-bold text-brand-green-900">{f.successTitle}</p>
          <p className="mt-2 text-[15px] leading-7 text-brand-ink-700">{f.successBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-ink-900">
            {f.fullName}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-brand-green-900/50"
            placeholder={f.fullNamePlaceholder}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-ink-900">
            {f.phone}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            required
            className="w-full rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-brand-green-900/50"
            placeholder={f.phonePlaceholder}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-ink-900">
            {f.messageOptional}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-brand-green-900/50"
            placeholder={
              serviceLabel ? t(f.messagePlaceholderWithService, { service: serviceLabel }) : f.messagePlaceholder
            }
          />
        </div>
        {/* Honeypot field: hidden from real users, catches simple bots */}
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto">
        {status === "submitting" ? f.submitting : f.submit}
      </Button>
    </form>
  );
}
