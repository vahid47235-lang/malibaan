"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  serviceLabel,
  source = "contact_form",
  className,
}: {
  serviceLabel?: string;
  source?: "contact_form" | "consultation_form";
  className?: string;
}) {
  const t = useTranslations("ContactForm");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (name.length < 2) {
      setError(t("errorName"));
      return;
    }
    if (!/^0?9\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      setError(t("errorPhone"));
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
          source,
          honeypot: data.get("company_website"),
        }),
      });

      if (!response.ok) throw new Error("submit_failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(t("errorGeneric"));
    }
  }

  if (status === "success") {
    return (
      <div className={className}>
        <div className="rounded-2xl border border-brand-green-900/20 bg-brand-mint-300/40 p-6 text-center">
          <p className="text-lg font-bold text-brand-green-900">{t("successTitle")}</p>
          <p className="mt-2 text-[15px] leading-7 text-brand-ink-700">{t("successDescription")}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-ink-900">
            {t("nameLabel")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-brand-green-900/50"
            placeholder={t("namePlaceholder")}
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-ink-900">
            {t("phoneLabel")}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            dir="ltr"
            required
            className="w-full rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-brand-green-900/50"
            placeholder="09121234567"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-ink-900">
            {t("messageLabel")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-brand-green-900/50"
            placeholder={
              serviceLabel ? t("messagePlaceholderService", { service: serviceLabel }) : t("messagePlaceholderDefault")
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
        {status === "submitting" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
