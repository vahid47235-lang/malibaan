import { Container } from "@/components/ui/container";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export function LegalContent({
  sections,
  lastUpdated,
}: {
  sections: LegalSection[];
  lastUpdated: string;
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-brand-ink-400">آخرین به‌روزرسانی: {lastUpdated}</p>
          <div className="mt-8 flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-brand-ink-900 sm:text-2xl">{section.heading}</h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={index} className="mt-3 text-[15px] leading-8 text-brand-ink-700 first:mt-4">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] leading-7 text-brand-ink-700">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="mt-1.5 shrink-0 text-brand-green-700"
                        >
                          <path
                            d="M3 8.5L6.2 11.5L13 4.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
