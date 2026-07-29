import { Link } from "@/components/i18n/link";
import { Container } from "@/components/ui/container";
import { JsonLd, breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";
import type { Locale } from "@/i18n/config";

export function Breadcrumbs({
  items,
  locale,
  homeLabel,
  navAriaLabel,
}: {
  items: BreadcrumbItem[];
  locale: Locale;
  homeLabel: string;
  navAriaLabel: string;
}) {
  const withHome: BreadcrumbItem[] = [{ label: homeLabel, href: "/" }, ...items];

  return (
    <div className="border-b border-brand-line/70 bg-white">
      <Container>
        <JsonLd data={breadcrumbSchema(withHome, locale)} />
        <nav aria-label={navAriaLabel} className="py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-ink-400">
            {withHome.map((item, index) => {
              const isLast = index === withHome.length - 1;
              return (
                <li key={item.href} className="flex items-center gap-2">
                  {index > 0 && <span className="text-brand-ink-400/60">/</span>}
                  {isLast ? (
                    <span className="font-medium text-brand-ink-900">{item.label}</span>
                  ) : (
                    <Link href={item.href} className="hover:text-brand-green-900">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
