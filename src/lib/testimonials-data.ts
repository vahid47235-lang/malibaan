export type Testimonial = {
  quote: string;
  name: string;
  serviceSlugs: string[]; // empty = general/homepage-only, not tied to one service
};

type RawTestimonial = {
  quote: { fa: string; en: string };
  name: { fa: string; en: string };
  serviceSlugs: string[];
};

const rawTestimonials: RawTestimonial[] = [
  // company-registration
  {
    quote: {
      fa: "به‌عنوان یک استارتاپ، نمی‌دانستیم از کجا شروع کنیم. مالی‌بان از همان جلسه اول، مسیر ثبت شرکت و ساختار مالیاتی مناسب را روشن کرد.",
      en: "As a startup, we didn't know where to start. From the very first session, Malibaan made the path to incorporation and the right tax structure clear.",
    },
    name: { fa: "هم‌بنیان‌گذار، استارتاپ فناوری", en: "Co-founder, Tech Startup" },
    serviceSlugs: ["company-registration"],
  },
  {
    quote: {
      fa: "اساسنامه‌مان در اولین تلاش با ایراد اداره ثبت مواجه شده بود. مالی‌بان کل مدارک را دوباره و اصولی آماده کرد و در کمتر از دو هفته کار تمام شد.",
      en: "Our articles of association were rejected by the registrar on the first attempt. Malibaan redid all the documents properly, and it was done in under two weeks.",
    },
    name: { fa: "مدیرعامل، شرکت واردات قطعات", en: "CEO, Parts Import Company" },
    serviceSlugs: ["company-registration"],
  },
  {
    quote: {
      fa: "هم‌زمان با تأسیس شرکت، برندمان را هم ثبت کردیم. اگر دیرتر اقدام می‌کردیم، ممکن بود رقیبی زودتر این کار را انجام می‌داد.",
      en: "We registered our trademark at the same time as incorporating. If we'd waited, a competitor might have gotten there first.",
    },
    name: { fa: "بنیان‌گذار، برند پوشاک", en: "Founder, Apparel Brand" },
    serviceSlugs: ["company-registration"],
  },

  // accounting
  {
    quote: {
      fa: "بعد از سال‌ها کار با چند حسابدار متفاوت، مالی‌بان اولین تیمی بود که گزارش‌هایش را واقعاً می‌فهمیدم. الان تصمیم‌های مالی را با اطمینان بیشتری می‌گیرم.",
      en: "After years working with several different accountants, Malibaan was the first team whose reports I actually understood. I make financial decisions with far more confidence now.",
    },
    name: { fa: "مدیرعامل، شرکت تولیدی قطعات صنعتی", en: "CEO, Industrial Parts Manufacturer" },
    serviceSlugs: ["accounting"],
  },
  {
    quote: {
      fa: "دفاتر ما هر ماه توسط یک نفر متفاوت به‌روزرسانی می‌شد و هیچ هماهنگی نبود. مالی‌بان یک کارشناس ثابت گذاشت که الان کل تاریخچه مالی ما را می‌شناسد.",
      en: "Our books were updated by a different person every month with no coordination at all. Malibaan assigned one dedicated expert who now knows our entire financial history.",
    },
    name: { fa: "مدیر مالی، مجموعه رستوران‌های زنجیره‌ای", en: "CFO, Restaurant Chain" },
    serviceSlugs: ["accounting"],
  },
  {
    quote: {
      fa: "گزارش بهای تمام‌شده‌ای که مالی‌بان برایمان تهیه کرد، نشان داد کدام محصولاتمان واقعاً سودآور نیستند. قیمت‌گذاری را کامل تغییر دادیم.",
      en: "The cost-accounting report Malibaan prepared for us showed exactly which products weren't actually profitable. We overhauled our pricing completely.",
    },
    name: { fa: "مدیرعامل، کارگاه تولیدی", en: "Owner, Manufacturing Workshop" },
    serviceSlugs: ["accounting"],
  },

  // tax-consulting
  {
    quote: {
      fa: "در بازرسی مالیاتی، تیم مالی‌بان کنارمان بود و پرونده را با مستندات دقیق دفاع کرد. جریمه‌ای که انتظارش را داشتیم، هرگز اتفاق نیفتاد.",
      en: "During a tax inspection, the Malibaan team stood beside us and defended our case with precise documentation. The penalty we were expecting never happened.",
    },
    name: { fa: "مدیر مالی، مجموعه واردات و توزیع", en: "CFO, Import & Distribution Group" },
    serviceSlugs: ["tax-consulting"],
  },
  {
    quote: {
      fa: "هر سال جریمه دیرکرد اظهارنامه می‌دادیم چون هیچ‌کس مسئول پیگیری مهلت‌ها نبود. از وقتی با مالی‌بان کار می‌کنیم، این دغدغه کامل از بین رفته.",
      en: "Every year we paid late-filing penalties because no one was responsible for tracking deadlines. Since working with Malibaan, that worry is completely gone.",
    },
    name: { fa: "مدیرعامل، شرکت پیمانکاری", en: "CEO, Contracting Company" },
    serviceSlugs: ["tax-consulting"],
  },
  {
    quote: {
      fa: "مالی‌بان یک مسیر قانونی برای کاهش مالیات سال بعدمان پیشنهاد داد که خودمان اصلاً به آن فکر نکرده بودیم.",
      en: "Malibaan suggested a legal way to reduce next year's tax bill that we'd never even considered.",
    },
    name: { fa: "مدیر مالی، شرکت بازرگانی", en: "CFO, Trading Company" },
    serviceSlugs: ["tax-consulting"],
  },

  // vat
  {
    quote: {
      fa: "راه‌اندازی سامانه مودیان برایمان پیچیده به نظر می‌رسید. مالی‌بان کل فرآیند را در کمتر از دو هفته و بدون وقفه در فروش پیاده‌سازی کرد.",
      en: "Setting up the e-invoicing system seemed complicated to us. Malibaan implemented the whole process in under two weeks without any disruption to sales.",
    },
    name: { fa: "بنیان‌گذار، فروشگاه اینترنتی", en: "Founder, Online Store" },
    serviceSlugs: ["vat"],
  },
  {
    quote: {
      fa: "قبلاً هر فصل برای گزارش معاملات فصلی درگیر بودیم. الان این فرآیند کاملاً خودکار شده و دیگر نگرانش نیستیم.",
      en: "We used to scramble every quarter for the transaction report. Now the whole process is automated and we don't worry about it anymore.",
    },
    name: { fa: "مدیر مالی، عمده‌فروشی پوشاک", en: "CFO, Apparel Wholesaler" },
    serviceSlugs: ["vat"],
  },
  {
    quote: {
      fa: "جریمه عدم ثبت فاکتور الکترونیک نزدیک بود گریبان‌مان را بگیرد. مالی‌بان به‌موقع وضعیت را اصلاح کرد.",
      en: "We came close to a penalty for not filing e-invoices. Malibaan fixed the situation just in time.",
    },
    name: { fa: "صاحب رستوران زنجیره‌ای", en: "Owner, Restaurant Chain" },
    serviceSlugs: ["vat"],
  },

  // payroll
  {
    quote: {
      fa: "با رشد تیم، لیست بیمه و حقوق و دستمزدمان پیچیده شده بود. مالی‌بان یک فرآیند ماهانه منظم گذاشت که دیگر هیچ‌وقت دیر یا اشتباه ارسال نمی‌شود.",
      en: "As our team grew, our insurance filings and payroll got complicated. Malibaan set up a regular monthly process that's never late or wrong anymore.",
    },
    name: { fa: "مدیر منابع انسانی، شرکت پیمانکاری ساختمانی", en: "HR Manager, Construction Contractor" },
    serviceSlugs: ["payroll"],
  },
  {
    quote: {
      fa: "دریافت مفاصاحساب تأمین اجتماعی پروژه قبلی‌مان ماه‌ها طول کشیده بود. این بار با مالی‌بان خیلی سریع‌تر و بدون دردسر انجام شد.",
      en: "Getting the social-insurance clearance certificate for our last project took months. This time, with Malibaan, it was much faster and hassle-free.",
    },
    name: { fa: "مدیر پروژه، شرکت پیمانکاری", en: "Project Manager, Contracting Firm" },
    serviceSlugs: ["payroll"],
  },
  {
    quote: {
      fa: "کارکنانمان همیشه از اشتباهات فیش حقوقی شاکی بودند. از وقتی مالی‌بان محاسبات را انجام می‌دهد، این شکایت‌ها کاملاً متوقف شده.",
      en: "Our employees constantly complained about payslip errors. Since Malibaan started handling the calculations, those complaints have completely stopped.",
    },
    name: { fa: "مدیرعامل، کارگاه تولیدی", en: "Owner, Manufacturing Workshop" },
    serviceSlugs: ["payroll"],
  },

  // audit
  {
    quote: {
      fa: "برای افزایش سرمایه به یک حسابرسی معتبر نیاز داشتیم. تیم مالی‌بان کل مسیر را هماهنگ کرد، از آماده‌سازی اسناد تا جلسه نهایی با حسابرس مستقل.",
      en: "We needed a credible audit for a capital increase. The Malibaan team coordinated the entire path, from preparing documents to the final meeting with the independent auditor.",
    },
    name: { fa: "مدیرعامل، هلدینگ در حال افزایش سرمایه", en: "CEO, Holding Company Raising Capital" },
    serviceSlugs: ["audit"],
  },
  {
    quote: {
      fa: "کنترل‌های داخلی که مالی‌بان طراحی کرد، یک نقطه ضعف مالی جدی را قبل از این‌که به مشکل بزرگ‌تری تبدیل شود، شناسایی کرد.",
      en: "The internal controls Malibaan designed caught a serious financial weakness before it turned into a much bigger problem.",
    },
    name: { fa: "مدیر مالی، شرکت تولیدی متوسط", en: "CFO, Mid-Size Manufacturer" },
    serviceSlugs: ["audit"],
  },
  {
    quote: {
      fa: "بانک برای تمدید خط اعتباری از ما گزارش حسابرسی‌شده خواسته بود. مالی‌بان در زمان کوتاهی این گزارش را آماده کرد.",
      en: "Our bank required an audited report to renew our credit line. Malibaan prepared that report in a very short time.",
    },
    name: { fa: "مدیرعامل، شرکت بازرگانی", en: "CEO, Trading Company" },
    serviceSlugs: ["audit"],
  },

  // intellectual-property
  {
    quote: {
      fa: "متوجه شدیم رقیبی از نام تجاری مشابه ما استفاده می‌کند. چون از قبل با مالی‌بان برندمان را ثبت کرده بودیم، توانستیم به‌سرعت پیگیری حقوقی کنیم.",
      en: "We found a competitor using a name very similar to ours. Because we'd already registered our trademark with Malibaan, we could pursue legal action quickly.",
    },
    name: { fa: "مدیرعامل، برند محصولات غذایی", en: "CEO, Food Products Brand" },
    serviceSlugs: ["intellectual-property"],
  },
  {
    quote: {
      fa: "برای صادرات به چند کشور منطقه، باید برندمان را بین‌المللی ثبت می‌کردیم. مالی‌بان کل فرآیند مادرید را برایمان مدیریت کرد.",
      en: "To export to several countries in the region, we needed to register our trademark internationally. Malibaan managed the entire Madrid Protocol process for us.",
    },
    name: { fa: "مدیر صادرات، شرکت تولیدی", en: "Export Manager, Manufacturing Company" },
    serviceSlugs: ["intellectual-property"],
  },
  {
    quote: {
      fa: "طرح صنعتی محصولمان را دیر ثبت کرده بودیم و یک‌بار با کپی‌برداری مواجه شدیم. این بار مالی‌بان از همان ابتدا ثبت را انجام داد.",
      en: "We registered our product's industrial design late once and got copied. This time, Malibaan handled the registration from day one.",
    },
    name: { fa: "طراح محصول، استودیو طراحی", en: "Product Designer, Design Studio" },
    serviceSlugs: ["intellectual-property"],
  },

  // financial-consulting
  {
    quote: {
      fa: "برای جذب سرمایه‌گذار، مدل مالی قابل ارائه‌ای نداشتیم. مالی‌بان طرح توجیهی و پیش‌بینی مالی را طوری آماده کرد که در همان جلسه اول سرمایه‌گذار متقاعد شد.",
      en: "We had no presentable financial model to attract an investor. Malibaan prepared a business plan and financial forecast that convinced the investor in the very first meeting.",
    },
    name: { fa: "مدیرعامل، استارتاپ در حال جذب سرمایه", en: "CEO, Startup Raising Investment" },
    serviceSlugs: ["financial-consulting"],
  },
  {
    quote: {
      fa: "نمی‌دانستیم کدام بخش کسب‌وکارمان واقعاً سودآور است. تحلیل مالی مالی‌بان این موضوع را کاملاً روشن کرد.",
      en: "We didn't know which part of our business was actually profitable. Malibaan's financial analysis made it completely clear.",
    },
    name: { fa: "مدیرعامل، مجموعه چندشعبه‌ای", en: "CEO, Multi-Branch Business" },
    serviceSlugs: ["financial-consulting"],
  },
  {
    quote: {
      fa: "به‌جای استخدام یک مدیر مالی تمام‌وقت، از خدمت مدیر مالی برون‌سپاری‌شده مالی‌بان استفاده کردیم؛ همان کیفیت مشاوره را با هزینه بسیار کمتر گرفتیم.",
      en: "Instead of hiring a full-time CFO, we used Malibaan's outsourced CFO service — we got the same quality of advice for far less cost.",
    },
    name: { fa: "مدیرعامل، شرکت متوسط در حال رشد", en: "CEO, Growing Mid-Size Company" },
    serviceSlugs: ["financial-consulting"],
  },

  // business-legal
  {
    quote: {
      fa: "قراردادی که با یک شریک تجاری امضا کرده بودیم، خیلی به ضررمان بود. مالی‌بان کمکمان کرد قرارداد بعدی را طوری تنظیم کنیم که واقعاً از منافعمان دفاع کند.",
      en: "A contract we'd signed with a business partner was heavily against our interests. Malibaan helped us draft the next one so it actually protected us.",
    },
    name: { fa: "مدیرعامل، شرکت بازرگانی", en: "CEO, Trading Company" },
    serviceSlugs: ["business-legal"],
  },
  {
    quote: {
      fa: "دعوای ثبتی طولانی‌ای داشتیم که هیچ‌وقت پیگیری درستی نمی‌شد. تیم حقوقی مالی‌بان کل پرونده را تا نتیجه نهایی دنبال کرد.",
      en: "We had a long-running registration dispute that never got followed up properly. Malibaan's legal team pursued the whole case through to the final outcome.",
    },
    name: { fa: "مدیرعامل، شرکت تولیدی", en: "CEO, Manufacturing Company" },
    serviceSlugs: ["business-legal"],
  },
  {
    quote: {
      fa: "برای قراردادهای کاری تیم‌مان از یک الگوی قدیمی و ناقص استفاده می‌کردیم. مالی‌بان قراردادها را کاملاً اصولی و به‌روز بازنویسی کرد.",
      en: "We were using an old, incomplete template for our team's employment contracts. Malibaan rewrote them properly and brought them fully up to date.",
    },
    name: { fa: "مدیر منابع انسانی، مجموعه خدماتی", en: "HR Manager, Services Company" },
    serviceSlugs: ["business-legal"],
  },

  // digital-fintech
  {
    quote: {
      fa: "دیگر لازم نیست منتظر گزارش پایان ماه بمانیم؛ داشبورد مالی‌بان وضعیت فروش و نقدینگی را همیشه جلوی چشممان می‌گذارد.",
      en: "We no longer have to wait for the end-of-month report; Malibaan's dashboard keeps our sales and cash position in front of us at all times.",
    },
    name: { fa: "مدیرعامل، فروشگاه اینترنتی", en: "CEO, Online Store" },
    serviceSlugs: ["digital-fintech"],
  },
  {
    quote: {
      fa: "صدور فاکتور الکترونیک برایمان کاملاً خودکار شده و دیگر هیچ کار دستی تکراری نداریم.",
      en: "E-invoicing has become completely automated for us, and we no longer have any repetitive manual work.",
    },
    name: { fa: "مدیر عملیات، فروشگاه زنجیره‌ای", en: "Operations Manager, Retail Chain" },
    serviceSlugs: ["digital-fintech"],
  },
  {
    quote: {
      fa: "اتصال حساب بانکی به نرم‌افزار حسابداری، تطبیق تراکنش‌های ماهانه را که همیشه کابوس‌مان بود، کاملاً حذف کرد.",
      en: "Connecting our bank account to the accounting software completely eliminated monthly reconciliation, which used to be our nightmare.",
    },
    name: { fa: "مدیر مالی، شرکت پخش", en: "CFO, Distribution Company" },
    serviceSlugs: ["digital-fintech"],
  },

  // homepage-only (general brand trust, not tied to a single service)
  {
    quote: {
      fa: "چیزی که مالی‌بان را از بقیه متفاوت می‌کند، این است که واقعاً کنار کسب‌وکارمان می‌ایستد، نه فقط یک فاکتور ماهانه می‌فرستد.",
      en: "What sets Malibaan apart is that they genuinely stand beside our business, not just send a monthly invoice.",
    },
    name: { fa: "مدیرعامل، کسب‌وکار خانوادگی", en: "CEO, Family Business" },
    serviceSlugs: [],
  },
  {
    quote: {
      fa: "از ثبت شرکت تا امروز، تقریباً همه نیازهای مالی و مالیاتی‌مان را یک تیم واحد پوشش داده؛ همین هماهنگی، بزرگ‌ترین ارزش مالی‌بان برای ماست.",
      en: "From incorporation to today, one single team has covered almost all our financial and tax needs; that coordination is Malibaan's biggest value to us.",
    },
    name: { fa: "مدیرعامل، مجموعه بازرگانی", en: "CEO, Trading Group" },
    serviceSlugs: [],
  },
  {
    quote: {
      fa: "در این چند سال، هیچ‌وقت مجبور نشدیم دنبال یک متخصص جدید برای یک مشکل مالی جدید بگردیم. مالی‌بان همیشه یک قدم جلوتر بوده.",
      en: "In all these years, we've never had to go looking for a new specialist for a new financial problem. Malibaan has always been one step ahead.",
    },
    name: { fa: "مدیر مالی، شرکت صنعتی", en: "CFO, Industrial Company" },
    serviceSlugs: [],
  },
];

function localize(raw: RawTestimonial, locale: string): Testimonial {
  const isFa = locale === "fa";
  return {
    quote: isFa ? raw.quote.fa : raw.quote.en,
    name: isFa ? raw.name.fa : raw.name.en,
    serviceSlugs: raw.serviceSlugs,
  };
}

export function getTestimonialsForService(slug: string, locale: string = "fa"): Testimonial[] {
  return rawTestimonials.filter((t) => t.serviceSlugs.includes(slug)).map((t) => localize(t, locale));
}

export function getFeaturedTestimonials(locale: string = "fa"): Testimonial[] {
  return rawTestimonials.filter((t) => t.serviceSlugs.length === 0).map((t) => localize(t, locale));
}
