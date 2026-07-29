import { SITE_URL, localizePath, type Locale } from "@/i18n/config";

const orgNameByLocale: Record<Locale, string> = { fa: "مالی‌بان", en: "Malibaan" };
const orgDescriptionByLocale: Record<Locale, string> = {
  fa: "مالی‌بان، مشاور حسابداری، مالیاتی و بیمه‌ای برای کسب‌وکارهای ایرانی؛ از ثبت شرکت تا حسابرسی.",
  en: "Malibaan is an accounting, tax, and social-insurance advisory for Iranian businesses, from company registration to independent audit.",
};
const streetAddressByLocale: Record<Locale, string> = {
  fa: "خیابان ولیعصر، ساختمان مالی‌بان",
  en: "Malibaan Building, Vali-e-Asr Street",
};
const addressLocalityByLocale: Record<Locale, string> = { fa: "تهران", en: "Tehran" };

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function organizationSchema(locale: Locale = "fa") {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: orgNameByLocale[locale],
    alternateName: "Malibaan",
    url: `${SITE_URL}${localizePath(locale, "/")}`,
    logo: `${SITE_URL}/brand/malibaan-mark.png`,
    description: orgDescriptionByLocale[locale],
    address: {
      "@type": "PostalAddress",
      streetAddress: streetAddressByLocale[locale],
      addressLocality: addressLocalityByLocale[locale],
      addressCountry: "IR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+98-990-003-5009",
      contactType: "customer service",
      areaServed: "IR",
      availableLanguage: ["fa", "en"],
    },
    sameAs: ["https://instagram.com/malibaan", "https://t.me/malibaan"],
  };
}

export function localBusinessSchema(locale: Locale = "fa") {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: orgNameByLocale[locale],
    image: `${SITE_URL}/brand/malibaan-mark.png`,
    url: `${SITE_URL}${localizePath(locale, "/")}`,
    telephone: "+98-990-003-5009",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: streetAddressByLocale[locale],
      addressLocality: addressLocalityByLocale[locale],
      addressCountry: "IR",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[], locale: Locale = "fa") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${localizePath(locale, item.href)}`,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  slug,
  locale = "fa",
}: {
  name: string;
  description: string;
  slug: string;
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${localizePath(locale, `/services/${slug}`)}`,
    provider: {
      "@type": "Organization",
      name: orgNameByLocale[locale],
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Iran",
    },
  };
}

export function articleSchema({
  title,
  description,
  slug,
  publishedAt,
  locale = "fa",
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  locale?: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}${localizePath(locale, `/blog/${slug}`)}`,
    datePublished: publishedAt,
    inLanguage: locale,
    author: {
      "@type": "Organization",
      name: orgNameByLocale[locale],
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: orgNameByLocale[locale],
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/malibaan-mark.png`,
      },
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
