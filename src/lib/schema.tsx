const SITE_URL = "https://malibaan.com";
const ORG_NAME = "مالی‌بان";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    alternateName: "Malibaan",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/malibaan-mark.png`,
    description:
      "مالی‌بان، مشاور حسابداری، مالیاتی و بیمه‌ای برای کسب‌وکارهای ایرانی؛ از ثبت شرکت تا حسابرسی.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "خیابان ولیعصر، ساختمان مالی‌بان",
      addressLocality: "تهران",
      addressCountry: "IR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+98-990-003-5009",
      contactType: "customer service",
      areaServed: "IR",
      availableLanguage: ["fa"],
    },
    sameAs: ["https://instagram.com/malibaan", "https://t.me/malibaan"],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: ORG_NAME,
    image: `${SITE_URL}/brand/malibaan-mark.png`,
    url: SITE_URL,
    telephone: "+98-990-003-5009",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "خیابان ولیعصر، ساختمان مالی‌بان",
      addressLocality: "تهران",
      addressCountry: "IR",
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
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
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
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
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: publishedAt,
    author: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
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
