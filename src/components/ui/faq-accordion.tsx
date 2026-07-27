"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-brand-line rounded-2xl border border-brand-line bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-bold text-brand-ink-900">
                {item.question}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={cn(
                  "shrink-0 text-brand-green-900 transition-transform duration-200",
                  isOpen && "rotate-45"
                )}
              >
                <path
                  d="M8 2V14M2 8H14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            {isOpen && (
              <p className="px-6 pb-5 text-[15px] leading-7 text-brand-ink-600">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
