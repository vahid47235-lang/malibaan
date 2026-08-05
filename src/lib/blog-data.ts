import { getServiceBySlug } from "@/lib/services-data";
import type { CoverTone } from "@/components/ui/article-cover";

export type LocalizedString = {
  fa: string;
  en: string;
};

export type RawBlogSection = {
  heading?: LocalizedString;
  paragraphs?: LocalizedString[];
  list?: LocalizedString[];
};

export type RawBlogPost = {
  slug: string;
  categorySlug: string; // matches a Service.slug in services-data.ts
  title: LocalizedString;
  excerpt: LocalizedString;
  metaDescription: LocalizedString;
  coverTone: CoverTone;
  publishedAt: string; // ISO date
  readingMinutes: number;
  sections: RawBlogSection[];
};

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  categorySlug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  coverTone: CoverTone;
  publishedAt: string;
  readingMinutes: number;
  sections: BlogSection[];
};

function loc(value: LocalizedString, locale: string): string {
  return locale === "en" ? value.en : value.fa;
}

function localizePost(raw: RawBlogPost, locale: string): BlogPost {
  return {
    slug: raw.slug,
    categorySlug: raw.categorySlug,
    title: loc(raw.title, locale),
    excerpt: loc(raw.excerpt, locale),
    metaDescription: loc(raw.metaDescription, locale),
    coverTone: raw.coverTone,
    publishedAt: raw.publishedAt,
    readingMinutes: raw.readingMinutes,
    sections: raw.sections.map((section) => ({
      heading: section.heading ? loc(section.heading, locale) : undefined,
      paragraphs: section.paragraphs?.map((p) => loc(p, locale)),
      list: section.list?.map((item) => loc(item, locale)),
    })),
  };
}

export const rawBlogPosts: RawBlogPost[] = [
    {
      slug: "sahami-khass-ya-masoliyat-mahdood",
      categorySlug: "company-registration",
      title: {
        fa: "ثبت شرکت سهامی خاص یا مسئولیت محدود؛ کدام برای کسب‌وکار شما بهتر است؟",
        en: "Private Joint-Stock or Limited Liability Company: Which Is Right for Your Business?",
      },
      excerpt: {
        fa: "قبل از هر اقدامی برای تأسیس شرکت، باید بدانید سهامی خاص یا مسئولیت محدود کدام‌یک با ساختار و اهداف کسب‌وکار شما سازگارتر است.",
        en: "Before taking any step toward forming a company, you need to know whether a private joint-stock company or a limited liability company fits your business's structure and goals better.",
      },
      metaDescription: {
        fa: "تفاوت شرکت سهامی خاص و مسئولیت محدود در تعداد شرکا، بازرس قانونی، افزایش سرمایه و مسئولیت مالی؛ راهنمای انتخاب نوع شرکت مناسب کسب‌وکار شما.",
        en: "The differences between a private joint-stock company and a limited liability company in number of partners, statutory inspector, capital increase, and financial liability — a guide to choosing the right company type for your business.",
      },
      coverTone: "primary",
      publishedAt: "2026-05-18",
      readingMinutes: 6,
      sections: [
        {
          paragraphs: [
            {
              fa: "یکی از اولین و مهم‌ترین تصمیم‌هایی که هر بنیان‌گذار کسب‌وکار در ایران با آن روبه‌رو می‌شود، انتخاب نوع شرکت است. این تصمیم فقط یک فرم اداری نیست؛ روی نحوه تقسیم سود، مسئولیت شرکا در برابر بدهی‌ها، امکان جذب سرمایه‌گذار و حتی هزینه‌های مالیاتی آینده کسب‌وکار اثر می‌گذارد. دو گزینه رایج برای اکثر کسب‌وکارهای کوچک و متوسط، شرکت سهامی خاص و شرکت با مسئولیت محدود هستند.",
              en: "Choosing the type of company is one of the first and most important decisions every business founder in Iran faces. It's not just an administrative form — it affects how profits are split, partners' liability for debts, the ability to bring on an investor, and even the business's future tax costs. The two most common options for most small and medium businesses are the private joint-stock company and the limited liability company.",
            },
          ],
        },
        {
          heading: { fa: "شرکت سهامی خاص چیست؟", en: "What Is a Private Joint-Stock Company?" },
          paragraphs: [
            {
              fa: "در شرکت سهامی خاص، سرمایه شرکت به «سهام» با ارزش اسمی مساوی تقسیم می‌شود. این نوع شرکت حداقل به سه سهامدار و یک بازرس قانونی (که وظیفه نظارت بر عملکرد مالی هیئت‌مدیره را دارد) نیاز دارد. سهامی خاص معمولاً برای کسب‌وکارهایی مناسب است که در آینده قصد افزایش سرمایه، ورود سرمایه‌گذار جدید یا حتی پذیرش در بورس را دارند، چون ساختار سهام امکان انتقال مالکیت را ساده‌تر می‌کند.",
              en: "In a private joint-stock company, capital is divided into 'shares' of equal nominal value. This type of company requires at least three shareholders and one statutory inspector (responsible for overseeing the board's financial conduct). A private joint-stock company usually suits businesses planning a future capital increase, bringing on a new investor, or even a stock exchange listing, since the share structure makes transferring ownership simpler.",
            },
          ],
        },
        {
          heading: { fa: "شرکت با مسئولیت محدود چیست؟", en: "What Is a Limited Liability Company?" },
          paragraphs: [
            {
              fa: "در شرکت با مسئولیت محدود، سرمایه به «سهم‌الشرکه» تقسیم می‌شود، نه سهام قابل معامله. حداقل به دو نفر (شریک) نیاز است و نیازی به بازرس قانونی نیست، به همین دلیل تشریفات اداری آن ساده‌تر و هزینه تأسیس معمولاً کمتر است. این گزینه برای کسب‌وکارهای خانوادگی، مشاغل خدماتی یا شرکای معدودی که قصد ورود سرمایه‌گذار بیرونی در کوتاه‌مدت را ندارند، مناسب‌تر است.",
              en: "In a limited liability company, capital is divided into 'partnership shares' rather than tradable shares. It requires at least two people (partners) and doesn't need a statutory inspector, which makes the paperwork simpler and the formation cost usually lower. This option suits family businesses, service businesses, or a small group of partners with no short-term plan to bring in an outside investor.",
            },
          ],
        },
        {
          heading: { fa: "تفاوت‌های کلیدی در یک نگاه", en: "Key Differences at a Glance" },
          list: [
            {
              fa: "تعداد شرکا: حداقل ۳ سهامدار در سهامی خاص، در برابر حداقل ۲ شریک در مسئولیت محدود",
              en: "Number of partners: at least 3 shareholders in a joint-stock company, versus at least 2 partners in a limited liability company",
            },
            {
              fa: "بازرس قانونی: الزامی در سهامی خاص، غیرالزامی در مسئولیت محدود",
              en: "Statutory inspector: required in a joint-stock company, not required in a limited liability company",
            },
            {
              fa: "نقل و انتقال سهام: در سهامی خاص ساده‌تر و رسمی‌تر، در مسئولیت محدود نیازمند رضایت اکثریت شرکا",
              en: "Transferring ownership: simpler and more formal in a joint-stock company; in a limited liability company it requires majority partner consent",
            },
            {
              fa: "افزایش سرمایه و جذب سرمایه‌گذار: در سهامی خاص انعطاف‌پذیرتر",
              en: "Capital increases and bringing in investors: more flexible in a joint-stock company",
            },
            {
              fa: "تشریفات و هزینه تأسیس: در مسئولیت محدود معمولاً کمتر و سریع‌تر",
              en: "Formation paperwork and cost: usually lower and faster for a limited liability company",
            },
          ],
        },
        {
          heading: { fa: "کدام گزینه را انتخاب کنید؟", en: "Which Option Should You Choose?" },
          paragraphs: [
            {
              fa: "اگر برنامه میان‌مدت شما جذب سرمایه‌گذار، افزایش سرمایه یا ورود شرکای جدید است، سهامی خاص ساختار مناسب‌تری فراهم می‌کند. اگر در حال شروع یک کسب‌وکار کوچک با شرکای محدود و ثابت هستید و اولویت شما سرعت و سادگی ثبت است، مسئولیت محدود معمولاً گزینه بهتری است. در هر دو حالت، تصمیم را پیش از تنظیم اساسنامه با یک کارشناس بررسی کنید؛ تغییر نوع شرکت پس از تأسیس ممکن است، اما هزینه و زمان اضافی دارد.",
              en: "If your medium-term plan involves bringing on an investor, raising capital, or adding new partners, a private joint-stock company offers a better-suited structure. If you're starting a small business with a fixed, limited group of partners and your priority is speed and simplicity of registration, a limited liability company is usually the better choice. Either way, review the decision with an expert before drafting your articles of association — changing the company type after formation is possible, but it costs extra time and money.",
            },
            {
              fa: "تیم مالی‌بان پیش از تأسیس، ساختار مناسب کسب‌وکار شما را بر اساس تعداد شرکا، برنامه رشد و صنعت فعالیت بررسی می‌کند تا از همان روز اول، مسیر درست را انتخاب کنید.",
              en: "Before formation, the Malibaan team reviews the structure that fits your business based on the number of partners, growth plans, and industry, so you choose the right path from day one.",
            },
          ],
        },
      ],
    },
    {
      slug: "codinge-hesabdari-rahnama",
      categorySlug: "accounting",
      title: {
        fa: "راهنمای کدینگ حسابداری: چگونه دفاتر کسب‌وکار خود را استاندارد کنیم؟",
        en: "A Guide to Accounting Coding: How to Standardize Your Business's Books",
      },
      excerpt: {
        fa: "کدینگ حسابداری، ستون فقرات هر سیستم مالی است. اگر از ابتدا اصولی طراحی نشود، هر گزارش‌گیری بعدی به یک پروژه دستی و پرخطا تبدیل می‌شود.",
        en: "A chart of accounts is the backbone of any financial system. If it isn't designed properly from the start, every report you generate afterward turns into a manual, error-prone project.",
      },
      metaDescription: {
        fa: "کدینگ حسابداری چیست، چرا اهمیت دارد و چگونه یک چارت حساب استاندارد و متناسب با کسب‌وکار خود طراحی کنیم؛ راهنمای عملی مالی‌بان.",
        en: "What accounting coding is, why it matters, and how to design a standard chart of accounts suited to your business — a practical guide from Malibaan.",
      },
      coverTone: "deep",
      publishedAt: "2026-06-01",
      readingMinutes: 7,
      sections: [
        {
          paragraphs: [
            {
              fa: "بسیاری از کسب‌وکارها زمانی به فکر کدینگ حسابداری می‌افتند که گزارش‌گیری برایشان به یک کابوس تبدیل شده: حساب‌هایی با نام‌های نامرتب، اقلامی که معلوم نیست زیر کدام سرفصل باید ثبت شوند، و گزارش سود و زیانی که هر بار متفاوت به نظر می‌رسد. کدینگ حسابداری اصولی، دقیقاً همین آشفتگی را از ریشه حل می‌کند.",
              en: "Many businesses only start thinking about accounting coding once generating reports has become a nightmare: accounts with disorganized names, line items no one is sure which heading to record under, and a profit-and-loss statement that looks different every time. A properly designed chart of accounts solves exactly this chaos, at the root.",
            },
          ],
        },
        {
          heading: { fa: "کدینگ حسابداری چیست؟", en: "What Is Accounting Coding?" },
          paragraphs: [
            {
              fa: "کدینگ حسابداری یا «چارت حساب‌ها»، ساختاری سلسله‌مراتبی است که هر حساب مالی کسب‌وکار (دارایی، بدهی، درآمد، هزینه، سرمایه) را با یک کد عددی مشخص و یکتا تعریف می‌کند. این کدها به نرم‌افزار حسابداری اجازه می‌دهند تراکنش‌ها را به‌درستی دسته‌بندی و گزارش‌های مالی را خودکار تولید کند.",
              en: "Accounting coding, or a 'chart of accounts,' is a hierarchical structure that defines every financial account in a business — assets, liabilities, revenue, expenses, equity — with a distinct, unique numeric code. These codes let accounting software correctly categorize transactions and automatically generate financial reports.",
            },
          ],
        },
        {
          heading: { fa: "اصول یک کدینگ خوب", en: "Principles of Good Coding" },
          list: [
            {
              fa: "سطح‌بندی منطقی: از کلی (مثلاً «دارایی‌های جاری») به جزئی (مثلاً «موجودی بانک ملت») حرکت کند",
              en: "Logical hierarchy: moves from general (e.g., 'current assets') to specific (e.g., 'Bank Mellat balance')",
            },
            {
              fa: "انعطاف برای رشد: جای خالی کافی بین کدها باشد تا حساب‌های جدید بدون به‌هم‌ریختن ساختار اضافه شوند",
              en: "Room to grow: enough gaps between codes to add new accounts without disrupting the structure",
            },
            {
              fa: "تطبیق با صنعت: یک فروشگاه اینترنتی به سرفصل‌هایی مثل «هزینه پیک و ارسال» نیاز دارد که یک شرکت تولیدی ندارد",
              en: "Fits your industry: an online store needs headings like 'courier and shipping costs' that a manufacturing company doesn't",
            },
            {
              fa: "همسویی با نیاز گزارش‌دهی مالیاتی و مدیریتی، نه فقط ثبت خام تراکنش‌ها",
              en: "Aligned with tax and management reporting needs, not just raw transaction recording",
            },
          ],
        },
        {
          heading: { fa: "اشتباهات رایجی که دیده‌ایم", en: "Common Mistakes We've Seen" },
          paragraphs: [
            {
              fa: "رایج‌ترین اشتباه، کپی‌کردن کدینگ یک کسب‌وکار دیگر بدون بومی‌سازی است؛ نتیجه آن سرفصل‌های اضافه و بی‌استفاده در کنار نبود سرفصل‌های موردنیاز واقعی کسب‌وکار است. اشتباه دوم، تغییر مکرر کدینگ در میانه سال مالی است که مقایسه دوره‌ای گزارش‌ها را غیرممکن می‌کند. کدینگ باید یک‌بار درست طراحی شود و تغییرات بعدی، محدود و کنترل‌شده باشد.",
              en: "The most common mistake is copying another business's coding without adapting it — the result is unnecessary, unused headings alongside missing ones the business actually needs. The second mistake is changing the coding repeatedly mid-fiscal-year, which makes period-over-period comparison impossible. Coding should be designed correctly once, and later changes should be limited and controlled.",
            },
          ],
        },
        {
          heading: { fa: "از کجا شروع کنیم؟", en: "Where Do You Start?" },
          list: [
            {
              fa: "فهرست کامل فعالیت‌ها، محصولات و منابع درآمدی کسب‌وکار را تهیه کنید",
              en: "Prepare a complete list of the business's activities, products, and revenue sources",
            },
            {
              fa: "دارایی‌ها، بدهی‌ها و هزینه‌های ثابت و متغیر را شناسایی کنید",
              en: "Identify assets, liabilities, and fixed and variable costs",
            },
            {
              fa: "ساختار را با نیاز گزارش‌دهی به بانک، دارایی و مدیریت داخلی تطبیق دهید",
              en: "Match the structure to what your bank, the tax authority, and internal management need to see",
            },
            {
              fa: "پیش از پیاده‌سازی نهایی، با یک کارشناس حسابداری آن را مرور کنید",
              en: "Review it with an accounting expert before final implementation",
            },
          ],
        },
        {
          paragraphs: [
            {
              fa: "تیم مالی‌بان در ابتدای همکاری، کدینگ حسابداری هر مشتری را از صفر یا بر پایه ساختار موجود طراحی می‌کند تا گزارش‌های ماهانه از روز اول قابل اتکا و قابل مقایسه باشند.",
              en: "At the start of every engagement, the Malibaan team designs each client's accounting coding from scratch or builds on their existing structure, so monthly reports are reliable and comparable from day one.",
            },
          ],
        },
      ],
    },
    {
      slug: "mohlate-jarime-ezharname-maliyati",
      categorySlug: "tax-consulting",
      title: {
        fa: "مهلت و جریمه ارسال اظهارنامه مالیاتی عملکرد؛ هر آنچه باید بدانید",
        en: "Corporate Tax Return Deadlines and Penalties: Everything You Need to Know",
      },
      excerpt: {
        fa: "تأخیر در ارسال اظهارنامه مالیاتی، یکی از پرهزینه‌ترین و در عین حال قابل‌پیشگیری‌ترین اشتباهات کسب‌وکارهاست.",
        en: "A late tax return is one of the costliest — and most preventable — mistakes a business can make.",
      },
      metaDescription: {
        fa: "مهلت قانونی ارسال اظهارنامه مالیاتی عملکرد، جریمه عدم تسلیم و تأخیر، و راهکارهای عملی برای جلوگیری از جریمه‌های مالیاتی.",
        en: "The legal deadline for filing a corporate income tax return, penalties for not filing or filing late, and practical ways to avoid tax penalties.",
      },
      coverTone: "medium",
      publishedAt: "2026-06-15",
      readingMinutes: 5,
      sections: [
        {
          paragraphs: [
            {
              fa: "اظهارنامه مالیاتی عملکرد، گزارشی است که هر شخص حقوقی و بسیاری از مشاغل موظف‌اند سالانه به سازمان امور مالیاتی تسلیم کنند. تسلیم به‌موقع و دقیق آن، نه‌تنها یک تکلیف قانونی، بلکه شرط بهره‌مندی از بسیاری از معافیت‌ها و مشوق‌های مالیاتی است.",
              en: "A corporate income tax return is a report every legal entity, and many individual businesses, must file with the tax authority each year. Filing it accurately and on time isn't just a legal duty — it's also a condition for benefiting from many tax exemptions and incentives.",
            },
          ],
        },
        {
          heading: { fa: "مهلت قانونی ارسال اظهارنامه", en: "The Legal Filing Deadline" },
          paragraphs: [
            {
              fa: "مهلت تسلیم اظهارنامه عملکرد برای اشخاص حقوقی معمولاً چهار ماه پس از پایان سال مالی است. چون تقویم دقیق هرساله می‌تواند با بخشنامه‌های جدید سازمان امور مالیاتی به‌روزرسانی شود، بهترین کار این است که تاریخ دقیق مهلت را هر سال از مشاور مالیاتی خود یا سامانه رسمی سازمان امور مالیاتی استعلام بگیرید، نه اینکه به خاطرات سال گذشته اتکا کنید.",
              en: "The deadline for legal entities to file a corporate income tax return is usually four months after the end of the fiscal year. Because the exact calendar can be updated each year by new tax authority directives, the safest approach is to check the exact deadline with your tax advisor or the tax authority's official portal every year, rather than relying on what you remember from last year.",
            },
          ],
        },
        {
          heading: { fa: "جریمه عدم تسلیم و تأخیر", en: "Penalties for Not Filing or Filing Late" },
          list: [
            {
              fa: "جریمه عدم تسلیم اظهارنامه در موعد مقرر، معادل ۳۰ درصد مالیات متعلقه و غیرقابل بخشودگی است",
              en: "The penalty for not filing by the deadline is 30% of the tax due, and it cannot be waived",
            },
            {
              fa: "علاوه بر جریمه نقدی، معافیت‌های مالیاتی آن سال (در صورت مشمول بودن) نیز از دست می‌رود",
              en: "On top of the cash penalty, you also lose that year's tax exemptions, if you qualified for any",
            },
            {
              fa: "عدم تسلیم اظهارنامه، مبنای تشخیص علی‌الرأس مالیات توسط ممیز را فراهم می‌کند که معمولاً به نفع مؤدی نیست",
              en: "Not filing gives the tax auditor grounds for a discretionary (best-judgment) assessment, which is rarely in the taxpayer's favor",
            },
          ],
        },
        {
          heading: { fa: "چطور از جریمه جلوگیری کنیم؟", en: "How Do You Avoid the Penalty?" },
          paragraphs: [
            {
              fa: "بزرگ‌ترین دلیل تأخیر در ارسال اظهارنامه، آماده نبودن دفاتر و اسناد حسابداری تا لحظه آخر است. اگر حسابداری کسب‌وکار شما در طول سال به‌روز و منظم نگه داشته شود، تنظیم اظهارنامه در پایان سال مالی به یک کار روتین چند روزه تبدیل می‌شود، نه یک بحران آخر مهلت.",
              en: "The biggest reason returns get filed late is that the books and accounting records aren't ready until the last minute. If your business's accounting is kept up to date and organized throughout the year, preparing the return at fiscal year-end becomes a routine, few-day task — not a last-minute crisis.",
            },
          ],
        },
        {
          heading: { fa: "اگر مهلت را از دست دادید چه کنید؟", en: "What If You Miss the Deadline?" },
          paragraphs: [
            {
              fa: "حتی اگر از مهلت گذشته باشید، ارسال هرچه سریع‌تر اظهارنامه (به‌جای انتظار برای تشخیص علی‌الرأس) معمولاً وضعیت را بهتر می‌کند. در این شرایط، مستندسازی دقیق و آمادگی برای پاسخ‌گویی به ممیز اهمیت بیشتری پیدا می‌کند.",
              en: "Even if you've already missed the deadline, filing the return as soon as possible — rather than waiting for a discretionary assessment — usually improves your position. In this situation, careful documentation and being ready to respond to the auditor matter even more.",
            },
            {
              fa: "تیم مالی‌بان اظهارنامه مشتریان را با اتکا به دفاتر به‌روز طول سال تنظیم می‌کند، و در صورت بروز هرگونه اختلاف با ممیز، تا هیئت حل اختلاف مالیاتی کنار کسب‌وکار شما می‌ایستد.",
              en: "The Malibaan team prepares clients' returns based on books kept current throughout the year, and if any dispute with the auditor arises, we stand by your business all the way through the tax dispute resolution board.",
            },
          ],
        },
      ],
    },
    {
      slug: "sistem-modian-che-hast",
      categorySlug: "vat",
      title: {
        fa: "سامانه مودیان چیست و چرا نادیده گرفتن آن جریمه سنگین دارد؟",
        en: "What Is the E-Invoicing System, and Why Does Ignoring It Bring Heavy Fines?",
      },
      excerpt: {
        fa: "بسیاری از جریمه‌های تازه کسب‌وکارها نه از سر کم‌کاری مالیاتی، بلکه از ناآشنایی با الزامات فنی سامانه مودیان است.",
        en: "Many of the fresh fines businesses face don't come from tax evasion — they come from being unfamiliar with the e-invoicing system's technical requirements.",
      },
      metaDescription: {
        fa: "سامانه مودیان چیست، چه کسب‌وکارهایی مشمول صدور صورتحساب الکترونیکی هستند و چه جریمه‌هایی در انتظار عدم رعایت آن است.",
        en: "What the e-invoicing system is, which businesses are required to issue e-invoices, and what penalties await non-compliance.",
      },
      coverTone: "sage",
      publishedAt: "2026-06-29",
      readingMinutes: 5,
      sections: [
        {
          paragraphs: [
            {
              fa: "سامانه مودیان مالیاتی، زیرساختی است که سازمان امور مالیاتی برای ثبت برخط صورتحساب‌های الکترونیکی مشاغل و شرکت‌ها راه‌اندازی کرده. هدف آن، شفاف‌سازی زنجیره خرید و فروش و کاهش فرار مالیاتی است؛ اما برای کسب‌وکارهایی که با الزامات فنی آن آشنا نیستند، می‌تواند به منبع مکرر جریمه تبدیل شود.",
              en: "The tax e-invoicing system is infrastructure the tax authority built for real-time registration of businesses' and companies' e-invoices. Its goal is to make the purchase-and-sale chain transparent and reduce tax evasion — but for businesses unfamiliar with its technical requirements, it can become a recurring source of fines.",
            },
          ],
        },
        {
          heading: { fa: "چه کسب‌وکارهایی مشمول هستند؟", en: "Which Businesses Are Required to Use It?" },
          paragraphs: [
            {
              fa: "مشمولیت در سامانه مودیان به‌تدریج و بر اساس نوع فعالیت، حجم فروش و ابلاغیه‌های سازمان امور مالیاتی گسترش یافته و اکثر مشاغل دارای پرونده مالیاتی را در برمی‌گیرد. به‌جای حدس‌زدن، وضعیت دقیق مشمولیت کسب‌وکار خود را از طریق سامانه رسمی یا مشاور مالیاتی استعلام بگیرید.",
              en: "Who's required to use the e-invoicing system has gradually expanded based on type of activity, sales volume, and tax authority notices, and now covers most businesses with a tax file. Instead of guessing, check your business's exact status through the official portal or your tax advisor.",
            },
          ],
        },
        {
          heading: { fa: "جریمه‌های رایج", en: "Common Penalties" },
          list: [
            {
              fa: "عدم صدور صورتحساب الکترونیکی برای فروش مشمول",
              en: "Not issuing an e-invoice for a covered sale",
            },
            {
              fa: "صدور صورتحساب ناقص یا با اطلاعات نادرست هویتی خریدار/فروشنده",
              en: "Issuing an incomplete invoice, or one with incorrect buyer/seller identity information",
            },
            {
              fa: "مغایرت بین گزارش فروش سامانه مودیان و اظهارنامه ارزش‌افزوده",
              en: "A discrepancy between the e-invoicing system's sales report and the VAT return",
            },
            {
              fa: "عدم اتصال به‌موقع نرم‌افزار فروش یا صندوق فروشگاهی به سامانه",
              en: "Not connecting your sales software or POS to the system on time",
            },
          ],
        },
        {
          heading: { fa: "مراحل اتصال به سامانه", en: "Steps to Connect to the System" },
          list: [
            {
              fa: "بررسی وضعیت ثبت‌نام کسب‌وکار در سامانه مودیان",
              en: "Check your business's registration status with the e-invoicing system",
            },
            {
              fa: "اتصال نرم‌افزار حسابداری یا صندوق فروش به سامانه از طریق «حافظه مالیاتی» یا «کارپوشه»",
              en: "Connect your accounting software or POS to the system via a 'tax memory' device or the online tax portal",
            },
            {
              fa: "آموزش تیم فروش برای صدور صحیح صورتحساب الکترونیکی",
              en: "Train your sales team to issue e-invoices correctly",
            },
            {
              fa: "تطبیق دوره‌ای گزارش فروش با اظهارنامه ارزش‌افزوده",
              en: "Reconcile your sales report against the VAT return each period",
            },
          ],
        },
        {
          paragraphs: [
            {
              fa: "این فرآیند فنی است و اشتباه در هرکدام از مراحل بالا می‌تواند به جریمه‌های تکرارشونده منجر شود. مالی‌بان اتصال کامل کسب‌وکار شما به سامانه مودیان، از ثبت‌نام تا آموزش تیم فروش، را مدیریت می‌کند تا این ریسک را از بین ببرد.",
              en: "This process is technical, and a mistake at any of the steps above can lead to repeated fines. Malibaan manages your business's complete connection to the e-invoicing system, from registration to training your sales team, to eliminate this risk.",
            },
          ],
        },
      ],
    },
    {
      slug: "mohasebe-hoghough-dastmozd",
      categorySlug: "payroll",
      title: {
        fa: "نحوه محاسبه حقوق و دستمزد طبق قانون کار؛ گام‌به‌گام",
        en: "How to Calculate Payroll Under Labor Law: Step by Step",
      },
      excerpt: {
        fa: "محاسبه حقوق، فراتر از ضرب ساعت کاری در نرخ ساعتی است. حق مسکن، حق اولاد، اضافه‌کاری و بیمه، هرکدام قاعده خاص خود را دارند.",
        en: "Calculating payroll is more than multiplying hours worked by an hourly rate. Housing allowance, child allowance, overtime, and insurance each follow their own rules.",
      },
      metaDescription: {
        fa: "اجزای حقوق و دستمزد طبق قانون کار ایران، نحوه محاسبه بیمه تأمین اجتماعی و مالیات حقوق، و اشتباهات رایج کارفرمایان در این حوزه.",
        en: "The components of payroll under Iranian labor law, how social insurance and payroll tax are calculated, and common mistakes employers make in this area.",
      },
      coverTone: "medium",
      publishedAt: "2026-07-06",
      readingMinutes: 6,
      sections: [
        {
          paragraphs: [
            {
              fa: "محاسبه نادرست حقوق، یکی از رایج‌ترین منابع اختلاف بین کارفرما و کارگر و همچنین جریمه‌های بیمه‌ای است. آشنایی با اجزای تشکیل‌دهنده حقوق و دستمزد، اولین قدم برای اجرای درست آن است.",
              en: "Incorrect payroll calculation is one of the most common sources of disputes between employer and employee, and of insurance penalties. Knowing the components that make up payroll is the first step to getting it right.",
            },
          ],
        },
        {
          heading: { fa: "اجزای حقوق و دستمزد", en: "Components of Payroll" },
          list: [
            {
              fa: "حقوق پایه: بر اساس مصوبه سالانه شورای عالی کار و توافق قرارداد",
              en: "Base pay: based on the Supreme Labor Council's annual ruling and the employment contract",
            },
            {
              fa: "حق مسکن و حق بن (خواربار): مبالغ ثابتی که هرساله توسط شورای عالی کار تعیین می‌شود",
              en: "Housing allowance and food allowance: fixed amounts set annually by the Supreme Labor Council",
            },
            {
              fa: "حق اولاد: برای فرزندان تحت تکفل کارگر بیمه‌شده",
              en: "Child allowance: for the dependent children of an insured employee",
            },
            {
              fa: "اضافه‌کاری: معمولاً ۱٫۴ برابر نرخ ساعتی حقوق پایه برای ساعات کارِ اضافه بر ساعت قانونی",
              en: "Overtime: usually 1.4 times the base hourly rate for hours worked beyond the legal limit",
            },
            {
              fa: "پاداش، عیدی و سنوات: طبق قانون کار و در پایان سال یا قرارداد",
              en: "Bonus, year-end bonus, and severance: per labor law, at year-end or contract termination",
            },
          ],
        },
        {
          heading: { fa: "بیمه تأمین اجتماعی چگونه محاسبه می‌شود؟", en: "How Is Social Insurance Calculated?" },
          paragraphs: [
            {
              fa: "حق بیمه تأمین اجتماعی به‌صورت درصدی از «حقوق مشمول بیمه» (که معمولاً شامل حقوق پایه، حق مسکن و برخی مزایای دیگر است، اما نه همه اقلام) محاسبه و بین کارفرما و کارگر تقسیم می‌شود. لیست بیمه هر ماه باید پیش از موعد مقرر به سازمان تأمین اجتماعی ارسال شود؛ تأخیر در ارسال، جریمه دیرکرد مستقلی دارد که جدا از اصل حق بیمه محاسبه می‌شود.",
              en: "Social insurance contributions are calculated as a percentage of 'insurable pay' — which usually includes base pay, housing allowance, and some other benefits, but not every item — and split between employer and employee. The insurance list must be submitted to the Social Security Organization every month before the deadline; a late submission carries its own separate late-filing penalty, on top of the contribution itself.",
            },
          ],
        },
        {
          heading: { fa: "مالیات حقوق", en: "Payroll Tax" },
          paragraphs: [
            {
              fa: "حقوق و دستمزد، تا سقف معافیت سالانه‌ای که هرساله در قانون بودجه تعیین می‌شود، از مالیات معاف است و مازاد بر آن به‌صورت پلکانی مشمول مالیات حقوق می‌شود. این سقف‌ها و نرخ‌ها هرساله تغییر می‌کنند، بنابراین محاسبه دستی بدون به‌روزرسانی سالانه، ریسک بالایی برای خطا دارد.",
              en: "Pay is exempt from tax up to an annual threshold set each year in the budget law, and anything above it is taxed on a graduated scale. These thresholds and rates change every year, so calculating payroll manually without an annual update carries a high risk of error.",
            },
          ],
        },
        {
          heading: { fa: "اشتباهات رایج کارفرمایان", en: "Common Employer Mistakes" },
          list: [
            {
              fa: "محاسبه اضافه‌کاری بر اساس نرخ ناقص (بدون احتساب حق مسکن و سایر مزایای مشمول)",
              en: "Calculating overtime on an incomplete rate (without including housing allowance and other applicable benefits)",
            },
            {
              fa: "فراموش کردن به‌روزرسانی نرخ‌ها و سقف‌های معافیت در ابتدای هر سال مالی",
              en: "Forgetting to update rates and exemption thresholds at the start of each fiscal year",
            },
            {
              fa: "ارسال دیرهنگام لیست بیمه به دلیل عدم هماهنگی بین واحد منابع انسانی و حسابداری",
              en: "Submitting the insurance list late due to poor coordination between HR and accounting",
            },
          ],
        },
        {
          paragraphs: [
            {
              fa: "تیم مالی‌بان محاسبه حقوق و دستمزد، تنظیم لیست بیمه و به‌روزرسانی سالانه نرخ‌ها را به‌طور کامل بر عهده می‌گیرد تا این فرآیند حساس، هر ماه بدون خطا و بدون تأخیر انجام شود.",
              en: "The Malibaan team takes full responsibility for payroll calculation, preparing the insurance list, and updating rates every year, so this sensitive process runs every month without errors or delays.",
            },
          ],
        },
      ],
    },
    {
      slug: "hesabresi-baraye-che-sherkathayi-lazem-ast",
      categorySlug: "audit",
      title: {
        fa: "حسابرسی صورت‌های مالی چیست و چه شرکت‌هایی به آن نیاز دارند؟",
        en: "What Is a Financial Statement Audit, and Which Companies Need One?",
      },
      excerpt: {
        fa: "حسابرسی را معمولاً فقط الزامی قانونی برای شرکت‌های بزرگ می‌دانند؛ اما در عمل، ابزاری برای اعتمادسازی نزد بانک، سرمایه‌گذار و حتی خود مدیران است.",
        en: "Audits are usually seen as just a legal requirement for large companies — but in practice, they're a tool for building trust with banks, investors, and even a company's own management.",
      },
      metaDescription: {
        fa: "تفاوت حسابرسی مستقل و بازرسی قانونی، الزام قانونی حسابرسی صورت‌های مالی برای چه شرکت‌هایی وجود دارد و فرآیند حسابرسی چگونه پیش می‌رود.",
        en: "The difference between an independent audit and a statutory inspector, which companies are legally required to audit their financial statements, and how the audit process works.",
      },
      coverTone: "blue",
      publishedAt: "2026-07-20",
      readingMinutes: 6,
      sections: [
        {
          paragraphs: [
            {
              fa: "حسابرسی صورت‌های مالی، بررسی مستقل و حرفه‌ای دفاتر و گزارش‌های مالی یک شرکت است تا مشخص شود آیا این گزارش‌ها، تصویری «منصفانه و درست» از وضعیت مالی شرکت ارائه می‌دهند یا نه. برخلاف تصور رایج، این فرآیند فقط برای شرکت‌های بزرگ یا بورسی کاربرد ندارد.",
              en: "A financial statement audit is an independent, professional review of a company's books and financial reports to determine whether they present a 'fair and true' picture of the company's financial position. Contrary to popular belief, this process isn't only relevant for large or publicly listed companies.",
            },
          ],
        },
        {
          heading: { fa: "الزام قانونی حسابرسی برای چه شرکت‌هایی وجود دارد؟", en: "Which Companies Are Legally Required to Be Audited?" },
          paragraphs: [
            {
              fa: "بر اساس مقررات، شرکت‌های سهامی عام، شرکت‌هایی که بالای سقف معینی از سرمایه ثبتی یا میزان فروش سالانه قرار دارند، و شرکت‌های متقاضی پذیرش در بورس یا فرابورس، ملزم به حسابرسی مستقل هستند. این سقف‌ها را می‌توان از سازمان حسابرسی یا مشاور مالی استعلام گرفت، چون بسته به مصوبات، ممکن است تغییر کند.",
              en: "Under the regulations, public joint-stock companies, companies above a certain threshold of registered capital or annual sales, and companies seeking a listing on the stock exchange or the OTC market are required to have an independent audit. These thresholds can be checked with the Audit Organization or a financial advisor, since they can change depending on new rulings.",
            },
          ],
        },
        {
          heading: { fa: "چرا شرکت‌های غیرملزم هم باید حسابرسی شوند؟", en: "Why Should Non-Mandatory Companies Get Audited Too?" },
          list: [
            {
              fa: "بانک‌ها برای اعطای تسهیلات، معمولاً صورت‌های مالی حسابرسی‌شده را ترجیح می‌دهند",
              en: "Banks usually prefer audited financial statements before granting facilities",
            },
            {
              fa: "سرمایه‌گذاران و شرکای بالقوه، پیش از هر مذاکره جدی، این گزارش را درخواست می‌کنند",
              en: "Investors and potential partners ask for this report before any serious negotiation",
            },
            {
              fa: "در فرآیند افزایش سرمایه، ارائه گزارش حسابرسی معتبر تقریباً همیشه ضروری است",
              en: "In a capital increase process, a valid audit report is almost always required",
            },
            {
              fa: "حسابرسی، نقاط ضعف کنترل داخلی را پیش از تبدیل‌شدن به بحران، آشکار می‌کند",
              en: "An audit reveals internal control weaknesses before they turn into a crisis",
            },
          ],
        },
        {
          heading: { fa: "تفاوت حسابرسی مستقل و بازرسی قانونی", en: "The Difference Between an Independent Audit and a Statutory Inspector" },
          paragraphs: [
            {
              fa: "بازرس قانونی، عضوی از ارکان شرکت سهامی خاص است که وظایف نظارتی مشخصی طبق قانون تجارت دارد و در مجمع عمومی انتخاب می‌شود. حسابرس مستقل اما از دیدگاهی حرفه‌ای و بی‌طرف، انطباق صورت‌های مالی با استانداردهای حسابداری را بررسی و درباره آن اظهارنظر می‌کند. در بسیاری از شرکت‌ها، این دو نقش هم‌زمان و گاه توسط یک مؤسسه ایفا می‌شود.",
              en: "A statutory inspector is a body of the private joint-stock company with defined oversight duties under the Commercial Code, elected at the general assembly. An independent auditor, on the other hand, reviews the financial statements from a professional, impartial standpoint and gives an opinion on their compliance with accounting standards. In many companies, both roles are filled at the same time, sometimes by the same firm.",
            },
          ],
        },
        {
          heading: { fa: "فرآیند حسابرسی چگونه پیش می‌رود؟", en: "How Does the Audit Process Work?" },
          list: [
            {
              fa: "برنامه‌ریزی: تعیین دامنه، زمان‌بندی و ریسک‌های حسابرسی",
              en: "Planning: defining the audit's scope, timeline, and risks",
            },
            {
              fa: "بررسی میدانی: مرور اسناد حسابداری، موجودی انبار و کنترل‌های داخلی",
              en: "Fieldwork: reviewing accounting records, inventory, and internal controls",
            },
            {
              fa: "تهیه گزارش: اظهارنظر حسابرس درباره انطباق صورت‌های مالی با استانداردها",
              en: "Reporting: the auditor's opinion on the financial statements' compliance with standards",
            },
            {
              fa: "پیشنهادهای اصلاحی: فهرستی از نقاط قابل بهبود در فرآیندهای مالی و کنترلی",
              en: "Recommendations: a list of improvement points in financial and control processes",
            },
          ],
        },
        {
          paragraphs: [
            {
              fa: "چه حسابرسی برای شما یک الزام قانونی باشد و چه ابزاری داوطلبانه برای اعتمادسازی، تیم مالی‌بان فرآیند را از برنامه‌ریزی تا تحویل گزارش نهایی مدیریت می‌کند.",
              en: "Whether an audit is a legal requirement for you or a voluntary tool for building trust, the Malibaan team manages the process from planning through delivery of the final report.",
            },
          ],
        },
      ],
    },
];

export const blogPosts: BlogPost[] = rawBlogPosts.map((raw) => localizePost(raw, "fa"));

export function getAllPosts(locale: string = "fa"): BlogPost[] {
  return rawBlogPosts.map((raw) => localizePost(raw, locale));
}

export function getPostBySlug(slug: string, locale: string = "fa"): BlogPost | undefined {
  const raw = rawBlogPosts.find((post) => post.slug === slug);
  return raw ? localizePost(raw, locale) : undefined;
}

export function getPostsByCategory(categorySlug: string, locale: string = "fa"): BlogPost[] {
  return rawBlogPosts
    .filter((post) => post.categorySlug === categorySlug)
    .map((raw) => localizePost(raw, locale));
}

export function getRelatedPosts(post: BlogPost, locale: string = "fa", limit = 3): BlogPost[] {
  return rawBlogPosts
    .filter((p) => p.slug !== post.slug && p.categorySlug === post.categorySlug)
    .slice(0, limit)
    .map((raw) => localizePost(raw, locale));
}

export function getCategoryInfo(categorySlug: string, locale: string = "fa") {
  const service = getServiceBySlug(categorySlug, locale);
  return {
    slug: categorySlug,
    label: service?.navLabel ?? categorySlug,
  };
}

export function getAllCategories(locale: string = "fa") {
  const slugs = Array.from(new Set(rawBlogPosts.map((post) => post.categorySlug)));
  return slugs.map((slug) => ({
    ...getCategoryInfo(slug, locale),
    count: getPostsByCategory(slug).length,
  }));
}
