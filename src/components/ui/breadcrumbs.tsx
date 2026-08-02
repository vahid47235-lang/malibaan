import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { JsonLd, breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema";

export async function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = await getTranslations("Breadcrumbs");
  const locale = await getLocale();
  const prefix = locale === "fa" ? "" : `/${locale}`;

  const withHome: BreadcrumbItem[] = [{ label: t("home"), href: "/" }, ...items];
  const schemaItems = withHome.map((item) => ({
    ...item,
    href: item.href === "/" ? prefix || "/" : `${prefix}${item.href}`,
  }));

  return (
    <div className="border-b border-brand-line/70 bg-white">
      <Container>
        <JsonLd data={breadcrumbSchema(schemaItems)} />
        <nav aria-label="Breadcrumb" className="py-3">
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
