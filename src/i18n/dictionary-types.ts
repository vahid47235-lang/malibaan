export type CommonDictionary = {
  siteName: string;
  brandTagline: string;
  nav: {
    services: string;
    calculator: string;
    about: string;
    clients: string;
    blog: string;
    contact: string;
    ctaConsultation: string;
    homeAriaLabel: string;
    mainMenuAriaLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    description: string;
    pagesHeading: string;
    servicesHeading: string;
    contactHeading: string;
    addressLine: string;
    rightsReserved: string;
    privacy: string;
    terms: string;
    socialInstagram: string;
    socialTelegram: string;
  };
  languageSwitcher: {
    label: string;
    switchTo: string;
  };
  buttons: {
    callUs: string;
    whatsappMessage: string;
    submitting: string;
    readMore: string;
    viewAll: string;
    backToHome: string;
    contactUs: string;
  };
  breadcrumbs: {
    home: string;
    services: string;
    blog: string;
    navAriaLabel: string;
  };
  forms: {
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    messageOptional: string;
    messagePlaceholder: string;
    messagePlaceholderWithService: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorGeneric: string;
    errorNameTooShort: string;
    errorPhoneInvalid: string;
    close: string;
  };
  whatsapp: {
    ariaLabel: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    popularPages: string;
    ourServices: string;
    metaTitle: string;
  };
  loading: string;
};

export type HomeDictionary = {
  meta: { title: string; description: string; ogDescription: string };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    titleSuffix: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustLineValue: string;
    trustLineLabel: string;
  };
  stats: { value: string; label: string }[];
  trustPoints: string[];
  servicesGrid: {
    eyebrow: string;
    title: string;
    description: string;
    detailCta: string;
    items: { title: string; description: string; slug: string }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; description: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
  };
  ctaBanner: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
};

export type AboutDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  breadcrumb: string;
  pageHeader: { eyebrow: string; title: string; description: string };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    imageAlt: string;
    imageQuote: string;
  };
  values: { eyebrow: string; title: string; items: { title: string; description: string }[] };
  team: {
    eyebrow: string;
    title: string;
    description: string;
    roles: { title: string; description: string }[];
  };
};

export type ContactDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  breadcrumb: string;
  pageHeader: { eyebrow: string; title: string; description: string };
  channels: { title: string; value: string }[];
  addressTitle: string;
  addressValue: string;
  mapCta: string;
  formHeading: string;
  formDescription: string;
};

export type ConsultationDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  breadcrumb: string;
  pageHeader: { eyebrow: string; title: string; description: string };
  expectationsHeading: { eyebrow: string; title: string };
  benefits: { title: string; description: string }[];
  stepsHeading: string;
  stepsTitle: string;
  steps: { title: string; description: string }[];
  directContactHeading: string;
  directContactDescription: string;
  phoneValue: string;
  whatsappValue: string;
  formHeading: string;
  formDescription: string;
  formServiceLabel: string;
  faqHeading: string;
  faqEyebrow: string;
  faq: { question: string; answer: string }[];
};

export type ClientsDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  breadcrumb: string;
  pageHeader: { eyebrow: string; title: string; description: string };
  industriesHeading: { eyebrow: string; title: string };
  testimonialsHeading: { eyebrow: string; title: string };
  testimonials: { quote: string; name: string; context: string }[];
};

export type CalculatorDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  breadcrumb: string;
  pageHeader: { eyebrow: string; title: string; description: string };
  noServicesInCategory: string;
  noServicesConfigured: string;
  quoteHeading: string;
  referralLabel: string;
  referralPlaceholder: string;
  selectAtLeastOne: string;
  subtotalLabel: string;
  bundleDiscountTemplate: string;
  referralDiscountTemplate: string;
  totalDiscountTemplate: string;
  totalLabel: string;
  currencySuffix: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  submitCta: string;
  successTitle: string;
  successBody: string;
};

export type BlogDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  breadcrumb: string;
  pageHeader: { eyebrow: string; title: string; description: string };
  categoryEyebrow: string;
  categoryTitleTemplate: string;
  categoryMetaTitleTemplate: string;
  categoryMetaDescriptionTemplate: string;
  categoryDescriptionTemplate: string;
  readingMinutesSuffix: string;
  authorLabel: string;
  relatedServicePromptTemplate: string;
  viewServiceCtaTemplate: string;
  relatedArticlesHeading: string;
};

export type ServicesDictionary = {
  listMeta: { title: string; description: string; ogTitle: string; ogDescription: string };
  listBreadcrumb: string;
  listPageHeader: { eyebrow: string; title: string; description: string };
  detailCta: string;
  notListedHeading: string;
  notListedDescription: string;
  detailBreadcrumbServices: string;
  benefitsHeading: { eyebrow: string; title: string };
  offeringsHeading: { eyebrow: string; titleTemplate: string };
  problemsHeading: { eyebrow: string; title: string };
  processHeading: { eyebrow: string; title: string };
  industriesHeading: { eyebrow: string; title: string };
  faqHeadingTemplate: string;
  faqEyebrow: string;
  relatedHeading: string;
  leadFormTitleTemplate: string;
  leadFormDescription: string;
  callCta: string;
  whatsappCta: string;
};

type LegalPage = {
  title: string;
  description: string;
  heading: string;
  description2: string;
  updated: string;
  sections: { heading: string; paragraphs?: string[]; list?: string[] }[];
};

export type LegalDictionary = {
  updatedLabel: string;
  privacy: LegalPage;
  terms: LegalPage;
};

export type Dictionary = {
  common: CommonDictionary;
  home: HomeDictionary;
  about: AboutDictionary;
  contact: ContactDictionary;
  consultation: ConsultationDictionary;
  clients: ClientsDictionary;
  calculator: CalculatorDictionary;
  blog: BlogDictionary;
  services: ServicesDictionary;
  legal: LegalDictionary;
};
