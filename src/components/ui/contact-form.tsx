"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  serviceLabel,
  className,
}: {
  serviceLabel?: string;
  className?: string;
}) {
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
      setError("لطفاً نام و نام‌خانوادگی خود را وارد کنید.");
      return;
    }
    if (!/^0?9\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      setError("شماره موبایل معتبر نیست. مثال: 09121234567");
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
      setError("ارسال درخواست با خطا مواجه شد. لطفاً دوباره تلاش کنید یا از طریق واتساپ پیام دهید.");
    }
  }

  if (status === "success") {
    return (
      <div className={className}>
        <div className="rounded-2xl border border-brand-green-900/20 bg-brand-mint-300/40 p-6 text-center">
          <p className="text-lg font-bold text-brand-green-900">درخواست شما ثبت شد</p>
          <p className="mt-2 text-[15px] leading-7 text-brand-ink-700">
            یکی از کارشناسان مالی‌بان حداکثر تا یک روز کاری با شما تماس می‌گیرد.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-ink-900">
            نام و نام‌خانوادگی
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-brand-green-900/50"
            placeholder="مثلاً علی رضایی"
          />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-ink-900">
            شماره موبایل
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
            توضیح کوتاه درباره نیاز شما (اختیاری)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-xl border border-brand-line bg-white px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-brand-green-900/50"
            placeholder={
              serviceLabel ? `سؤالم درباره «${serviceLabel}» است...` : "کسب‌وکار شما چه نیازی دارد؟"
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
        {status === "submitting" ? "در حال ارسال..." : "ارسال درخواست مشاوره"}
      </Button>
    </form>
  );
}
