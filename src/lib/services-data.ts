export type LocalizedString = {
  fa: string;
  en: string;
};

export type RawServiceBenefit = {
  title: LocalizedString;
  description: LocalizedString;
};

export type RawServiceProcessStep = {
  title: LocalizedString;
  description: LocalizedString;
};

export type RawServiceFaq = {
  question: LocalizedString;
  answer: LocalizedString;
};

export type RawService = {
  slug: string;
  navLabel: LocalizedString;
  title: LocalizedString;
  eyebrow: LocalizedString;
  metaDescription: LocalizedString;
  heroDescription: LocalizedString;
  benefits: RawServiceBenefit[];
  problems: LocalizedString[];
  process: RawServiceProcessStep[];
  industries: LocalizedString[];
  faq: RawServiceFaq[];
  relatedSlugs: string[];
  offerings: LocalizedString[];
};

export type ServiceBenefit = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  title: string;
  description: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  navLabel: string;
  title: string;
  eyebrow: string;
  metaDescription: string;
  heroDescription: string;
  benefits: ServiceBenefit[];
  problems: string[];
  process: ServiceProcessStep[];
  industries: string[];
  faq: ServiceFaq[];
  relatedSlugs: string[];
  offerings: string[];
};

function loc(value: LocalizedString, locale: string): string {
  return locale === "en" ? value.en : value.fa;
}

function localizeService(raw: RawService, locale: string): Service {
  return {
    slug: raw.slug,
    navLabel: loc(raw.navLabel, locale),
    title: loc(raw.title, locale),
    eyebrow: loc(raw.eyebrow, locale),
    metaDescription: loc(raw.metaDescription, locale),
    heroDescription: loc(raw.heroDescription, locale),
    benefits: raw.benefits.map((b) => ({
      title: loc(b.title, locale),
      description: loc(b.description, locale),
    })),
    problems: raw.problems.map((p) => loc(p, locale)),
    process: raw.process.map((s) => ({
      title: loc(s.title, locale),
      description: loc(s.description, locale),
    })),
    industries: raw.industries.map((i) => loc(i, locale)),
    faq: raw.faq.map((f) => ({
      question: loc(f.question, locale),
      answer: loc(f.answer, locale),
    })),
    relatedSlugs: raw.relatedSlugs,
    offerings: raw.offerings.map((o) => loc(o, locale)),
  };
}

export const rawServices: RawService[] = [
    {
      slug: "accounting",
      navLabel: { fa: "حسابداری و دفترداری", en: "Accounting & Bookkeeping" },
      title: {
        fa: "حسابداری و دفترداری دقیق، همیشه آماده برای مالیات و بانک",
        en: "Precise Accounting & Bookkeeping, Always Ready for Tax and Bank",
      },
      eyebrow: { fa: "حسابداری و دفترداری", en: "Accounting & Bookkeeping" },
      metaDescription: {
        fa: "خدمات حسابداری و دفترداری برای کسب‌وکارهای ایرانی؛ کدینگ استاندارد حساب‌ها، ثبت اسناد روزانه و گزارش مدیریتی ماهانه توسط کارشناس ثابت مالی‌بان.",
        en: "Accounting and bookkeeping services for Iranian businesses — standard chart of accounts, daily transaction entry, and monthly management reports from a dedicated Malibaan expert.",
      },
      heroDescription: {
        fa: "دفاتر حسابداری‌تان را از یک وظیفه معوقه، به ابزاری برای تصمیم‌گیری تبدیل می‌کنیم؛ با کدینگ استاندارد، ثبت منظم اسناد و گزارش‌هایی که واقعاً قابل فهم‌اند.",
        en: "We turn your books from a backlog of overdue tasks into a real decision-making tool — with a standard chart of accounts, consistent transaction entry, and reports that actually make sense.",
      },
      benefits: [
        {
          title: { fa: "کدینگ حسابداری متناسب با نوع فعالیت", en: "Chart of Accounts Built for Your Business" },
          description: {
            fa: "چارت حساب‌ها را بر اساس صنعت، حجم تراکنش و نیازهای گزارش‌دهی شما طراحی می‌کنیم؛ نه یک الگوی یکسان برای همه کسب‌وکارها.",
            en: "We design your chart of accounts around your industry, transaction volume, and reporting needs — not a one-size-fits-all template.",
          },
        },
        {
          title: { fa: "ثبت اسناد و تطبیق بانکی منظم", en: "Consistent Bookkeeping & Bank Reconciliation" },
          description: {
            fa: "اسناد روزانه ثبت و صورت‌حساب بانکی هر ماه تطبیق داده می‌شود تا هیچ تراکنشی جا نماند و در پایان سال با غافلگیری مواجه نشوید.",
            en: "Daily transactions are entered and bank statements reconciled every month, so nothing slips through the cracks and year-end brings no surprises.",
          },
        },
        {
          title: { fa: "آمادگی همیشگی برای حسابرسی و مالیات", en: "Always Ready for Audit and Tax" },
          description: {
            fa: "چون دفاتر از ابتدا استاندارد و منظم نگه‌داری می‌شوند، در زمان حسابرسی، اخذ تسهیلات بانکی یا رسیدگی مالیاتی، مدارک همیشه آماده ارائه است.",
            en: "Because your books are kept standard and organized from day one, your documentation is always ready — for an audit, a bank loan application, or a tax review.",
          },
        },
      ],
      problems: [
        {
          fa: "دفاتر حسابداری درهم‌ریخته که تهیه گزارش سالانه را به بحران تبدیل می‌کند",
          en: "Disorganized books that turn preparing the annual report into a crisis",
        },
        {
          fa: "عدم انطباق کدینگ حساب‌ها با استاندارهای حسابداری و نیاز حسابرس",
          en: "A chart of accounts that doesn't match accounting standards or your auditor's requirements",
        },
        {
          fa: "نبود گزارش مدیریتی شفاف برای تصمیم‌گیری درباره قیمت‌گذاری، هزینه‌ها و سرمایه در گردش",
          en: "No clear management reports to guide decisions on pricing, costs, and working capital",
        },
        {
          fa: "جریمه دیرکرد ناشی از عدم ثبت به‌موقع اسناد و ارسال دیرهنگام اظهارنامه",
          en: "Late-filing penalties from unrecorded transactions and delayed tax returns",
        },
      ],
      process: [
        {
          title: { fa: "بررسی وضعیت فعلی دفاتر", en: "Review Your Current Books" },
          description: {
            fa: "دفاتر و اسناد موجود را ارزیابی می‌کنیم تا نقاط ضعف کدینگ و ثبت را شناسایی کنیم.",
            en: "We assess your existing books and records to identify weak points in coding and entry.",
          },
        },
        {
          title: { fa: "طراحی کدینگ و چارت حساب‌ها", en: "Design the Chart of Accounts" },
          description: {
            fa: "کدینگ حسابداری استاندارد و متناسب با فعالیت شما را طراحی و پیاده‌سازی می‌کنیم.",
            en: "We design and implement a standard chart of accounts tailored to your business.",
          },
        },
        {
          title: { fa: "ثبت اسناد و تطبیق بانکی ماهانه", en: "Monthly Entry and Bank Reconciliation" },
          description: {
            fa: "تمام اسناد به‌صورت منظم ثبت و هر ماه با گردش حساب بانکی تطبیق داده می‌شود.",
            en: "All transactions are recorded consistently and reconciled with your bank statement every month.",
          },
        },
        {
          title: { fa: "تحویل گزارش مدیریتی", en: "Deliver Management Reports" },
          description: {
            fa: "گزارش سود و زیان، ترازنامه و تحلیل هزینه‌ها را ماهانه به زبانی ساده در اختیار شما قرار می‌دهیم.",
            en: "We hand you a profit-and-loss statement, balance sheet, and cost analysis every month, in plain language.",
          },
        },
      ],
      industries: [
        { fa: "تولیدی و صنعتی", en: "Manufacturing & Industrial" },
        { fa: "بازرگانی و عمده‌فروشی", en: "Trading & Wholesale" },
        { fa: "فروشگاه‌های اینترنتی", en: "Online Stores" },
        { fa: "کلینیک‌ها و مراکز درمانی", en: "Clinics & Medical Centers" },
      ],
      faq: [
        {
          question: { fa: "آیا حسابداری به‌صورت دورکاری و ابری هم انجام می‌شود؟", en: "Can accounting be handled remotely, in the cloud?" },
          answer: {
            fa: "بله، بیشتر مشتریان مالی‌بان به‌صورت غیرحضوری همکاری می‌کنند. اسناد از طریق فایل یا نرم‌افزار حسابداری ابری دریافت و پردازش می‌شود و گزارش‌ها به‌صورت آنلاین در اختیار شما قرار می‌گیرد.",
            en: "Yes — most Malibaan clients work with us entirely remotely. Documents are received and processed through files or cloud accounting software, and reports are delivered to you online.",
          },
        },
        {
          question: { fa: "هزینه حسابداری ماهانه چگونه محاسبه می‌شود؟", en: "How is the monthly accounting fee calculated?" },
          answer: {
            fa: "هزینه بر اساس حجم اسناد، تعداد تراکنش‌های ماهانه و پیچیدگی فعالیت تعیین می‌شود. پس از بررسی اولیه رایگان، پیشنهاد قیمت شفاف و ثابت (نه متغیر و غیرقابل پیش‌بینی) ارائه می‌دهیم.",
            en: "The fee is based on document volume, monthly transaction count, and how complex your business is. After a free initial review, we quote a clear, fixed price — not something variable and unpredictable.",
          },
        },
        {
          question: { fa: "آیا نرم‌افزار حسابداری هم راه‌اندازی می‌کنید؟", en: "Do you also set up accounting software?" },
          answer: {
            fa: "بله، در صورت نیاز، نرم‌افزار حسابداری مناسب کسب‌وکار شما را راه‌اندازی، کدینگ اولیه را در آن پیاده‌سازی و تیم شما را برای استفاده روزمره آموزش می‌دهیم.",
            en: "Yes — if needed, we set up accounting software suited to your business, implement the initial chart of accounts in it, and train your team on day-to-day use.",
          },
        },
        {
          question: { fa: "پلمپ دفاتر قانونی هم جزو خدمات شماست؟", en: "Is stamping the statutory ledgers part of your services?" },
          answer: {
            fa: "بله، پلمپ دفاتر روزنامه و کل در سامانه اداره ثبت شرکت‌ها را پیش از پایان سال مالی برای مشتریان انجام می‌دهیم تا جریمه عدم پلمپ به‌موقع را نداشته باشید.",
            en: "Yes — we handle stamping the journal and general ledgers through the Companies Registration Office system before your fiscal year ends, so you avoid the penalty for late stamping.",
          },
        },
      ],
      relatedSlugs: ["tax-consulting", "audit", "digital-fintech"],
      offerings: [
        {
          fa: "تنظیم دفاتر قانونی (روزنامه و کل)",
          en: "Preparing statutory ledgers (journal and general ledger)",
        },
        {
          fa: "ثبت اسناد و رویدادهای مالی روزانه",
          en: "Daily recording of financial transactions and events",
        },
        {
          fa: "تهیه صورت‌های مالی (ترازنامه، سود و زیان، جریان وجوه نقد)",
          en: "Preparing financial statements (balance sheet, income statement, cash flow)",
        },
        {
          fa: "حسابداری حقوق و دستمزد",
          en: "Payroll accounting",
        },
        {
          fa: "حسابداری بهای تمام‌شده",
          en: "Cost accounting",
        },
        {
          fa: "تهیه گزارش‌های مدیریتی دوره‌ای",
          en: "Periodic management reports",
        },
        {
          fa: "بستن حساب‌ها در پایان سال مالی",
          en: "Year-end account closing",
        },
        {
          fa: "پیاده‌سازی و پشتیبانی نرم‌افزار حسابداری",
          en: "Accounting software implementation and support",
        },
        {
          fa: "حسابداری پروژه‌ای و پیمانکاری",
          en: "Project and contracting accounting",
        },
      ],
    },
    {
      slug: "tax-consulting",
      navLabel: { fa: "مشاوره مالیاتی", en: "Tax Consulting" },
      title: {
        fa: "مشاوره مالیاتی؛ اظهارنامه دقیق و دفاع در برابر دارایی",
        en: "Tax Consulting: Accurate Returns and Defense Before the Tax Authority",
      },
      eyebrow: { fa: "مشاوره مالیاتی", en: "Tax Consulting" },
      metaDescription: {
        fa: "مشاوره مالیاتی و تنظیم اظهارنامه عملکرد و ارزش‌افزوده، برنامه‌ریزی برای کاهش قانونی مالیات و دفاع در هیئت‌های حل اختلاف مالیاتی با تیم مالی‌بان.",
        en: "Tax consulting and preparation of corporate income and VAT returns, legal tax-reduction planning, and defense before tax dispute resolution boards with the Malibaan team.",
      },
      heroDescription: {
        fa: "مالیات باید یک هزینه قابل پیش‌بینی باشد، نه یک تهدید غافلگیرکننده. اظهارنامه‌های شما را دقیق تنظیم و در صورت اعتراض یا بازرسی، در هیئت‌های رسیدگی از پرونده‌تان دفاع می‌کنیم.",
        en: "Tax should be a predictable cost, not a surprise threat. We prepare your returns accurately, and if there's an audit or dispute, we defend your case before the review boards.",
      },
      benefits: [
        {
          title: { fa: "تنظیم اظهارنامه دقیق و به‌موقع", en: "Accurate, On-Time Tax Returns" },
          description: {
            fa: "اظهارنامه عملکرد و ارزش‌افزوده را بر اساس دفاتر واقعی و مستندات قانونی تنظیم می‌کنیم تا در بررسی‌های بعدی دارایی، مغایرتی پیدا نشود.",
            en: "We prepare your corporate income and VAT returns based on your actual books and legal documentation, so no discrepancy turns up in a later tax authority review.",
          },
        },
        {
          title: { fa: "برنامه‌ریزی مالیاتی قانونی", en: "Legal Tax Planning" },
          description: {
            fa: "از معافیت‌ها، مشوق‌های مالیاتی مناطق و نرخ‌های ترجیحی که قانون در اختیارتان گذاشته، به‌طور کامل و قانونی استفاده می‌کنیم.",
            en: "We make full, legal use of the exemptions, regional tax incentives, and preferential rates the law makes available to you.",
          },
        },
        {
          title: { fa: "دفاع در هیئت‌های حل اختلاف", en: "Defense Before Dispute Resolution Boards" },
          description: {
            fa: "اگر برگ تشخیص یا مطالبه‌ای دریافت کردید، مستندات لازم را آماده و در جلسات هیئت حل اختلاف مالیاتی از پرونده شما دفاع می‌کنیم.",
            en: "If you receive a tax assessment or demand notice, we prepare the necessary documentation and defend your case before the tax dispute resolution board.",
          },
        },
      ],
      problems: [
        {
          fa: "جریمه سنگین ناشی از عدم تسلیم یا تأخیر در ارسال اظهارنامه",
          en: "Heavy penalties from failing to file, or filing your return late",
        },
        {
          fa: "رد اظهارنامه توسط ممیز به‌دلیل مغایرت با دفاتر یا اسناد ناقص",
          en: "Returns rejected by the tax auditor over discrepancies with your books or incomplete documentation",
        },
        {
          fa: "ندانستن معافیت‌ها و مشوق‌های مالیاتی که می‌توانست هزینه را کاهش دهد",
          en: "Not knowing about exemptions and incentives that could have lowered your tax bill",
        },
        {
          fa: "دریافت برگ تشخیص مالیات بالا بدون دانستن نحوه اعتراض قانونی",
          en: "Receiving a high tax assessment notice without knowing how to legally appeal it",
        },
      ],
      process: [
        {
          title: { fa: "بررسی پرونده مالیاتی", en: "Review Your Tax File" },
          description: {
            fa: "سوابق مالیاتی، اظهارنامه‌های قبلی و وضعیت فعلی پرونده را بررسی می‌کنیم.",
            en: "We review your tax history, past returns, and the current state of your file.",
          },
        },
        {
          title: { fa: "تنظیم و ارسال اظهارنامه", en: "Prepare and File the Return" },
          description: {
            fa: "اظهارنامه عملکرد و ارزش‌افزوده را منطبق با دفاتر و در مهلت قانونی ارسال می‌کنیم.",
            en: "We prepare your corporate income and VAT returns to match your books and file them within the legal deadline.",
          },
        },
        {
          title: { fa: "پیگیری برگ تشخیص", en: "Follow Up on Assessment Notices" },
          description: {
            fa: "در صورت دریافت برگ تشخیص، مستندات لازم برای اعتراض را آماده می‌کنیم.",
            en: "If you receive an assessment notice, we prepare the documentation needed to appeal it.",
          },
        },
        {
          title: { fa: "حضور در هیئت حل اختلاف", en: "Represent You Before the Dispute Board" },
          description: {
            fa: "در جلسات هیئت‌های رسیدگی حضور می‌یابیم و از حقوق قانونی کسب‌وکار شما دفاع می‌کنیم.",
            en: "We attend the dispute resolution board hearings and defend your business's legal rights.",
          },
        },
      ],
      industries: [
        { fa: "تولیدی و صنعتی", en: "Manufacturing & Industrial" },
        { fa: "پیمانکاری و ساختمانی", en: "Contracting & Construction" },
        { fa: "واردات و صادرات", en: "Import & Export" },
        { fa: "مشاغل خدماتی", en: "Service Businesses" },
      ],
      faq: [
        {
          question: { fa: "جریمه عدم تسلیم اظهارنامه مالیاتی چقدر است؟", en: "How much is the penalty for not filing a tax return?" },
          answer: {
            fa: "جریمه عدم تسلیم اظهارنامه عملکرد معادل ۳۰ درصد مالیات متعلق است و غیرقابل بخشش. علاوه بر آن، معافیت‌های قانونی آن سال نیز از دست می‌رود. به همین دلیل ارسال به‌موقع اظهارنامه اولویت اول تیم ماست.",
            en: "The penalty for not filing a corporate income tax return is 30% of the tax due, and it cannot be waived. On top of that, you lose that year's legal exemptions. That's why filing your return on time is our team's first priority.",
          },
        },
        {
          question: { fa: "آیا مشاغل کوچک هم مشمول معافیت مالیاتی می‌شوند؟", en: "Do small businesses also qualify for tax exemptions?" },
          answer: {
            fa: "بسته به نوع فعالیت و میزان درآمد، معافیت‌های مختلفی برای مشاغل کوچک و متوسط در قانون مالیات‌های مستقیم پیش‌بینی شده است. در جلسه بررسی اولیه، مشخص می‌کنیم کدام معافیت‌ها برای کسب‌وکار شما قابل استفاده است.",
            en: "Depending on the type of activity and income level, the Direct Taxes Act provides a range of exemptions for small and medium businesses. In our initial review, we'll identify which exemptions apply to your business.",
          },
        },
        {
          question: { fa: "اگر برگ تشخیص مالیات دریافت کردم چه باید بکنم؟", en: "What should I do if I receive a tax assessment notice?" },
          answer: {
            fa: "از تاریخ ابلاغ برگ تشخیص، مهلت محدودی (معمولاً ۳۰ روز) برای اعتراض دارید. در این مدت مستندات و دفاعیه لازم را آماده و در هیئت حل اختلاف مالیاتی ارائه می‌کنیم.",
            en: "From the date the assessment notice is served, you have a limited window — usually 30 days — to appeal. Within that time, we prepare the necessary documentation and defense and present it to the tax dispute resolution board.",
          },
        },
      ],
      relatedSlugs: ["vat", "accounting"],
      offerings: [
        {
          fa: "تنظیم و ارسال اظهارنامه مالیات بر عملکرد",
          en: "Preparing and filing corporate income tax returns",
        },
        {
          fa: "محاسبه و پرداخت مالیات حقوق",
          en: "Calculating and paying payroll tax",
        },
        {
          fa: "دفاع مالیاتی و رسیدگی به پرونده‌های مالیاتی",
          en: "Tax defense and case handling",
        },
        {
          fa: "مشاوره بهینه‌سازی مالیاتی در چارچوب قانونی",
          en: "Legal tax optimization consulting",
        },
        {
          fa: "پیگیری استعلام و مفاصاحساب مالیاتی",
          en: "Tax clearance certificate follow-up",
        },
      ],
    },
    {
      slug: "vat",
      navLabel: { fa: "سامانه مودیان و ارزش‌افزوده", en: "VAT & E-Invoicing System" },
      title: {
        fa: "اتصال به سامانه مودیان و مدیریت کامل ارزش‌افزوده",
        en: "Full Connection to the E-Invoicing System and Complete VAT Management",
      },
      eyebrow: { fa: "سامانه مودیان و ارزش‌افزوده", en: "VAT & E-Invoicing System" },
      metaDescription: {
        fa: "ثبت‌نام و اتصال به سامانه مودیان، صدور صحیح صورتحساب الکترونیکی و تنظیم اظهارنامه ارزش‌افزوده بدون جریمه، با پیاده‌سازی مالی‌بان.",
        en: "Registration and connection to the e-invoicing system, correct e-invoice issuance, and penalty-free VAT return filing, implemented by Malibaan.",
      },
      heroDescription: {
        fa: "سامانه مودیان و صورتحساب الکترونیکی را برای بسیاری از کسب‌وکارها به یک منبع دائمی جریمه تبدیل کرده. تیم مالی‌بان اتصال، صدور صورتحساب و گزارش‌دهی ارزش‌افزوده شما را کامل و بدون خطا مدیریت می‌کند.",
        en: "The e-invoicing system has turned into a constant source of fines for many businesses. The Malibaan team manages your connection, invoice issuance, and VAT reporting completely and without errors.",
      },
      benefits: [
        {
          title: { fa: "اتصال صحیح نرم‌افزار فروش به سامانه مودیان", en: "Correct Connection of Your Sales Software to the E-Invoicing System" },
          description: {
            fa: "صندوق فروش، نرم‌افزار حسابداری یا سیستم فاکتور شما را طوری به سامانه مودیان متصل می‌کنیم که هر فروش، بدون خطا و در زمان مقرر ثبت شود.",
            en: "We connect your POS, accounting software, or invoicing system to the e-invoicing platform so every sale is recorded correctly and on time.",
          },
        },
        {
          title: { fa: "صدور صورتحساب الکترونیکی استاندارد", en: "Standard-Compliant E-Invoice Issuance" },
          description: {
            fa: "قالب و محتوای صورتحساب‌های الکترونیکی را مطابق آخرین دستورالعمل سازمان امور مالیاتی تنظیم می‌کنیم تا در گزارش‌دهی ارزش‌افزوده مغایرتی ایجاد نشود.",
            en: "We set up your e-invoice format and content according to the tax authority's latest directives, so no discrepancy shows up in your VAT reporting.",
          },
        },
        {
          title: { fa: "تطبیق و گزارش‌دهی دوره‌ای ارزش‌افزوده", en: "Periodic VAT Reconciliation and Reporting" },
          description: {
            fa: "خرید و فروش هر دوره را با صورتحساب‌های صادرشده تطبیق می‌دهیم و اظهارنامه ارزش‌افزوده را دقیق و به‌موقع ارسال می‌کنیم.",
            en: "We reconcile each period's purchases and sales against issued invoices and file your VAT return accurately and on time.",
          },
        },
      ],
      problems: [
        {
          fa: "جریمه سنگین عدم صدور یا صدور ناقص صورتحساب الکترونیکی",
          en: "Heavy penalties for not issuing, or incompletely issuing, e-invoices",
        },
        {
          fa: "مغایرت بین گزارش فروش و اظهارنامه ارزش‌افزوده",
          en: "Discrepancies between your sales report and VAT return",
        },
        {
          fa: "خطا در اتصال نرم‌افزار فروشگاهی به سامانه مودیان",
          en: "Errors connecting your POS software to the e-invoicing system",
        },
        {
          fa: "سردرگمی درباره کالا و خدمات مشمول معافیت ارزش‌افزوده",
          en: "Confusion over which goods and services are VAT-exempt",
        },
      ],
      process: [
        {
          title: { fa: "ارزیابی وضعیت ثبت‌نام", en: "Assess Your Registration Status" },
          description: {
            fa: "وضعیت فعلی ثبت‌نام در سامانه مودیان و ارزش‌افزوده را بررسی می‌کنیم.",
            en: "We review your current registration status with the e-invoicing and VAT systems.",
          },
        },
        {
          title: { fa: "اتصال نرم‌افزار فروش", en: "Connect Your Sales Software" },
          description: {
            fa: "صندوق فروش یا نرم‌افزار حسابداری شما را به سامانه مودیان متصل و تست می‌کنیم.",
            en: "We connect your POS or accounting software to the e-invoicing system and test it.",
          },
        },
        {
          title: { fa: "آموزش صدور صورتحساب", en: "Train Your Team on Invoice Issuance" },
          description: {
            fa: "نحوه صدور صحیح صورتحساب الکترونیکی را به تیم فروش شما آموزش می‌دهیم.",
            en: "We train your sales team on how to correctly issue e-invoices.",
          },
        },
        {
          title: { fa: "گزارش‌دهی دوره‌ای", en: "Periodic Reporting" },
          description: {
            fa: "اظهارنامه ارزش‌افزوده هر دوره را بر اساس صورتحساب‌های ثبت‌شده تنظیم و ارسال می‌کنیم.",
            en: "We prepare and file your VAT return each period based on your recorded invoices.",
          },
        },
      ],
      industries: [
        { fa: "فروشگاه‌های زنجیره‌ای و خرده‌فروشی", en: "Retail Chains" },
        { fa: "رستوران‌ها و کافه‌ها", en: "Restaurants & Cafés" },
        { fa: "فروشگاه‌های اینترنتی", en: "Online Stores" },
        { fa: "عمده‌فروشان", en: "Wholesalers" },
      ],
      faq: [
        {
          question: { fa: "سامانه مودیان دقیقاً چیست و چه کسانی مشمول آن هستند؟", en: "What exactly is the e-invoicing system, and who is required to use it?" },
          answer: {
            fa: "سامانه مودیان، سامانه‌ای برای ثبت برخط صورتحساب‌های الکترونیکی مشاغل و شرکت‌هاست که به‌تدریج برای اکثر مشاغل الزامی شده است. مشمولیت دقیق بر اساس نوع فعالیت و حجم فروش تعیین می‌شود که در بررسی اولیه مشخص می‌کنیم.",
            en: "It's a real-time system for registering e-invoices from businesses and companies, and it's gradually become mandatory for most businesses. Exactly who's required depends on your type of activity and sales volume — something we determine in our initial review.",
          },
        },
        {
          question: { fa: "جریمه عدم ثبت صورتحساب در سامانه مودیان چقدر است؟", en: "How much is the penalty for not registering an invoice in the e-invoicing system?" },
          answer: {
            fa: "جریمه عدم صدور یا ثبت صورتحساب الکترونیکی می‌تواند تا چند برابر ارزش معامله باشد و به‌صورت مستمر برای هر تخلف اعمال می‌شود. به همین دلیل، اتصال صحیح از ابتدا اهمیت زیادی دارد.",
            en: "The penalty for not issuing or registering an e-invoice can be several times the value of the transaction, and it's applied repeatedly for every violation. That's why getting the connection right from the start matters so much.",
          },
        },
        {
          question: { fa: "تفاوت مالیات ارزش‌افزوده و سامانه مودیان چیست؟", en: "What's the difference between VAT and the e-invoicing system?" },
          answer: {
            fa: "سامانه مودیان مربوط به ثبت و صدور صورتحساب الکترونیکی است، در حالی که مالیات ارزش‌افزوده مربوط به محاسبه و پرداخت مالیات بر مبنای همان صورتحساب‌هاست. این دو به‌هم مرتبط‌اند اما فرآیندهای متفاوتی دارند که هر دو را مدیریت می‌کنیم.",
            en: "The e-invoicing system is about registering and issuing e-invoices, while VAT is about calculating and paying tax based on those same invoices. The two are related but involve different processes — we manage both.",
          },
        },
      ],
      relatedSlugs: ["tax-consulting", "accounting"],
      offerings: [
        {
          fa: "تنظیم و ارسال اظهارنامه ارزش‌افزوده (فصلی)",
          en: "Preparing and filing quarterly VAT returns",
        },
        {
          fa: "گزارش معاملات فصلی (خرید و فروش)",
          en: "Quarterly transaction reports (purchases and sales)",
        },
        {
          fa: "ثبت‌نام و استعلام سامانه مؤدیان (فاکتور الکترونیک)",
          en: "E-invoicing system registration and inquiries",
        },
      ],
    },
    {
      slug: "payroll",
      navLabel: { fa: "حقوق، دستمزد و بیمه", en: "Payroll & Social Insurance" },
      title: {
        fa: "حقوق، دستمزد و بیمه تأمین اجتماعی، هر ماه دقیق و به‌موقع",
        en: "Payroll and Social Insurance, Accurate and On Time Every Month",
      },
      eyebrow: { fa: "حقوق، دستمزد و بیمه", en: "Payroll & Social Insurance" },
      metaDescription: {
        fa: "محاسبه حقوق و دستمزد، تنظیم لیست بیمه تأمین اجتماعی، دریافت کد کارگاه و مفاصا‌حساب پروژه‌ها؛ خدمات پرسنلی مالی‌بان برای کارفرمایان.",
        en: "Payroll calculation, social insurance list preparation, workshop code registration, and project clearance certificates — Malibaan's personnel services for employers.",
      },
      heroDescription: {
        fa: "محاسبه حقوق، لیست بیمه و مفاصا‌حساب، حوزه‌ای است که کوچک‌ترین خطا در آن به جریمه یا نارضایتی نیروی کار منجر می‌شود. مالی‌بان این فرآیندها را هر ماه دقیق، منظم و مطابق قانون کار انجام می‌دهد.",
        en: "Payroll, insurance lists, and clearance certificates are areas where the smallest error leads to a fine or an unhappy workforce. Malibaan handles these processes every month — accurately, consistently, and in line with labor law.",
      },
      benefits: [
        {
          title: { fa: "محاسبه دقیق حقوق طبق قانون کار", en: "Accurate Payroll Under Labor Law" },
          description: {
            fa: "حقوق پایه، اضافه‌کاری، حق مسکن، حق اولاد، عیدی و سنوات را مطابق آخرین بخشنامه‌های وزارت کار محاسبه می‌کنیم تا نه کارفرما و نه کارگر متضرر نشوند.",
            en: "We calculate base pay, overtime, housing allowance, child allowance, year-end bonus, and severance according to the Ministry of Labor's latest directives, so neither employer nor employee loses out.",
          },
        },
        {
          title: { fa: "لیست بیمه بدون تأخیر و بدون خطا", en: "Insurance Lists Without Delay or Error" },
          description: {
            fa: "لیست بیمه تأمین اجتماعی هر ماه پیش از موعد مقرر تنظیم و ارسال می‌شود تا جریمه دیرکرد یا مغایرت لیست را نداشته باشید.",
            en: "The social insurance list is prepared and submitted every month ahead of the deadline, so you never face a late-filing penalty or list discrepancy.",
          },
        },
        {
          title: { fa: "اخذ کد کارگاه و مفاصا‌حساب پروژه‌ها", en: "Workshop Codes and Project Clearance Certificates" },
          description: {
            fa: "برای پیمانکاران و کارفرمایان پروژه‌محور، دریافت کد کارگاه از سازمان تأمین اجتماعی و مفاصا‌حساب پایان‌کار را پیگیری می‌کنیم.",
            en: "For contractors and project-based employers, we handle obtaining the workshop code from the Social Security Organization and the end-of-project clearance certificate.",
          },
        },
      ],
      problems: [
        {
          fa: "خطای محاسبه اضافه‌کاری، عیدی یا سنوات که به شکایت کارگری منجر می‌شود",
          en: "Overtime, bonus, or severance miscalculations that lead to a labor complaint",
        },
        {
          fa: "جریمه دیرکرد ارسال لیست بیمه تأمین اجتماعی",
          en: "Late-filing penalties on the social insurance list",
        },
        {
          fa: "رد شدن درخواست مفاصا‌حساب به‌دلیل مغایرت لیست بیمه با قرارداد پیمان",
          en: "Clearance certificate requests rejected due to a mismatch between the insurance list and the contract",
        },
        {
          fa: "ندانستن نحوه دریافت کد کارگاه برای پروژه‌های پیمانکاری",
          en: "Not knowing how to get a workshop code for contracting projects",
        },
      ],
      process: [
        {
          title: { fa: "بررسی قراردادها و ساختار حقوق", en: "Review Contracts and Pay Structure" },
          description: {
            fa: "قراردادهای کاری و ساختار فعلی پرداخت حقوق را بررسی می‌کنیم.",
            en: "We review your employment contracts and current payroll structure.",
          },
        },
        {
          title: { fa: "تنظیم لیست بیمه ماهانه", en: "Prepare the Monthly Insurance List" },
          description: {
            fa: "لیست بیمه تأمین اجتماعی را مطابق حقوق واقعی پرسنل هر ماه تنظیم می‌کنیم.",
            en: "We prepare the social insurance list each month to match your staff's actual pay.",
          },
        },
        {
          title: { fa: "ارسال به سامانه تأمین اجتماعی", en: "Submit to the Social Security System" },
          description: {
            fa: "لیست و حق بیمه را پیش از موعد مقرر در سامانه سازمان تأمین اجتماعی ثبت می‌کنیم.",
            en: "We register the list and insurance contributions in the Social Security Organization's system ahead of the deadline.",
          },
        },
        {
          title: { fa: "پیگیری مفاصا‌حساب", en: "Follow Up on Clearance Certificates" },
          description: {
            fa: "برای پروژه‌ها و قراردادهای پیمانکاری، فرآیند دریافت مفاصا‌حساب را تا پایان پیگیری می‌کنیم.",
            en: "For projects and contracting agreements, we follow the clearance certificate process through to completion.",
          },
        },
      ],
      industries: [
        { fa: "پیمانکاری و ساختمانی", en: "Contracting & Construction" },
        { fa: "تولیدی و کارگاهی", en: "Manufacturing & Workshops" },
        { fa: "استارتاپ‌های در حال رشد نیروی انسانی", en: "Growing Startups" },
      ],
      faq: [
        {
          question: { fa: "کد کارگاه چیست و چه زمانی لازم است؟", en: "What is a workshop code, and when is it needed?" },
          answer: {
            fa: "کد کارگاه، شناسه‌ای است که سازمان تأمین اجتماعی برای هر محل فعالیت یا پروژه پیمانکاری صادر می‌کند و برای ارسال لیست بیمه آن پروژه ضروری است. برای پیمانکاران ساختمانی، دریافت این کد پیش از شروع پروژه اهمیت زیادی دارد.",
            en: "A workshop code is an identifier the Social Security Organization issues for each place of business or contracting project, and it's required to submit that project's insurance list. For construction contractors, getting this code before the project starts matters a great deal.",
          },
        },
        {
          question: { fa: "مفاصا‌حساب تأمین اجتماعی معمولاً چقدر طول می‌کشد؟", en: "How long does a social security clearance certificate usually take?" },
          answer: {
            fa: "بسته به نوع پروژه و کامل بودن مستندات، فرآیند رسیدگی و صدور مفاصا‌حساب از چند هفته تا چند ماه متغیر است. تنظیم دقیق لیست‌های بیمه از ابتدای پروژه، این فرآیند را به‌طور محسوسی کوتاه‌تر می‌کند.",
            en: "Depending on the project type and how complete the documentation is, the review and issuance process ranges from a few weeks to several months. Keeping accurate insurance lists from the start of the project noticeably shortens this process.",
          },
        },
        {
          question: { fa: "آیا محاسبه حقوق سالانه را به‌روزرسانی می‌کنید؟", en: "Do you update payroll calculations every year?" },
          answer: {
            fa: "بله، نرخ حداقل حقوق، حق مسکن و سایر مزایا هر سال بر اساس مصوبه شورای عالی کار تغییر می‌کند و ما محاسبات حقوق مشتریان را طبق آخرین بخشنامه هر سال به‌روزرسانی می‌کنیم.",
            en: "Yes — the minimum wage, housing allowance, and other benefits change every year based on the Supreme Labor Council's ruling, and we update our clients' payroll calculations to match the latest directive each year.",
          },
        },
      ],
      relatedSlugs: ["accounting", "audit"],
      offerings: [
        {
          fa: "ثبت‌نام و لیست بیمه کارکنان",
          en: "Employee registration and insurance lists",
        },
        {
          fa: "محاسبه حق بیمه و ارسال لیست ماهانه",
          en: "Insurance contribution calculation and monthly list submission",
        },
        {
          fa: "پیگیری مفاصاحساب بیمه تأمین اجتماعی",
          en: "Social security clearance certificate follow-up",
        },
        {
          fa: "مشاوره قوانین کار و بیمه",
          en: "Labor and insurance law consulting",
        },
      ],
    },
    {
      slug: "audit",
      navLabel: { fa: "حسابرسی و کنترل داخلی", en: "Audit & Internal Controls" },
      title: {
        fa: "حسابرسی مستقل و کنترل داخلی برای رشد قابل اتکا",
        en: "Independent Audit and Internal Controls for Reliable Growth",
      },
      eyebrow: { fa: "حسابرسی و کنترل داخلی", en: "Audit & Internal Controls" },
      metaDescription: {
        fa: "خدمات حسابرسی صورت‌های مالی و استقرار کنترل‌های داخلی برای شرکت‌های در حال افزایش سرمایه، اخذ تسهیلات بانکی یا آماده‌سازی برای رسیدگی مالیاتی.",
        en: "Financial statement audit services and internal control setup for companies raising capital, applying for bank facilities, or preparing for a tax review.",
      },
      heroDescription: {
        fa: "گزارش حسابرسی، سند اعتبار کسب‌وکار شماست نزد بانک، دارایی و سرمایه‌گذار. تیم مالی‌بان صورت‌های مالی شما را مستقل حسابرسی می‌کند و کنترل‌های داخلی لازم برای رشد پایدار را مستقر می‌سازد.",
        en: "An audit report is your business's credibility document with banks, the tax authority, and investors. The Malibaan team independently audits your financial statements and puts in place the internal controls you need for sustainable growth.",
      },
      benefits: [
        {
          title: { fa: "گزارش حسابرسی قابل ارائه به بانک و دارایی", en: "An Audit Report Banks and the Tax Authority Accept" },
          description: {
            fa: "صورت‌های مالی شما مطابق استانداردهای حسابرسی ایران بررسی و گزارشی تهیه می‌شود که در فرآیند اخذ تسهیلات بانکی یا رسیدگی مالیاتی مورد پذیرش قرار می‌گیرد.",
            en: "Your financial statements are reviewed against Iranian auditing standards, producing a report that's accepted in the bank facility or tax review process.",
          },
        },
        {
          title: { fa: "شناسایی نقاط ضعف کنترلی پیش از بروز مشکل", en: "Catching Control Weaknesses Before They Become Problems" },
          description: {
            fa: "در جریان حسابرسی، ضعف‌های کنترل داخلی مانند دسترسی‌های غیرضروری یا فرآیندهای تأیید ناقص را شناسایی و برای اصلاح آن پیشنهاد می‌دهیم.",
            en: "During the audit, we identify internal control weaknesses — like unnecessary access rights or incomplete approval processes — and recommend fixes.",
          },
        },
        {
          title: { fa: "افزایش اعتبار برای افزایش سرمایه و جذب سرمایه‌گذار", en: "Stronger Credibility for Raising Capital and Investors" },
          description: {
            fa: "صورت‌های مالی حسابرسی‌شده، اولین مدرکی است که سرمایه‌گذاران و شرکا برای ارزیابی کسب‌وکار شما درخواست می‌کنند.",
            en: "Audited financial statements are the first document investors and partners ask for when evaluating your business.",
          },
        },
      ],
      problems: [
        {
          fa: "رد شدن گزارش مالی توسط بانک یا سرمایه‌گذار به‌دلیل نبود حسابرسی مستقل",
          en: "Financial reports rejected by a bank or investor for lacking an independent audit",
        },
        {
          fa: "سوءاستفاده یا اشتباه داخلی که به‌دلیل نبود کنترل به‌موقع شناسایی نمی‌شود",
          en: "Internal misuse or errors that go undetected because there's no timely control in place",
        },
        {
          fa: "عدم آمادگی برای حسابرسی مالیاتی یا رسیدگی سازمان امور مالیاتی",
          en: "Not being prepared for a tax audit or a tax authority review",
        },
        {
          fa: "فرآیند افزایش سرمایه بدون گزارش حسابرسی معتبر متوقف می‌شود",
          en: "A capital increase process stalling without a valid audit report",
        },
      ],
      process: [
        {
          title: { fa: "برنامه‌ریزی حسابرسی", en: "Plan the Audit" },
          description: {
            fa: "دامنه، زمان‌بندی و ریسک‌های حسابرسی صورت‌های مالی شما مشخص می‌شود.",
            en: "We define the scope, timeline, and risks of auditing your financial statements.",
          },
        },
        {
          title: { fa: "بررسی اسناد و کنترل‌های داخلی", en: "Review Documents and Internal Controls" },
          description: {
            fa: "اسناد حسابداری، فرآیندهای تأیید و کنترل‌های داخلی موجود بررسی می‌شود.",
            en: "We review accounting records, approval workflows, and existing internal controls.",
          },
        },
        {
          title: { fa: "تهیه گزارش حسابرسی", en: "Prepare the Audit Report" },
          description: {
            fa: "گزارش حسابرسی مستقل مطابق استانداردهای حسابرسی ایران تنظیم می‌شود.",
            en: "An independent audit report is prepared in accordance with Iranian auditing standards.",
          },
        },
        {
          title: { fa: "ارائه پیشنهادهای اصلاحی", en: "Deliver Improvement Recommendations" },
          description: {
            fa: "فهرستی از نقاط قابل بهبود در کنترل داخلی، همراه با راهکار اجرایی ارائه می‌شود.",
            en: "You receive a list of internal-control improvement points, each with a practical action plan.",
          },
        },
      ],
      industries: [
        { fa: "شرکت‌های در حال افزایش سرمایه", en: "Companies Raising Capital" },
        { fa: "هلدینگ‌ها و گروه‌های شرکتی", en: "Holdings & Corporate Groups" },
        { fa: "تولیدی‌های بزرگ و متوسط", en: "Mid-to-Large Manufacturers" },
      ],
      faq: [
        {
          question: { fa: "حسابرسی صورت‌های مالی برای چه شرکت‌هایی الزامی است؟", en: "Which companies are required to have their financial statements audited?" },
          answer: {
            fa: "بر اساس مقررات، شرکت‌های سهامی عام، شرکت‌های بالای سقف معینی از سرمایه یا فروش، و شرکت‌های متقاضی افزایش سرمایه یا پذیرش در بورس، ملزم به حسابرسی مستقل هستند. برای بسیاری از شرکت‌های دیگر نیز حسابرسی داوطلبانه، اعتبار قابل توجهی نزد بانک و سرمایه‌گذار ایجاد می‌کند.",
            en: "Under the regulations, public joint-stock companies, companies above a certain capital or revenue threshold, and companies seeking a capital increase or a stock exchange listing are required to have an independent audit. For many other companies, a voluntary audit also builds significant credibility with banks and investors.",
          },
        },
        {
          question: { fa: "تفاوت حسابرسی مستقل و بازرسی قانونی چیست؟", en: "What's the difference between an independent audit and a statutory inspector?" },
          answer: {
            fa: "بازرس قانونی، عضوی از ارکان شرکت است که وظایف نظارتی مشخصی طبق قانون تجارت دارد؛ حسابرس مستقل اما صورت‌های مالی را از دیدگاهی حرفه‌ای و بی‌طرف بررسی و درباره انطباق آن با استانداردهای حسابداری اظهارنظر می‌کند. در بسیاری از شرکت‌ها این دو نقش هم‌زمان ایفا می‌شود.",
            en: "A statutory inspector is a company body with defined oversight duties under the Commercial Code, while an independent auditor reviews financial statements from a professional, impartial standpoint and gives an opinion on their compliance with accounting standards. In many companies, both roles are filled at the same time.",
          },
        },
        {
          question: { fa: "هزینه حسابرسی چگونه تعیین می‌شود؟", en: "How is the audit fee determined?" },
          answer: {
            fa: "هزینه بر اساس حجم صورت‌های مالی، تعداد شعب یا انبارها، و پیچیدگی فعالیت شرکت متغیر است. پس از بررسی اولیه رایگان صورت‌های مالی، برآورد شفاف قیمت ارائه می‌شود.",
            en: "The fee varies based on the size of your financial statements, the number of branches or warehouses, and how complex your company's operations are. After a free initial review of your financial statements, we provide a clear price estimate.",
          },
        },
      ],
      relatedSlugs: ["accounting", "tax-consulting", "financial-consulting"],
      offerings: [
        {
          fa: "حسابرسی مستقل صورت‌های مالی",
          en: "Independent financial statement audit",
        },
        {
          fa: "حسابرسی مالیاتی",
          en: "Tax audit",
        },
        {
          fa: "حسابرسی داخلی",
          en: "Internal audit",
        },
        {
          fa: "حسابرسی عملیاتی",
          en: "Operational audit",
        },
        {
          fa: "حسابرسی ویژه (تقلب و بررسی موردی)",
          en: "Special audit (fraud investigation and case review)",
        },
        {
          fa: "بازرسی قانونی شرکت‌ها (بازرس اصلی و علی‌البدل)",
          en: "Statutory inspection (principal and alternate inspector)",
        },
        {
          fa: "حسابرسی سیستم‌های اطلاعاتی (IT Audit)",
          en: "IT systems audit",
        },
        {
          fa: "خدمات اطمینان‌بخشی (Assurance)",
          en: "Assurance services",
        },
      ],
    },
    {
      slug: "financial-consulting",
      navLabel: { fa: "مشاوره مالی و مدیریتی", en: "Financial & Management Consulting" },
      title: {
        fa: "مشاوره مالی و مدیریتی؛ تصمیم‌های کسب‌وکار را با عدد و تحلیل بگیرید، نه حدس",
        en: "Financial & Management Consulting: Make Business Decisions on Numbers, Not Guesses",
      },
      eyebrow: { fa: "مشاوره مالی و مدیریتی", en: "Financial & Management Consulting" },
      metaDescription: {
        fa: "تهیه طرح توجیهی، بودجه‌بندی، تحلیل صورت‌های مالی، ارزش‌گذاری شرکت و خدمات مدیر مالی برون‌سپاری‌شده (CFO)؛ برای تصمیم‌های مالی مبتنی بر داده.",
        en: "Business plans, budgeting, financial statement analysis, company valuation, and outsourced CFO services — for financial decisions grounded in data.",
      },
      heroDescription: {
        fa: "خیلی از تصمیم‌های مهم کسب‌وکار - جذب سرمایه، قیمت‌گذاری، توسعه یا کاهش هزینه - بدون تحلیل مالی درست گرفته می‌شوند. مالی‌بان با ابزار و تجربه یک تیم مالی حرفه‌ای، این تصمیم‌ها را برایتان روشن می‌کند.",
        en: "Many of the biggest business decisions — raising capital, pricing, expansion, or cutting costs — get made without proper financial analysis. Malibaan brings the tools and experience of a professional finance team to make these decisions clear for you.",
      },
      benefits: [
        {
          title: { fa: "تحلیل مبتنی بر عدد، نه احساس", en: "Analysis Based on Numbers, Not Gut Feeling" },
          description: {
            fa: "هر توصیه ما بر اساس صورت‌های مالی واقعی، نسبت‌های مالی و مقایسه با استانداردهای صنعت است، نه حدس یا تجربه شخصی.",
            en: "Every recommendation we make is based on your actual financial statements, financial ratios, and comparison against industry benchmarks — not guesswork or personal opinion.",
          },
        },
        {
          title: { fa: "مدیر مالی بدون هزینه استخدام تمام‌وقت", en: "A CFO Without the Cost of a Full-Time Hire" },
          description: {
            fa: "با خدمت مدیر مالی برون‌سپاری‌شده (Outsourced CFO)، کسب‌وکار شما به سطح مشاوره مالی مدیرعامل‌سطح دسترسی دارد، بدون هزینه و تعهد استخدام یک نیروی ثابت.",
            en: "With our outsourced CFO service, your business gets executive-level financial advice without the cost and commitment of hiring a full-time employee.",
          },
        },
        {
          title: { fa: "آماده برای جلسه با سرمایه‌گذار یا بانک", en: "Ready for a Meeting With an Investor or Bank" },
          description: {
            fa: "طرح توجیهی، گزارش‌های مدیریتی و مدل مالی را طوری آماده می‌کنیم که در جلسه با سرمایه‌گذار، بانک یا هیئت‌مدیره قابل دفاع باشد.",
            en: "We prepare your business plan, management reports, and financial model so they hold up in a meeting with an investor, a bank, or your board.",
          },
        },
      ],
      problems: [
        {
          fa: "تصمیم به جذب سرمایه یا وام گرفته‌اید، اما مدل مالی قابل ارائه‌ای ندارید",
          en: "You've decided to raise capital or take out a loan, but you don't have a presentable financial model",
        },
        {
          fa: "نمی‌دانید کدام محصول یا بخش کسب‌وکار واقعاً سودآور است",
          en: "You don't know which product or business unit is actually profitable",
        },
        {
          fa: "بودجه سالانه وجود ندارد یا هیچ‌وقت با عملکرد واقعی مقایسه نمی‌شود",
          en: "There's no annual budget, or it's never compared against actual performance",
        },
        {
          fa: "برای ادغام، فروش سهام یا ارزش‌گذاری شرکت، تحلیل مالی مستقلی در اختیار ندارید",
          en: "You don't have an independent financial analysis for a merger, a share sale, or a company valuation",
        },
      ],
      process: [
        {
          title: { fa: "بررسی وضعیت مالی فعلی", en: "Review Your Current Financial Position" },
          description: {
            fa: "صورت‌های مالی، ساختار هزینه و مدل درآمدی کسب‌وکار شما را تحلیل می‌کنیم.",
            en: "We analyze your financial statements, cost structure, and revenue model.",
          },
        },
        {
          title: { fa: "تعیین هدف و سؤال کلیدی", en: "Define the Goal and the Key Question" },
          description: {
            fa: "مشخص می‌کنیم این مشاوره برای چه تصمیمی است: جذب سرمایه، کاهش هزینه، قیمت‌گذاری یا ارزش‌گذاری.",
            en: "We pin down exactly what decision this consulting is for: raising capital, cutting costs, pricing, or valuation.",
          },
        },
        {
          title: { fa: "تهیه مدل و گزارش مالی", en: "Build the Financial Model and Report" },
          description: {
            fa: "بر اساس هدف، مدل مالی، طرح توجیهی یا گزارش تحلیلی مناسب را آماده می‌کنیم.",
            en: "Based on the goal, we prepare the right financial model, business plan, or analytical report.",
          },
        },
        {
          title: { fa: "همراهی در جلسه تصمیم‌گیری", en: "Support You in the Decision Meeting" },
          description: {
            fa: "در جلسه با هیئت‌مدیره، بانک یا سرمایه‌گذار، در صورت نیاز، در کنار شما حضور داریم یا مستندات را برای دفاع آماده می‌کنیم.",
            en: "If needed, we join you in the meeting with your board, bank, or investor, or prepare the documentation for you to present.",
          },
        },
      ],
      industries: [
        { fa: "استارتاپ‌های در حال جذب سرمایه", en: "Startups Raising Capital" },
        { fa: "شرکت‌های در حال رشد و توسعه", en: "Growing & Expanding Companies" },
        { fa: "هلدینگ‌ها و گروه‌های شرکتی", en: "Holdings & Corporate Groups" },
        { fa: "کسب‌وکارهای خانوادگی در حال واگذاری مدیریت", en: "Family Businesses in Management Transition" },
      ],
      faq: [
        {
          question: { fa: "مدیر مالی برون‌سپاری‌شده (Outsourced CFO) دقیقاً چه کاری انجام می‌دهد؟", en: "What exactly does an outsourced CFO do?" },
          answer: {
            fa: "این خدمت به‌صورت دوره‌ای یا پروژه‌ای، تحلیل مالی، بودجه‌بندی، گزارش‌دهی مدیریتی و مشاوره تصمیم‌های مالی کلان را بدون نیاز به استخدام یک مدیر مالی تمام‌وقت در اختیار کسب‌وکار شما قرار می‌دهد.",
            en: "On a periodic or project basis, this service gives your business financial analysis, budgeting, management reporting, and advice on major financial decisions — without needing to hire a full-time CFO.",
          },
        },
        {
          question: { fa: "برای جذب سرمایه‌گذار، مالی‌بان چه کمکی می‌کند؟", en: "How does Malibaan help with raising investment?" },
          answer: {
            fa: "طرح توجیهی، مدل مالی و پیش‌بینی جریان نقدی را آماده می‌کنیم و در صورت نیاز، در تحلیل پیشنهاد سرمایه‌گذار یا جلسات مذاکره نیز مشاوره می‌دهیم.",
            en: "We prepare your business plan, financial model, and cash flow forecast, and if needed, we also advise on analyzing an investor's offer or on negotiation meetings.",
          },
        },
        {
          question: { fa: "آیا این خدمت فقط برای شرکت‌های بزرگ است؟", en: "Is this service only for large companies?" },
          answer: {
            fa: "خیر. بسیاری از کسب‌وکارهای کوچک و متوسط هم برای تصمیم‌هایی مثل قیمت‌گذاری یا تحلیل سودآوری محصول به این تحلیل نیاز دارند؛ خدمات را متناسب با اندازه کسب‌وکار شما تنظیم می‌کنیم.",
            en: "No. Many small and medium businesses also need this kind of analysis for decisions like pricing or product profitability — we scale the service to fit the size of your business.",
          },
        },
      ],
      relatedSlugs: ["accounting", "audit"],
      offerings: [
        {
          fa: "تهیه طرح توجیهی و امکان‌سنجی (Business Plan)",
          en: "Business plan and feasibility studies",
        },
        {
          fa: "بودجه‌بندی و کنترل بودجه",
          en: "Budgeting and budget control",
        },
        {
          fa: "تحلیل صورت‌های مالی و نسبت‌های مالی",
          en: "Financial statement and ratio analysis",
        },
        {
          fa: "مشاوره سرمایه‌گذاری و ارزش‌گذاری شرکت",
          en: "Investment consulting and company valuation",
        },
        {
          fa: "برنامه‌ریزی مالیاتی و مالی بلندمدت",
          en: "Long-term tax and financial planning",
        },
        {
          fa: "مشاوره ادغام و اکتساب (M&A)",
          en: "M&A consulting",
        },
        {
          fa: "تهیه گزارش‌های مدیریتی برای هیئت‌مدیره/سرمایه‌گذار",
          en: "Management reports for the board/investors",
        },
        {
          fa: "خدمات مدیر مالی برون‌سپاری‌شده (Outsourced CFO)",
          en: "Outsourced CFO services",
        },
      ],
    },
    {
      slug: "business-legal",
      navLabel: { fa: "خدمات حقوقی کسب‌وکار", en: "Business Legal Services" },
      title: {
        fa: "قراردادها و دعاوی کسب‌وکار را با اطمینان حقوقی مدیریت کنید",
        en: "Manage Business Contracts and Disputes With Legal Confidence",
      },
      eyebrow: { fa: "خدمات حقوقی کسب‌وکار", en: "Business Legal Services" },
      metaDescription: {
        fa: "تنظیم و بررسی قراردادهای تجاری و کاری، مشاوره حقوقی تجاری و پیگیری دعاوی و شکایات ثبتی؛ خدمات حقوقی مکمل حسابداری و مالیات برای کسب‌وکار شما.",
        en: "Drafting and reviewing commercial and employment contracts, business legal consulting, and following up on registration-related claims and disputes — legal services that complement accounting and tax for your business.",
      },
      heroDescription: {
        fa: "خیلی از دعاوی و خسارت‌های کسب‌وکار، ریشه در یک قرارداد ضعیف یا نبود مشاوره حقوقی به‌موقع دارند. مالی‌بان در کنار خدمات مالی، پشتیبانی حقوقی لازم برای قراردادها و دعاوی تجاری را هم فراهم می‌کند.",
        en: "Many business disputes and losses trace back to a weak contract or a lack of timely legal advice. Alongside its financial services, Malibaan also provides the legal support your business needs for contracts and commercial disputes.",
      },
      benefits: [
        {
          title: { fa: "قراردادی که در دادگاه هم از شما دفاع می‌کند", en: "A Contract That Holds Up in Court" },
          description: {
            fa: "قراردادهای تجاری و کاری را طوری تنظیم یا بازبینی می‌کنیم که در صورت اختلاف، منافع کسب‌وکار شما را واقعاً پوشش دهد.",
            en: "We draft or review your commercial and employment contracts so that, if a dispute arises, they actually protect your business's interests.",
          },
        },
        {
          title: { fa: "مشاوره پیش از تصمیم، نه بعد از دعوا", en: "Advice Before the Decision, Not After the Dispute" },
          description: {
            fa: "پیش از امضای قرارداد، ورود شریک جدید یا تغییرات ساختاری، ریسک‌های حقوقی احتمالی را بررسی می‌کنیم.",
            en: "Before you sign a contract, bring on a new partner, or make structural changes, we review the potential legal risks.",
          },
        },
        {
          title: { fa: "پیگیری هماهنگ با پرونده مالی و مالیاتی", en: "Advice Coordinated With Your Financial and Tax File" },
          description: {
            fa: "چون تیم ما هم‌زمان بر پرونده مالی و مالیاتی شما هم اشراف دارد، مشاوره حقوقی هماهنگ با واقعیت مالی کسب‌وکارتان ارائه می‌شود.",
            en: "Because our team also has full visibility into your financial and tax file, our legal advice stays grounded in your business's actual financial reality.",
          },
        },
      ],
      problems: [
        {
          fa: "قراردادی بدون بررسی حقوقی امضا شده و بعداً محل اختلاف شده است",
          en: "A contract signed without legal review that later became a source of dispute",
        },
        {
          fa: "برای قرارداد کار با کارکنان یا پیمانکاران، از الگوی استاندارد و قانونی استفاده نمی‌شود",
          en: "Employment or contractor agreements that don't follow a standard, legally sound template",
        },
        {
          fa: "دعوا یا شکایت ثبتی مطرح شده و پیگیری آن نامشخص است",
          en: "A registration-related dispute or claim has been filed and how to pursue it is unclear",
        },
        {
          fa: "برای مذاکره یا تغییرات ساختاری شرکا، مشاوره حقوقی مستقلی در اختیار نیست",
          en: "No independent legal advice available for negotiations or changes to the partnership structure",
        },
      ],
      process: [
        {
          title: { fa: "بررسی وضعیت یا سند موجود", en: "Review the Existing Situation or Document" },
          description: {
            fa: "قرارداد، دعوا یا موضوع حقوقی مطرح‌شده را بررسی و ریسک‌های آن را شناسایی می‌کنیم.",
            en: "We review the contract, dispute, or legal matter at hand and identify its risks.",
          },
        },
        {
          title: { fa: "تدوین یا اصلاح سند حقوقی", en: "Draft or Revise the Legal Document" },
          description: {
            fa: "قرارداد یا لایحه مورد نیاز را مطابق قوانین جاری و با در نظر گرفتن منافع کسب‌وکار شما تنظیم می‌کنیم.",
            en: "We draft the required contract or brief in line with current law and your business's interests.",
          },
        },
        {
          title: { fa: "مذاکره یا پیگیری قانونی", en: "Negotiate or Pursue Legal Action" },
          description: {
            fa: "در صورت نیاز، در مذاکره با طرف مقابل یا پیگیری پرونده در مراجع ذی‌صلاح کنار شما هستیم.",
            en: "If needed, we stand with you in negotiations with the other party or in pursuing the case before the relevant authorities.",
          },
        },
        {
          title: { fa: "جمع‌بندی و مستندسازی", en: "Wrap Up and Document" },
          description: {
            fa: "نتیجه نهایی و مستندات مربوطه را به‌گونه‌ای مستند می‌کنیم که در آینده قابل استناد باشد.",
            en: "We document the final outcome and related records so they can be relied on in the future.",
          },
        },
      ],
      industries: [
        { fa: "شرکت‌های در حال قرارداد با شرکای تجاری جدید", en: "Companies Contracting With New Business Partners" },
        { fa: "کسب‌وکارهای با نیروی انسانی زیاد", en: "Businesses With Large Workforces" },
        { fa: "شرکت‌های در حال دعوای ثبتی یا قراردادی", en: "Companies in Registration or Contractual Disputes" },
        { fa: "استارتاپ‌ها در مذاکره با سرمایه‌گذار", en: "Startups Negotiating With Investors" },
      ],
      faq: [
        {
          question: { fa: "آیا این خدمت جایگزین وکیل دادگستری است؟", en: "Does this service replace a licensed attorney?" },
          answer: {
            fa: "برای مشاوره تجاری و تنظیم قرارداد، تیم ما مستقیماً همراه شماست؛ در پرونده‌های قضایی که نیاز به وکالت رسمی دادگستری دارند، با وکلای همکار خود هماهنگ می‌کنیم تا مسیر یکپارچه‌ای برای شما شکل بگیرد.",
            en: "For commercial advice and contract drafting, our team works directly alongside you; for court cases that require formal representation by a licensed attorney, we coordinate with our partner lawyers so you get a seamless path forward.",
          },
        },
        {
          question: { fa: "برای تنظیم قرارداد کار با کارکنان، چه نکاتی بررسی می‌شود؟", en: "What gets reviewed when drafting an employment contract?" },
          answer: {
            fa: "مواردی مثل نوع قرارداد (موقت یا دائم)، ساعت کاری، حقوق و مزایا و شرایط فسخ را مطابق قانون کار و متناسب با نیاز واقعی کسب‌وکار شما تنظیم می‌کنیم تا در آینده محل اختلاف نشود.",
            en: "Items like contract type (fixed-term or permanent), working hours, pay and benefits, and termination terms are drafted in line with labor law and your business's actual needs, so they don't become a source of dispute later.",
          },
        },
        {
          question: { fa: "پیگیری دعاوی ثبتی معمولاً چقدر طول می‌کشد؟", en: "How long does pursuing a registration-related dispute usually take?" },
          answer: {
            fa: "بسته به نوع دعوا (مثلاً اعتراض ثبتی یا اختلاف قراردادی) و حجم مراحل اداری یا قضایی، از چند هفته تا چند ماه متغیر است؛ در همان جلسه اول، برآورد واقعی زمان را ارائه می‌کنیم.",
            en: "Depending on the type of dispute — such as a registration objection or a contractual disagreement — and how many administrative or judicial steps are involved, it ranges from a few weeks to several months; we give you a realistic time estimate at our very first meeting.",
          },
        },
      ],
      relatedSlugs: ["company-registration", "intellectual-property"],
      offerings: [
        {
          fa: "تنظیم و بررسی قراردادها",
          en: "Drafting and reviewing contracts",
        },
        {
          fa: "مشاوره حقوقی تجاری",
          en: "Commercial legal consulting",
        },
        {
          fa: "پیگیری دعاوی و شکایات ثبتی",
          en: "Following up on registration-related claims and disputes",
        },
        {
          fa: "تنظیم قراردادهای کار",
          en: "Drafting employment contracts",
        },
      ],
    },
    {
      slug: "digital-fintech",
      navLabel: { fa: "خدمات دیجیتال و فناوری مالی", en: "Digital & Fintech Services" },
      title: {
        fa: "حسابداری آنلاین و گزارش‌گیری لحظه‌ای؛ مالی کسب‌وکار شما در یک داشبورد",
        en: "Online Accounting and Real-Time Reporting: Your Business Finances in One Dashboard",
      },
      eyebrow: { fa: "خدمات دیجیتال و فناوری مالی", en: "Digital & Fintech Services" },
      metaDescription: {
        fa: "پیاده‌سازی نرم‌افزار حسابداری آنلاین، داشبورد گزارش‌گیری، صدور خودکار فاکتور الکترونیک و اتصال به درگاه‌های پرداخت و بانک؛ برای مدیریت مالی دیجیتال کسب‌وکار.",
        en: "Online accounting software implementation, reporting dashboards, automated e-invoice issuance, and integration with payment gateways and banks — for digital financial management of your business.",
      },
      heroDescription: {
        fa: "دیگر لازم نیست برای دیدن وضعیت مالی کسب‌وکارتان منتظر گزارش ماهانه بمانید. مالی‌بان با ابزارهای دیجیتال حسابداری، وضعیت مالی شما را در یک داشبورد آنلاین، همیشه در دسترس نگه می‌دارد.",
        en: "You no longer need to wait for a monthly report to see your business's financial position. With digital accounting tools, Malibaan keeps your financial status available, always, in one online dashboard.",
      },
      benefits: [
        {
          title: { fa: "گزارش مالی، نه فقط در پایان ماه", en: "Financial Reporting, Not Just at Month-End" },
          description: {
            fa: "با داشبورد آنلاین، وضعیت فروش، هزینه و نقدینگی کسب‌وکارتان را هر زمان که بخواهید می‌بینید، نه فقط در گزارش ماهانه.",
            en: "With an online dashboard, you see your business's sales, expenses, and cash position whenever you want — not just in a monthly report.",
          },
        },
        {
          title: { fa: "صدور خودکار فاکتور الکترونیک", en: "Automated E-Invoice Issuance" },
          description: {
            fa: "فرآیند صدور فاکتور و ثبت آن در سامانه مودیان را به‌صورت خودکار و بدون کار دستی تکراری انجام می‌دهیم.",
            en: "We automate the process of issuing invoices and registering them in the e-invoicing system, eliminating repetitive manual work.",
          },
        },
        {
          title: { fa: "اتصال مستقیم به بانک و درگاه پرداخت", en: "Direct Connection to Your Bank and Payment Gateway" },
          description: {
            fa: "با یکپارچه‌سازی حساب بانکی و درگاه‌های پرداخت با نرم‌افزار حسابداری، تراکنش‌ها بدون ورود دستی و با خطای کمتر ثبت می‌شوند.",
            en: "By integrating your bank account and payment gateways with your accounting software, transactions get recorded without manual entry and with fewer errors.",
          },
        },
      ],
      problems: [
        {
          fa: "ثبت اسناد و فاکتورها هنوز کاملاً دستی و وقت‌گیر است",
          en: "Recording documents and invoices is still entirely manual and time-consuming",
        },
        {
          fa: "برای دیدن وضعیت مالی کسب‌وکار، باید منتظر گزارش حسابدار در پایان ماه بمانید",
          en: "You have to wait for your accountant's month-end report to see your business's financial position",
        },
        {
          fa: "نرم‌افزار حسابداری موجود با نیازهای واقعی کسب‌وکار هماهنگ نیست",
          en: "Your existing accounting software doesn't match your business's actual needs",
        },
        {
          fa: "تطبیق تراکنش‌های بانکی با دفاتر حسابداری هر ماه به یک پروژه پرخطا تبدیل می‌شود",
          en: "Reconciling bank transactions with your books turns into an error-prone project every month",
        },
      ],
      process: [
        {
          title: { fa: "ارزیابی فرآیند فعلی", en: "Assess the Current Process" },
          description: {
            fa: "روش ثبت اسناد، صدور فاکتور و گزارش‌گیری فعلی کسب‌وکار شما را بررسی می‌کنیم.",
            en: "We review how your business currently records transactions, issues invoices, and generates reports.",
          },
        },
        {
          title: { fa: "انتخاب و پیاده‌سازی ابزار مناسب", en: "Choose and Implement the Right Tool" },
          description: {
            fa: "متناسب با اندازه و نوع فعالیت شما، نرم‌افزار یا پلتفرم حسابداری آنلاین مناسب را پیاده‌سازی می‌کنیم.",
            en: "We implement the online accounting software or platform that fits your business's size and type of activity.",
          },
        },
        {
          title: { fa: "اتصال بانک، درگاه پرداخت و سامانه مودیان", en: "Connect Your Bank, Payment Gateway, and E-Invoicing System" },
          description: {
            fa: "حساب‌های بانکی، درگاه‌های پرداخت و سامانه صدور فاکتور الکترونیک را به سیستم متصل می‌کنیم.",
            en: "We connect your bank accounts, payment gateways, and e-invoicing system to the platform.",
          },
        },
        {
          title: { fa: "آموزش تیم و پشتیبانی مستمر", en: "Train Your Team and Provide Ongoing Support" },
          description: {
            fa: "تیم داخلی شما را برای کار با داشبورد و ابزارهای جدید آموزش می‌دهیم و پشتیبانی فنی و حسابداری را ادامه می‌دهیم.",
            en: "We train your in-house team on the new dashboard and tools, and continue providing technical and accounting support.",
          },
        },
      ],
      industries: [
        { fa: "فروشگاه‌های اینترنتی", en: "Online Stores" },
        { fa: "استارتاپ‌ها و کسب‌وکارهای دیجیتال", en: "Startups & Digital Businesses" },
        { fa: "کسب‌وکارهای با حجم بالای تراکنش روزانه", en: "Businesses With High Daily Transaction Volume" },
        { fa: "کسب‌وکارهای چندشعبه‌ای", en: "Multi-Branch Businesses" },
      ],
      faq: [
        {
          question: { fa: "آیا نیاز است نرم‌افزار حسابداری فعلی‌مان را کنار بگذاریم؟", en: "Do we need to abandon our current accounting software?" },
          answer: {
            fa: "لزوماً نه. ابتدا نرم‌افزار فعلی شما را بررسی می‌کنیم؛ اگر قابل یکپارچه‌سازی و توسعه باشد، همان را بهینه می‌کنیم؛ در غیر این صورت، جایگزین مناسب‌تری پیشنهاد می‌دهیم.",
            en: "Not necessarily. We first review your current software; if it can be integrated and extended, we optimize what you already have. If not, we recommend a better-suited replacement.",
          },
        },
        {
          question: { fa: "داشبورد گزارش‌گیری آنلاین چه اطلاعاتی نشان می‌دهد؟", en: "What information does the online reporting dashboard show?" },
          answer: {
            fa: "بسته به نیاز شما، معمولاً شامل وضعیت فروش، هزینه‌ها، نقدینگی، مانده حساب‌های دریافتنی و پرداختنی و روند مالیاتی است؛ به‌صورت آنلاین و همیشه به‌روز.",
            en: "Depending on your needs, it typically covers sales, expenses, cash position, receivables and payables balances, and your tax status — online, and always up to date.",
          },
        },
        {
          question: { fa: "امنیت اطلاعات مالی در این ابزارهای آنلاین چگونه تضمین می‌شود؟", en: "How is financial data secured in these online tools?" },
          answer: {
            fa: "از پلتفرم‌ها و ابزارهای معتبر با دسترسی کنترل‌شده استفاده می‌کنیم و دسترسی به داشبورد مالی شما محدود به افراد مجاز در کسب‌وکارتان و کارشناس مسئول پرونده است.",
            en: "We use reputable platforms and tools with controlled access, and access to your financial dashboard is limited to authorized people in your business and the expert responsible for your file.",
          },
        },
      ],
      relatedSlugs: ["accounting", "vat"],
      offerings: [
        {
          fa: "نرم‌افزار/پلتفرم حسابداری آنلاین",
          en: "Online accounting software/platform",
        },
        {
          fa: "داشبورد گزارش‌گیری آنلاین برای مشتری",
          en: "Online reporting dashboard for clients",
        },
        {
          fa: "اتوماسیون صدور فاکتور و فاکتور الکترونیک",
          en: "Invoice and e-invoice issuance automation",
        },
        {
          fa: "یکپارچه‌سازی با درگاه‌های پرداخت و بانک",
          en: "Integration with payment gateways and banks",
        },
      ],
    },
    {
      slug: "company-registration",
      navLabel: { fa: "ثبت شرکت و برند", en: "Company & Trademark Registration" },
      title: {
        fa: "ثبت شرکت و برند تجاری، اصولی و بدون رفت‌وآمد اداری",
        en: "Company and Trademark Registration, Done Right Without the Bureaucratic Runaround",
      },
      eyebrow: { fa: "ثبت شرکت و برند", en: "Company & Trademark Registration" },
      metaDescription: {
        fa: "ثبت شرکت سهامی خاص و مسئولیت محدود، تنظیم اساسنامه، درج در روزنامه رسمی و ثبت برند تجاری با مشاوره مالی‌بان؛ سریع، قانونی و بدون رد شدن مدارک.",
        en: "Registering private joint-stock and limited liability companies, drafting articles of association, publishing in the Official Gazette, and trademark registration with Malibaan's guidance — fast, legal, and without rejected paperwork.",
      },
      heroDescription: {
        fa: "از انتخاب نوع مناسب شرکت تا درج در روزنامه رسمی و ثبت برند تجاری، مالی‌بان تمام مراحل قانونی راه‌اندازی کسب‌وکار شما را با دقت یک وکیل و سرعت یک تیم اجرایی مدیریت می‌کند.",
        en: "From choosing the right company type to publishing in the Official Gazette and registering your trademark, Malibaan manages every legal step of launching your business with a lawyer's precision and an execution team's speed.",
      },
      benefits: [
        {
          title: { fa: "انتخاب نوع شرکت متناسب با هدف شما", en: "Choosing the Company Type That Fits Your Goal" },
          description: {
            fa: "تفاوت سهامی خاص، مسئولیت محدود و تعاونی را بر اساس نوع فعالیت، تعداد شرکا و برنامه رشد شما بررسی می‌کنیم تا از ابتدا مسیر درست را انتخاب کنید.",
            en: "We walk you through the differences between a private joint-stock company, a limited liability company, and a cooperative based on your line of business, number of partners, and growth plans — so you choose the right path from the start.",
          },
        },
        {
          title: { fa: "تنظیم اساسنامه و مدارک بدون ایراد ثبتی", en: "Articles of Association and Paperwork Without Registration Snags" },
          description: {
            fa: "بیشتر تأخیرهای ثبت شرکت به‌خاطر مدارک ناقص یا اساسنامه غیراستاندارد است؛ ما مدارک را طوری آماده می‌کنیم که در اولین بررسی کارشناس اداره ثبت تأیید شود.",
            en: "Most company registration delays come from incomplete paperwork or non-standard articles of association; we prepare your documents so they're approved on the registrar's first review.",
          },
        },
        {
          title: { fa: "ثبت برند هم‌زمان با تأسیس شرکت", en: "Registering Your Trademark Alongside Company Formation" },
          description: {
            fa: "اگر نام یا لوگوی کسب‌وکارتان را همان ابتدا ثبت نکنید، ممکن است رقیبی زودتر آن را به نام خود بزند. ثبت برند را از روز اول در برنامه قرار می‌دهیم.",
            en: "If you don't register your business's name or logo right away, a competitor might register it first. We put trademark registration on the agenda from day one.",
          },
        },
      ],
      problems: [
        {
          fa: "رد شدن مدارک در اداره ثبت شرکت‌ها به‌دلیل نقص اساسنامه یا اظهارنامه",
          en: "Paperwork rejected by the Companies Registration Office over incomplete articles of association or the registration statement",
        },
        {
          fa: "انتخاب نوع شرکت نامناسب که بعداً هزینه مالیاتی یا مسئولیتی ایجاد می‌کند",
          en: "Choosing the wrong company type, which later creates a tax or liability cost",
        },
        {
          fa: "ثبت‌نشدن برند تجاری و ریسک استفاده رقبا از همان نام یا لوگو",
          en: "An unregistered trademark, risking a competitor using the same name or logo",
        },
        {
          fa: "سردرگمی در دریافت کد اقتصادی و کد شناسه ملی پس از ثبت",
          en: "Confusion over obtaining the economic code and national ID number after registration",
        },
      ],
      process: [
        {
          title: { fa: "مشاوره انتخاب نوع شرکت", en: "Choose the Right Company Type" },
          description: {
            fa: "بر اساس فعالیت، شرکا و برنامه رشد، بهترین قالب حقوقی (سهامی خاص، مسئولیت محدود یا تعاونی) را پیشنهاد می‌دهیم.",
            en: "Based on your activity, partners, and growth plans, we recommend the best legal form — private joint-stock, limited liability, or cooperative.",
          },
        },
        {
          title: { fa: "تهیه اساسنامه و اظهارنامه", en: "Prepare the Articles of Association and Registration Statement" },
          description: {
            fa: "تمام مدارک لازم را مطابق آخرین دستورالعمل اداره ثبت شرکت‌ها آماده و امضا می‌کنیم.",
            en: "We prepare and sign all required documents according to the Companies Registration Office's latest directives.",
          },
        },
        {
          title: { fa: "ثبت در سامانه و درج در روزنامه رسمی", en: "Register on the System and Publish in the Official Gazette" },
          description: {
            fa: "پرونده را در سامانه اداره ثبت شرکت‌ها ثبت و پیگیری می‌کنیم تا آگهی تأسیس در روزنامه رسمی منتشر شود.",
            en: "We file and follow up your case in the Companies Registration Office system until your formation notice is published in the Official Gazette.",
          },
        },
        {
          title: { fa: "اخذ کد اقتصادی و ثبت برند", en: "Obtain the Economic Code and Register Your Trademark" },
          description: {
            fa: "پس از تأسیس، کد اقتصادی را دریافت و در صورت نیاز، فرآیند ثبت برند تجاری را هم‌زمان پیش می‌بریم.",
            en: "After formation, we obtain your economic code and, if needed, run the trademark registration process in parallel.",
          },
        },
      ],
      industries: [
        { fa: "استارتاپ‌ها و کسب‌وکارهای دیجیتال", en: "Startups & Digital Businesses" },
        { fa: "واردات و صادرات", en: "Import & Export" },
        { fa: "تولیدی و صنعتی", en: "Manufacturing & Industrial" },
        { fa: "فروشگاه‌های اینترنتی", en: "Online Stores" },
      ],
      faq: [
        {
          question: { fa: "تفاوت شرکت سهامی خاص و مسئولیت محدود در چیست؟", en: "What's the difference between a private joint-stock company and a limited liability company?" },
          answer: {
            fa: "در شرکت سهامی خاص، سرمایه به سهام تقسیم می‌شود و حداقل سه سهامدار و دو بازرس نیاز است؛ مناسب کسب‌وکارهایی با برنامه افزایش سرمایه یا پذیرش سرمایه‌گذار. در مسئولیت محدود، سرمایه به‌صورت سهم‌الشرکه بین حداقل دو نفر تقسیم می‌شود و تشریفات اداری ساده‌تری دارد. ما بر اساس ساختار و اهداف شما پیشنهاد می‌دهیم.",
            en: "In a private joint-stock company, capital is divided into shares, and you need at least three shareholders and two inspectors — suited to businesses planning a capital increase or bringing on investors. In a limited liability company, capital is divided into partnership shares between at least two people, and the paperwork is simpler. We recommend the structure that fits your goals.",
          },
        },
        {
          question: { fa: "ثبت شرکت معمولاً چقدر زمان می‌برد؟", en: "How long does company registration usually take?" },
          answer: {
            fa: "در حالت معمول و با مدارک کامل، از ارسال اظهارنامه تا دریافت آگهی تأسیس در روزنامه رسمی، بین ۱۰ تا ۲۰ روز کاری زمان می‌برد. تأخیرها معمولاً ناشی از نقص مدارک است که با آماده‌سازی دقیق از ابتدا، این ریسک را حذف می‌کنیم.",
            en: "Under normal conditions, with complete paperwork, it takes 10 to 20 business days from filing the registration statement to publication of the formation notice in the Official Gazette. Delays usually come from incomplete paperwork, a risk we eliminate by preparing everything carefully from the start.",
          },
        },
        {
          question: { fa: "آیا می‌توان بعداً نوع شرکت یا میزان سرمایه را تغییر داد؟", en: "Can the company type or capital amount be changed later?" },
          answer: {
            fa: "بله، تغییر نوع شرکت، افزایش سرمایه، تغییر شرکا یا موضوع فعالیت از طریق تنظیم صورتجلسه مجمع و ثبت تغییرات امکان‌پذیر است. این خدمات را نیز به‌صورت جداگانه انجام می‌دهیم.",
            en: "Yes — changing the company type, increasing capital, changing partners, or changing the line of business is possible through a general assembly resolution and registering the amendment. We also handle these services separately.",
          },
        },
        {
          question: { fa: "ثبت برند تجاری چه مدت اعتبار دارد؟", en: "How long is a trademark registration valid?" },
          answer: {
            fa: "ثبت برند (علامت تجاری) در ایران ۱۰ سال اعتبار دارد و پیش از پایان این مدت باید تمدید شود. ما یادآوری تمدید را برای مشتریان مالی‌بان مدیریت می‌کنیم.",
            en: "A trademark registration in Iran is valid for 10 years and must be renewed before it expires. We manage renewal reminders for Malibaan clients.",
          },
        },
      ],
      relatedSlugs: ["accounting", "tax-consulting", "intellectual-property"],
      offerings: [
        {
          fa: "ثبت شرکت (سهامی خاص، سهامی عام، مسئولیت محدود، تضامنی، تعاونی)",
          en: "Company registration (private joint-stock, public joint-stock, limited liability, general partnership, cooperative)",
        },
        {
          fa: "ثبت شعبه و نمایندگی شرکت‌های خارجی",
          en: "Registering branches and agencies of foreign companies",
        },
        {
          fa: "ثبت مؤسسات غیرتجاری",
          en: "Registering non-commercial institutions",
        },
        {
          fa: "ثبت تغییرات شرکت (تغییر نام، موضوع فعالیت، آدرس، سرمایه، مدیران، سهام‌داران)",
          en: "Registering company amendments (name, business activity, address, capital, directors, shareholders)",
        },
        {
          fa: "ثبت صورت‌جلسات مجامع (عادی/فوق‌العاده)",
          en: "Registering general assembly minutes (ordinary/extraordinary)",
        },
        {
          fa: "انحلال و تصفیه شرکت",
          en: "Company dissolution and liquidation",
        },
        {
          fa: "اخذ کد اقتصادی و شناسه ملی",
          en: "Obtaining the economic code and national ID",
        },
        {
          fa: "اخذ کارت بازرگانی (واردات/صادرات)",
          en: "Obtaining an import/export business license",
        },
        {
          fa: "ثبت‌نام در نظام مالیاتی",
          en: "Tax system registration",
        },
        {
          fa: "تنظیم اساسنامه و شرکت‌نامه",
          en: "Drafting articles of association and the partnership deed",
        },
      ],
    },
    {
      slug: "intellectual-property",
      navLabel: { fa: "ثبت برند و مالکیت فکری", en: "Trademark & IP Registration" },
      title: {
        fa: "ثبت برند، اختراع و طرح صنعتی؛ حفاظت قانونی از دارایی فکری کسب‌وکار شما",
        en: "Trademark, Patent, and Industrial Design Registration: Legal Protection for Your Business's Intellectual Property",
      },
      eyebrow: { fa: "مالکیت فکری", en: "Intellectual Property" },
      metaDescription: {
        fa: "ثبت برند و علامت تجاری داخلی و بین‌المللی (مادرید)، ثبت اختراع و طرح صنعتی، استعلام نام و پیگیری حقوقی اعتراض به ثبت برند؛ با مشاوره مالی‌بان.",
        en: "Domestic and international (Madrid System) trademark registration, patent and industrial design registration, name searches, and legal follow-up on trademark opposition — with Malibaan's guidance.",
      },
      heroDescription: {
        fa: "نام، لوگو، اختراع و طرح‌های کسب‌وکار شما دارایی‌اند، نه فقط یک اسم روی تابلو. مالی‌بان از استعلام و ثبت تا دفاع حقوقی در برابر تخلف، مالکیت فکری شما را قانونی و قابل دفاع می‌کند.",
        en: "Your business's name, logo, inventions, and designs are assets — not just a name on a sign. From searches and registration to legal defense against infringement, Malibaan makes your intellectual property legal and defensible.",
      },
      benefits: [
        {
          title: { fa: "استعلام دقیق پیش از ثبت", en: "A Thorough Search Before You Register" },
          description: {
            fa: "پیش از هر اقدام، نام و برند مورد نظرتان را در پایگاه‌های ثبتی داخلی و بین‌المللی بررسی می‌کنیم تا با برندی مشابه یا ثبت‌شده رد نشوید.",
            en: "Before taking any action, we check your desired name and trademark against domestic and international registries, so your application isn't rejected over a similar or already-registered mark.",
          },
        },
        {
          title: { fa: "ثبت بین‌المللی از طریق سیستم مادرید", en: "International Registration Through the Madrid System" },
          description: {
            fa: "اگر قصد صادرات یا فعالیت در بازارهای خارجی دارید، ثبت برند را از طریق پروتکل مادرید در چند کشور هم‌زمان پیگیری می‌کنیم.",
            en: "If you plan to export or operate in foreign markets, we pursue trademark registration in multiple countries at once through the Madrid Protocol.",
          },
        },
        {
          title: { fa: "دفاع در برابر تخلف و اعتراض", en: "Defense Against Infringement and Opposition" },
          description: {
            fa: "اگر رقیبی از برند شما بدون اجازه استفاده کند یا به ثبت برندتان اعتراض شود، تیم ما پرونده را در مراجع ذی‌صلاح پیگیری و از حق مالکیت شما دفاع می‌کند.",
            en: "If a competitor uses your trademark without permission, or your registration faces an opposition, our team pursues the case before the relevant authorities and defends your ownership rights.",
          },
        },
      ],
      problems: [
        {
          fa: "رقیبی زودتر نام یا لوگوی کسب‌وکار شما را به نام خود ثبت کرده است",
          en: "A competitor registered your business's name or logo under their own name first",
        },
        {
          fa: "برند بدون استعلام قبلی ثبت شده و بعداً با اعتراض یا ابطال مواجه شده",
          en: "A trademark registered without a prior search that later faced opposition or cancellation",
        },
        {
          fa: "اختراع یا طرح صنعتی کسب‌وکار بدون ثبت رسمی، در معرض کپی‌برداری است",
          en: "An unregistered invention or industrial design exposed to being copied",
        },
        {
          fa: "ثبت برند بین‌المللی برای صادرات، فرآیندی نامشخص و پیچیده به نظر می‌رسد",
          en: "International trademark registration for exports looking like an unclear, complicated process",
        },
      ],
      process: [
        {
          title: { fa: "استعلام و بررسی اولیه", en: "Search and Initial Review" },
          description: {
            fa: "نام، لوگو یا اختراع مورد نظر شما را در پایگاه‌های ثبتی بررسی می‌کنیم تا از قابل ثبت بودن آن مطمئن شویم.",
            en: "We check your desired name, logo, or invention against the registries to confirm it can be registered.",
          },
        },
        {
          title: { fa: "تنظیم مدارک و اظهارنامه ثبت", en: "Prepare Documents and the Registration Application" },
          description: {
            fa: "مدارک فنی یا طرح مورد نیاز (گواهی اختراع، طرح صنعتی یا اظهارنامه برند) را مطابق استاندارد مرجع ثبت آماده می‌کنیم.",
            en: "We prepare the required technical documents or designs — a patent certificate, industrial design, or trademark application — to the registrar's standard.",
          },
        },
        {
          title: { fa: "پیگیری در اداره مالکیت صنعتی", en: "Follow Up at the Industrial Property Office" },
          description: {
            fa: "روند بررسی، انتشار آگهی و ثبت نهایی را تا صدور گواهی رسمی پیگیری می‌کنیم.",
            en: "We follow the review, publication, and final registration process through to issuance of the official certificate.",
          },
        },
        {
          title: { fa: "تمدید و پایش مستمر", en: "Renewal and Ongoing Monitoring" },
          description: {
            fa: "پس از ثبت، تاریخ تمدید و هرگونه سوءاستفاده احتمالی از برند شما را رصد می‌کنیم.",
            en: "After registration, we track renewal dates and monitor for any potential misuse of your trademark.",
          },
        },
      ],
      industries: [
        { fa: "استارتاپ‌ها و کسب‌وکارهای دیجیتال", en: "Startups & Digital Businesses" },
        { fa: "تولیدکنندگان با برند اختصاصی", en: "Manufacturers With Proprietary Brands" },
        { fa: "صادرکنندگان", en: "Exporters" },
        { fa: "کسب‌وکارهای دانش‌بنیان", en: "Knowledge-Based Businesses" },
      ],
      faq: [
        {
          question: { fa: "ثبت برند چقدر طول می‌کشد؟", en: "How long does trademark registration take?" },
          answer: {
            fa: "با فرض نبود اعتراض، از تنظیم اظهارنامه تا صدور گواهی رسمی برند معمولاً بین شش تا دوازده ماه زمان می‌برد؛ استعلام اولیه پیش از شروع، ریسک اعتراض را تا حد زیادی کاهش می‌دهد.",
            en: "Assuming no opposition, it usually takes six to twelve months from filing the application to issuance of the official trademark certificate; an initial search before you start significantly reduces the risk of opposition.",
          },
        },
        {
          question: { fa: "تفاوت ثبت اختراع و طرح صنعتی چیست؟", en: "What's the difference between a patent and an industrial design registration?" },
          answer: {
            fa: "ثبت اختراع مربوط به یک راه‌حل فنی جدید و کاربردی است، در حالی که طرح صنعتی شکل ظاهری، طرح یا نقش یک محصول را حفاظت می‌کند. بسیاری از محصولات به هر دو نوع حفاظت هم‌زمان نیاز دارند.",
            en: "A patent covers a new, functional technical solution, while an industrial design protects a product's outward shape, pattern, or ornamentation. Many products need both types of protection at once.",
          },
        },
        {
          question: { fa: "اگر کسی از برند ثبت‌شده من بدون اجازه استفاده کند چه باید کرد؟", en: "What should I do if someone uses my registered trademark without permission?" },
          answer: {
            fa: "با ثبت رسمی برند، امکان طرح شکایت حقوقی و کیفری علیه متخلف وجود دارد. تیم ما مستندات لازم را آماده و روند پیگیری قانونی را مدیریت می‌کند.",
            en: "With an officially registered trademark, you can file both civil and criminal complaints against the infringer. Our team prepares the necessary documentation and manages the legal follow-up process.",
          },
        },
      ],
      relatedSlugs: ["company-registration", "business-legal"],
      offerings: [
        {
          fa: "ثبت برند و علامت تجاری (داخلی و بین‌المللی/مادرید)",
          en: "Trademark registration (domestic and international/Madrid)",
        },
        {
          fa: "استعلام و جست‌وجوی نام و برند",
          en: "Name and trademark searches",
        },
        {
          fa: "ثبت اختراع",
          en: "Patent registration",
        },
        {
          fa: "ثبت طرح صنعتی",
          en: "Industrial design registration",
        },
        {
          fa: "تمدید و تغییرات علامت تجاری",
          en: "Trademark renewal and amendments",
        },
        {
          fa: "اعتراض به ثبت برند و پیگیری حقوقی مالکیت فکری",
          en: "Trademark opposition and IP legal follow-up",
        },
      ],
    },
];

export const services: Service[] = rawServices.map((raw) => localizeService(raw, "fa"));

export function getAllServices(locale: string = "fa"): Service[] {
  return rawServices.map((raw) => localizeService(raw, locale));
}

export function getServiceBySlug(slug: string, locale: string = "fa"): Service | undefined {
  const raw = rawServices.find((service) => service.slug === slug);
  return raw ? localizeService(raw, locale) : undefined;
}

export function getRelatedServices(service: Service, locale: string = "fa"): Service[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug, locale))
    .filter((item): item is Service => Boolean(item));
}
