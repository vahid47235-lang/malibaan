import type { Service } from "./services.fa";

export const services: Service[] = [
  {
    slug: "accounting",
    navLabel: "Accounting & Bookkeeping",
    title: "Precise accounting and bookkeeping, always ready for tax season and the bank",
    eyebrow: "Accounting & Bookkeeping",
    metaDescription:
      "Accounting and bookkeeping services for Iranian businesses: a standardized chart of accounts, disciplined daily entries, and monthly management reports from a dedicated Malibaan expert.",
    heroDescription:
      "We turn your books from a chore you keep putting off into a tool you actually use to make decisions — with a standardized chart of accounts, disciplined bookkeeping, and reports you can genuinely read.",
    benefits: [
      {
        title: "A chart of accounts built for how you actually operate",
        description:
          "We design your chart of accounts around your industry, transaction volume, and reporting needs — not a generic template applied to every business.",
      },
      {
        title: "Disciplined entries and monthly bank reconciliation",
        description:
          "Daily transactions are recorded and your bank statement is reconciled every month, so nothing slips through and year-end doesn't come with surprises.",
      },
      {
        title: "Always audit- and tax-ready",
        description:
          "Because your books are kept standardized and current from day one, your documentation is ready to hand over the moment an audit, a bank facility application, or a tax review comes up.",
      },
    ],
    problems: [
      "Messy books that turn preparing an annual report into a crisis",
      "A chart of accounts that doesn't match accounting standards or what your auditor expects",
      "No clear management reporting to guide pricing, cost, and working-capital decisions",
      "Late fees from entries and tax returns that weren't filed on time",
    ],
    process: [
      {
        title: "Reviewing your current books",
        description: "We assess your existing books and records to identify weak spots in coding and entries.",
      },
      {
        title: "Designing your chart of accounts",
        description: "We design and implement a standardized chart of accounts suited to your business.",
      },
      {
        title: "Entries and monthly bank reconciliation",
        description: "Every transaction is recorded on a regular schedule and reconciled against your bank statement each month.",
      },
      {
        title: "Delivering management reports",
        description: "You get a monthly profit-and-loss statement, balance sheet, and cost analysis in plain language.",
      },
    ],
    industries: ["Manufacturing & industrial", "Trading & wholesale", "E-commerce", "Clinics & medical centers"],
    faq: [
      {
        question: "Can accounting be done remotely, with cloud tools?",
        answer:
          "Yes — most Malibaan clients work with us remotely. Documents are received by file or cloud accounting software, and reports are delivered to you online.",
      },
      {
        question: "How is the monthly accounting fee calculated?",
        answer:
          "Cost depends on transaction volume, monthly entry count, and the complexity of your business. After a free initial review, we give you a clear, fixed quote — not a variable, unpredictable one.",
      },
      {
        question: "Do you set up accounting software too?",
        answer:
          "Yes. If needed, we set up accounting software suited to your business, implement your initial chart of accounts in it, and train your team to use it day to day.",
      },
      {
        question: "Do you handle the legal stamping of statutory ledgers too?",
        answer:
          "Yes, we handle stamping your journal and general ledgers through the Companies Registration Office before the fiscal year-end, so you avoid the penalty for missing that deadline.",
      },
    ],
    relatedSlugs: ["tax-consulting", "audit", "digital-fintech"],
    offerings: [
      "Maintaining statutory ledgers (journal and general ledger)",
      "Recording daily accounting entries and transactions",
      "Preparing financial statements (balance sheet, P&L, cash flow)",
      "Payroll accounting",
      "Cost accounting",
      "Periodic management reporting",
      "Year-end closing",
      "Accounting software implementation and support",
      "Project and contract accounting",
    ],
  },
  {
    slug: "tax-consulting",
    navLabel: "Tax Advisory",
    title: "Tax advisory: accurate returns and a defense before the tax authority",
    eyebrow: "Tax Advisory",
    metaDescription:
      "Tax advisory and preparation of income and VAT returns, legitimate tax-reduction planning, and representation before tax dispute resolution boards with the Malibaan team.",
    heroDescription:
      "Tax should be a predictable cost, not a surprise threat. We prepare your returns precisely and, if you face an objection or inspection, we defend your case before the dispute resolution boards.",
    benefits: [
      {
        title: "Accurate, on-time tax return filing",
        description:
          "We prepare your income and VAT returns based on your actual books and legal documentation, so no discrepancy turns up in a later tax review.",
      },
      {
        title: "Legitimate tax planning",
        description:
          "We make full, legal use of exemptions, regional incentives, and preferential rates the law makes available to you.",
      },
      {
        title: "Representation before dispute resolution boards",
        description:
          "If you receive a tax assessment notice or claim, we prepare the necessary documentation and defend your case at the tax dispute resolution board hearings.",
      },
    ],
    problems: [
      "Steep penalties from missing or late tax return filings",
      "Returns rejected by the tax auditor over discrepancies with your books or incomplete documents",
      "Not knowing which exemptions and incentives could have lowered your tax bill",
      "Receiving a high tax assessment notice without knowing how to object to it legally",
    ],
    process: [
      {
        title: "Reviewing your tax file",
        description: "We review your tax history, prior returns, and the current state of your file.",
      },
      {
        title: "Preparing and filing your return",
        description: "We prepare your income and VAT returns to match your books and file them within the legal deadline.",
      },
      {
        title: "Handling any assessment notice",
        description: "If you receive an assessment notice, we prepare the documentation needed to object.",
      },
      {
        title: "Representing you at the dispute board",
        description: "We attend the dispute resolution board hearings and defend your business's legal rights.",
      },
    ],
    industries: ["Manufacturing & industrial", "Contracting & construction", "Import & export", "Service businesses"],
    faq: [
      {
        question: "What's the penalty for not filing a tax return?",
        answer:
          "The penalty for not filing an income tax return is 30% of the tax due, and it can't be waived. On top of that, you lose that year's legal exemptions — which is why filing on time is our team's top priority.",
      },
      {
        question: "Do small businesses qualify for tax exemptions too?",
        answer:
          "Depending on your business activity and income level, various exemptions exist for small and medium businesses under Iran's Direct Taxes Act. In our initial review session, we identify which exemptions apply to your business.",
      },
      {
        question: "What should I do if I receive a tax assessment notice?",
        answer:
          "From the date the notice is served, you have a limited window (usually 30 days) to object. During that time we prepare the documentation and defense needed and present it to the tax dispute resolution board.",
      },
    ],
    relatedSlugs: ["vat", "accounting"],
    offerings: [
      "Preparing and filing income tax returns",
      "Calculating and paying payroll tax",
      "Tax defense and case representation",
      "Legitimate tax-optimization advisory",
      "Following up on tax clearance certificates and inquiries",
    ],
  },
  {
    slug: "vat",
    navLabel: "E-Invoicing & VAT",
    title: "Full setup and management of the tax e-invoicing system and VAT",
    eyebrow: "E-Invoicing & VAT",
    metaDescription:
      "Registration and connection to Iran's tax e-invoicing system, compliant e-invoice issuance, and VAT return preparation without penalties, implemented by Malibaan.",
    heroDescription:
      "The tax authority's e-invoicing system has become a constant source of fines for many businesses. Malibaan's team manages your connection, invoice issuance, and VAT reporting completely and error-free.",
    benefits: [
      {
        title: "Correctly connecting your point-of-sale software",
        description:
          "We connect your POS system, accounting software, or invoicing tool to the e-invoicing platform so every sale is recorded correctly and on time.",
      },
      {
        title: "Issuing compliant e-invoices",
        description:
          "We configure your invoice format and content to match the tax authority's latest requirements, so no discrepancy shows up in VAT reporting.",
      },
      {
        title: "Periodic VAT reconciliation and reporting",
        description:
          "We reconcile every period's purchases and sales against issued invoices and file your VAT return accurately and on time.",
      },
    ],
    problems: [
      "Steep fines for missing or incomplete e-invoices",
      "Discrepancies between sales reports and your VAT return",
      "Errors connecting point-of-sale software to the e-invoicing system",
      "Confusion over which goods and services are VAT-exempt",
    ],
    process: [
      {
        title: "Assessing your registration status",
        description: "We review your current registration status on the e-invoicing and VAT systems.",
      },
      {
        title: "Connecting your point-of-sale software",
        description: "We connect and test your POS system or accounting software with the e-invoicing platform.",
      },
      {
        title: "Training your team on invoicing",
        description: "We train your sales team on issuing compliant e-invoices correctly.",
      },
      {
        title: "Periodic reporting",
        description: "We prepare and file your VAT return each period based on your recorded invoices.",
      },
    ],
    industries: ["Retail & chain stores", "Restaurants & cafés", "E-commerce", "Wholesalers"],
    faq: [
      {
        question: "What exactly is the tax e-invoicing system, and who does it apply to?",
        answer:
          "It's a real-time e-invoicing platform for businesses and companies that has gradually become mandatory for most businesses. Exact eligibility depends on your business type and sales volume, which we determine in our initial review.",
      },
      {
        question: "What's the penalty for not registering invoices in the system?",
        answer:
          "Penalties for missing or unregistered e-invoices can run to several multiples of the transaction value, and apply repeatedly for each violation — which is why getting the connection right from the start matters so much.",
      },
      {
        question: "What's the difference between VAT and the e-invoicing system?",
        answer:
          "The e-invoicing system covers recording and issuing electronic invoices, while VAT covers calculating and paying tax based on those same invoices. The two are connected but are separate processes — we manage both.",
      },
    ],
    relatedSlugs: ["tax-consulting", "accounting"],
    offerings: [
      "Preparing and filing quarterly VAT returns",
      "Quarterly transaction reporting (purchases and sales)",
      "E-invoicing system registration and setup",
    ],
  },
  {
    slug: "payroll",
    navLabel: "Payroll & Social Insurance",
    title: "Payroll and social insurance, accurate and on time every month",
    eyebrow: "Payroll & Social Insurance",
    metaDescription:
      "Payroll calculation, social security filing, workshop code registration, and settlement clearances — Malibaan's HR-adjacent services for employers.",
    heroDescription:
      "Payroll, social security filings, and settlement clearances are areas where the smallest error leads to a fine or an unhappy employee. Malibaan handles these processes accurately, on schedule, and in line with labor law, every month.",
    benefits: [
      {
        title: "Accurate payroll under labor law",
        description:
          "We calculate base pay, overtime, housing allowance, child allowance, year-end bonus, and severance according to the latest Ministry of Labor directives, so neither employer nor employee loses out.",
      },
      {
        title: "Social security filings, on time and error-free",
        description:
          "Your monthly social security list is prepared and filed ahead of the deadline, so you avoid late-filing penalties or list discrepancies.",
      },
      {
        title: "Workshop codes and project settlement clearances",
        description:
          "For contractors and project-based employers, we handle getting a workshop code from the Social Security Organization and following up on end-of-project settlement clearances.",
      },
    ],
    problems: [
      "Errors calculating overtime, year-end bonus, or severance that lead to labor complaints",
      "Late-filing penalties on social security lists",
      "Settlement clearance requests rejected over discrepancies between the insurance list and the contract",
      "Not knowing how to get a workshop code for contracting projects",
    ],
    process: [
      {
        title: "Reviewing contracts and pay structure",
        description: "We review your employment contracts and current payroll structure.",
      },
      {
        title: "Preparing the monthly insurance list",
        description: "We prepare your Social Security list every month to match your staff's actual pay.",
      },
      {
        title: "Filing with Social Security",
        description: "We register the list and contributions with the Social Security Organization ahead of the deadline.",
      },
      {
        title: "Following up on settlement clearances",
        description: "For projects and contracting work, we follow the settlement clearance process through to completion.",
      },
    ],
    industries: ["Contracting & construction", "Manufacturing & workshops", "Fast-growing startups"],
    faq: [
      {
        question: "What is a workshop code, and when is it needed?",
        answer:
          "A workshop code is an identifier the Social Security Organization issues for each workplace or contracting project, and it's required to file that project's insurance list. For construction contractors, getting this code before a project starts matters a great deal.",
      },
      {
        question: "How long does a Social Security settlement clearance usually take?",
        answer:
          "Depending on the project type and how complete the documentation is, review and issuance can take anywhere from a few weeks to a few months. Keeping insurance lists precise from the start of the project shortens this considerably.",
      },
      {
        question: "Do you update payroll calculations every year?",
        answer:
          "Yes — minimum wage, housing allowance, and other benefits change annually under the Supreme Labor Council's ruling, and we update every client's payroll calculations to match the latest directive each year.",
      },
    ],
    relatedSlugs: ["accounting", "audit"],
    offerings: [
      "Employee registration and insurance list filing",
      "Contribution calculation and monthly list submission",
      "Following up on Social Security settlement clearances",
      "Labor law and insurance advisory",
    ],
  },
  {
    slug: "audit",
    navLabel: "Audit & Internal Controls",
    title: "Independent audit and internal controls for reliable growth",
    eyebrow: "Audit & Internal Controls",
    metaDescription:
      "Financial statement audit services and internal-control implementation for companies raising capital, seeking bank facilities, or preparing for a tax review.",
    heroDescription:
      "An audit report is your business's credibility document with banks, the tax authority, and investors. Malibaan's team independently audits your financial statements and puts the internal controls in place for sustainable growth.",
    benefits: [
      {
        title: "An audit report banks and the tax authority accept",
        description:
          "Your financial statements are reviewed against Iranian auditing standards and a report is prepared that holds up in bank facility applications or tax reviews.",
      },
      {
        title: "Spotting control weaknesses before they become problems",
        description:
          "During the audit, we identify internal-control gaps — like unnecessary access privileges or incomplete approval processes — and recommend fixes.",
      },
      {
        title: "More credibility for raising capital and attracting investors",
        description:
          "Audited financial statements are the first document investors and partners ask for when evaluating your business.",
      },
    ],
    problems: [
      "A bank or investor rejecting your financials for lack of an independent audit",
      "Internal fraud or error going undetected for lack of timely controls",
      "Not being prepared for a tax audit or authority review",
      "A capital increase stalling without a credible audit report",
    ],
    process: [
      {
        title: "Audit planning",
        description: "We define the scope, timeline, and risk areas for auditing your financial statements.",
      },
      {
        title: "Reviewing documents and internal controls",
        description: "We review your accounting records, approval workflows, and existing internal controls.",
      },
      {
        title: "Preparing the audit report",
        description: "An independent audit report is prepared in line with Iranian auditing standards.",
      },
      {
        title: "Delivering improvement recommendations",
        description: "You get a list of areas to strengthen in your internal controls, along with a practical fix for each.",
      },
    ],
    industries: ["Companies raising capital", "Holding companies & corporate groups", "Large and mid-size manufacturers"],
    faq: [
      {
        question: "Which companies are required to have an independent audit?",
        answer:
          "Under Iranian regulation, public joint-stock companies, companies above certain capital or revenue thresholds, and companies applying for a capital increase or stock exchange listing are required to have an independent audit. For many other companies, a voluntary audit also builds significant credibility with banks and investors.",
      },
      {
        question: "What's the difference between an independent auditor and a statutory inspector?",
        answer:
          "A statutory inspector is a company officer with specific oversight duties under Iran's Commercial Code; an independent auditor reviews the financial statements from a professional, impartial standpoint and opines on whether they comply with accounting standards. Many companies fill both roles at the same time.",
      },
      {
        question: "How is the audit fee determined?",
        answer:
          "Fees vary based on the volume of your financial statements, the number of branches or warehouses, and how complex your operations are. After a free initial review, we give you a clear cost estimate.",
      },
    ],
    relatedSlugs: ["accounting", "tax-consulting", "financial-consulting"],
    offerings: [
      "Independent audit of financial statements",
      "Tax audit",
      "Internal audit",
      "Operational audit",
      "Special audit (fraud investigation and case review)",
      "Statutory inspection (principal and alternate inspector)",
      "IT audit",
      "Assurance services",
    ],
  },
  {
    slug: "financial-consulting",
    navLabel: "Financial & Management Advisory",
    title: "Financial & management advisory: make business decisions on data, not guesswork",
    eyebrow: "Financial & Management Advisory",
    metaDescription:
      "Business plans, budgeting, financial statement analysis, company valuation, and outsourced CFO services — for financial decisions grounded in data.",
    heroDescription:
      "Many of the biggest business decisions — raising capital, pricing, expansion, or cost cuts — get made without proper financial analysis. Malibaan brings the tools and experience of a professional finance team to make those decisions clear.",
    benefits: [
      {
        title: "Analysis grounded in numbers, not gut feeling",
        description:
          "Every recommendation we make is based on real financial statements, financial ratios, and comparison against industry benchmarks — not guesswork or personal experience.",
      },
      {
        title: "A CFO-level view, without a full-time hire",
        description:
          "With our outsourced CFO service, your business gets access to executive-level financial advisory without the cost and commitment of hiring a full-time CFO.",
      },
      {
        title: "Ready for the room with an investor or a bank",
        description:
          "We prepare business plans, management reports, and financial models so they hold up in a meeting with an investor, a bank, or your board.",
      },
    ],
    problems: [
      "You've decided to raise capital or take out a loan, but don't have a presentable financial model",
      "You don't know which product or business line is actually profitable",
      "There's no annual budget, or it's never compared against actual performance",
      "You have no independent financial analysis for a merger, a share sale, or a company valuation",
    ],
    process: [
      {
        title: "Reviewing your current financial position",
        description: "We analyze your financial statements, cost structure, and revenue model.",
      },
      {
        title: "Defining the goal and the key question",
        description: "We pin down what this advisory is for: raising capital, cutting costs, pricing, or valuation.",
      },
      {
        title: "Building the model and financial report",
        description: "Based on that goal, we prepare the right financial model, business plan, or analytical report.",
      },
      {
        title: "Supporting you in the decision meeting",
        description: "We can join you in the meeting with your board, bank, or investor, or prepare the documentation you'll need to make your case.",
      },
    ],
    industries: [
      "Startups raising capital",
      "Growing and scaling companies",
      "Holding companies & corporate groups",
      "Family businesses transitioning management",
    ],
    faq: [
      {
        question: "What exactly does an outsourced CFO do?",
        answer:
          "On a periodic or project basis, this service gives your business financial analysis, budgeting, management reporting, and advisory on major financial decisions — without needing to hire a full-time CFO.",
      },
      {
        question: "How does Malibaan help with raising capital from investors?",
        answer:
          "We prepare your business plan, financial model, and cash-flow forecast, and if needed, advise on evaluating investor offers or negotiation sessions too.",
      },
      {
        question: "Is this service only for large companies?",
        answer:
          "No. Plenty of small and mid-size businesses need this kind of analysis for decisions like pricing or product profitability — we scale the service to fit your business's size.",
      },
    ],
    relatedSlugs: ["accounting", "audit"],
    offerings: [
      "Business plans & feasibility studies",
      "Budgeting and budget control",
      "Financial statement and ratio analysis",
      "Investment advisory and company valuation",
      "Long-term tax and financial planning",
      "M&A advisory",
      "Management reporting for boards and investors",
      "Outsourced CFO services",
    ],
  },
  {
    slug: "business-legal",
    navLabel: "Business Legal Services",
    title: "Handle contracts and business disputes with legal confidence",
    eyebrow: "Business Legal Services",
    metaDescription:
      "Drafting and reviewing commercial and employment contracts, business legal advisory, and handling corporate registry disputes — legal support alongside your accounting and tax work.",
    heroDescription:
      "A lot of business disputes and losses trace back to a weak contract or a legal opinion sought too late. Alongside our financial services, Malibaan provides the legal support your business needs for contracts and commercial disputes.",
    benefits: [
      {
        title: "A contract that holds up in court, too",
        description:
          "We draft or review your commercial and employment contracts so that, if a dispute arises, they actually protect your business's interests.",
      },
      {
        title: "Advice before the decision, not after the dispute",
        description:
          "Before you sign a contract, bring on a new partner, or make a structural change, we review the potential legal risk.",
      },
      {
        title: "Coordinated with your financial and tax file",
        description:
          "Because our team already has full visibility into your financial and tax position, our legal advice stays consistent with your business's actual finances.",
      },
    ],
    problems: [
      "A contract signed without legal review that later became a source of dispute",
      "Employment contracts with staff or contractors not built on a standard, compliant template",
      "A dispute or registry complaint has come up and the path forward is unclear",
      "No independent legal advice available for negotiations or ownership structure changes",
    ],
    process: [
      {
        title: "Reviewing the situation or the existing document",
        description: "We review the contract, dispute, or legal matter at hand and identify the risks.",
      },
      {
        title: "Drafting or revising the legal document",
        description: "We draft the contract or filing needed, in line with current law and your business's interests.",
      },
      {
        title: "Negotiation or legal follow-up",
        description: "If needed, we stand with you in negotiations with the other party or in following up a case with the relevant authorities.",
      },
      {
        title: "Wrapping up and documentation",
        description: "We document the final outcome and related paperwork so it can be relied on in the future.",
      },
    ],
    industries: [
      "Companies entering new partnership agreements",
      "Businesses with a large workforce",
      "Companies in a registry or contract dispute",
      "Startups negotiating with investors",
    ],
    faq: [
      {
        question: "Does this replace a licensed attorney?",
        answer:
          "For commercial advisory and contract drafting, our team works directly with you. For court cases requiring formal legal representation, we coordinate with our partner attorneys to keep your path forward seamless.",
      },
      {
        question: "What do you check when drafting an employment contract?",
        answer:
          "Things like contract type (fixed-term or permanent), working hours, pay and benefits, and termination terms — set up under labor law and matched to your business's actual needs, so it doesn't become a point of dispute later.",
      },
      {
        question: "How long do registry disputes usually take to resolve?",
        answer:
          "Depending on the type of dispute (a registry objection or a contract disagreement, for example) and the administrative or judicial steps involved, it can range from a few weeks to a few months — we give you a realistic estimate at the first session.",
      },
    ],
    relatedSlugs: ["company-registration", "intellectual-property"],
    offerings: [
      "Drafting and reviewing contracts",
      "Business legal advisory",
      "Following up on registry disputes and complaints",
      "Drafting employment contracts",
    ],
  },
  {
    slug: "digital-fintech",
    navLabel: "Digital & Fintech Services",
    title: "Online accounting and real-time reporting — your business's finances in one dashboard",
    eyebrow: "Digital & Fintech Services",
    metaDescription:
      "Online accounting software implementation, reporting dashboards, automated e-invoicing, and bank and payment-gateway integration — for digital financial management.",
    heroDescription:
      "You no longer have to wait for a monthly report to see where your business stands financially. Malibaan's digital accounting tools keep your financial standing available in an online dashboard, all the time.",
    benefits: [
      {
        title: "Financial reporting, not just at month-end",
        description:
          "With an online dashboard, you can check your sales, costs, and cash position whenever you want — not just in a monthly report.",
      },
      {
        title: "Automated e-invoice issuance",
        description:
          "We automate issuing invoices and registering them on the e-invoicing system, cutting out repetitive manual work.",
      },
      {
        title: "Direct bank and payment-gateway integration",
        description:
          "By integrating your bank account and payment gateways with your accounting software, transactions get recorded without manual entry and with far fewer errors.",
      },
    ],
    problems: [
      "Recording documents and invoices is still fully manual and time-consuming",
      "You have to wait for your accountant's report at month-end to see where your business stands",
      "Your current accounting software doesn't match your business's real needs",
      "Reconciling bank transactions against your books turns into an error-prone project every month",
    ],
    process: [
      {
        title: "Assessing your current process",
        description: "We review how you currently record entries, issue invoices, and generate reports.",
      },
      {
        title: "Selecting and implementing the right tool",
        description: "We implement the online accounting software or platform suited to your business's size and type.",
      },
      {
        title: "Connecting your bank, payment gateway, and e-invoicing system",
        description: "We connect your bank accounts, payment gateways, and e-invoice issuance to the system.",
      },
      {
        title: "Training your team and ongoing support",
        description: "We train your internal team on the new dashboard and tools, and continue providing technical and accounting support.",
      },
    ],
    industries: [
      "E-commerce stores",
      "Startups and digital businesses",
      "Businesses with high daily transaction volume",
      "Multi-branch businesses",
    ],
    faq: [
      {
        question: "Do we need to drop our current accounting software?",
        answer:
          "Not necessarily. We first review your current software; if it can be integrated and extended, we optimize it — otherwise, we recommend a better-suited alternative.",
      },
      {
        question: "What information does the online reporting dashboard show?",
        answer:
          "Depending on your needs, it typically covers sales, costs, cash position, receivables and payables balances, and your tax standing — online and always up to date.",
      },
      {
        question: "How is financial data kept secure on these online tools?",
        answer:
          "We use reputable platforms and tools with controlled access, and access to your financial dashboard is limited to authorized people in your business and the expert responsible for your file.",
      },
    ],
    relatedSlugs: ["accounting", "vat"],
    offerings: [
      "Online accounting software/platform",
      "Online reporting dashboard for clients",
      "Invoice automation and e-invoicing",
      "Payment gateway and bank integration",
    ],
  },
  {
    slug: "company-registration",
    navLabel: "Company & Trademark Registration",
    title: "Company and trademark registration, done right, without the office visits",
    eyebrow: "Company & Trademark Registration",
    metaDescription:
      "Registering private joint-stock and limited liability companies, drafting articles of association, Official Gazette filing, and trademark registration with Malibaan — fast, compliant, and rejection-free.",
    heroDescription:
      "From choosing the right company type to the Official Gazette filing and trademark registration, Malibaan manages every legal step of launching your business with a lawyer's precision and an execution team's speed.",
    benefits: [
      {
        title: "Choosing the right company type for your goals",
        description:
          "We review the differences between a private joint-stock company, an LLC, and a cooperative based on your business activity, number of partners, and growth plans, so you start on the right path from day one.",
      },
      {
        title: "Flawless articles of association and documentation",
        description:
          "Most registration delays come down to incomplete documents or non-standard articles of association; we prepare your paperwork so it's approved on the registrar's first review.",
      },
      {
        title: "Trademark registration alongside incorporation",
        description:
          "If you don't register your business name or logo right away, a competitor might register it first. We put trademark registration on the agenda from day one.",
      },
    ],
    problems: [
      "Documents rejected at the Companies Registration Office over incomplete articles of association or filings",
      "Choosing the wrong company type, which creates tax or liability costs down the line",
      "Failing to register your trademark, and the risk of a competitor using the same name or logo",
      "Confusion over obtaining a tax ID and national ID number after registration",
    ],
    process: [
      {
        title: "Advisory on choosing your company type",
        description: "Based on your activity, partners, and growth plan, we recommend the best legal structure (private joint-stock, LLC, or cooperative).",
      },
      {
        title: "Preparing articles of association and filings",
        description: "We prepare and sign all required documents in line with the latest Companies Registration Office guidelines.",
      },
      {
        title: "Registering and publishing in the Official Gazette",
        description: "We file and follow up your case in the Companies Registration Office system until your incorporation notice is published in the Official Gazette.",
      },
      {
        title: "Getting your tax ID and registering your trademark",
        description: "After incorporation, we obtain your tax ID, and if needed, run the trademark registration process alongside it.",
      },
    ],
    industries: ["Startups & digital businesses", "Import & export", "Manufacturing & industrial", "E-commerce"],
    faq: [
      {
        question: "What's the difference between a private joint-stock company and an LLC?",
        answer:
          "In a private joint-stock company, capital is divided into shares, and at least three shareholders and two inspectors are required — well suited to businesses planning a future capital increase, a new investor, or even a stock exchange listing, since the share structure makes ownership transfer simpler. In an LLC, capital is divided into partnership stakes rather than tradeable shares, at least two partners are required, and no statutory inspector is needed, making the paperwork simpler. We recommend based on your structure and goals.",
      },
      {
        question: "How long does company registration usually take?",
        answer:
          "With complete documentation, it typically takes 10 to 20 business days from filing to your incorporation notice appearing in the Official Gazette. Delays usually come from incomplete documents, which careful preparation from the start eliminates.",
      },
      {
        question: "Can the company type or capital be changed later?",
        answer:
          "Yes — changing your company type, increasing capital, changing partners, or changing your business activity can all be done by preparing shareholder meeting minutes and filing the amendment. We handle these as separate services too.",
      },
      {
        question: "How long does a trademark registration stay valid?",
        answer:
          "A registered trademark in Iran is valid for 10 years and must be renewed before that period ends. We track renewal deadlines for Malibaan clients.",
      },
    ],
    relatedSlugs: ["accounting", "tax-consulting", "intellectual-property"],
    offerings: [
      "Company registration (private/public joint-stock, LLC, general partnership, cooperative)",
      "Registering branches and representative offices of foreign companies",
      "Registering non-commercial institutions",
      "Filing company amendments (name, activity, address, capital, directors, shareholders)",
      "Filing shareholder and board meeting minutes (ordinary/extraordinary)",
      "Company dissolution and liquidation",
      "Obtaining a tax ID and national ID number",
      "Obtaining an import/export Chamber of Commerce card",
      "Tax system registration",
      "Drafting articles of association and partnership agreements",
    ],
  },
  {
    slug: "intellectual-property",
    navLabel: "Trademark & IP Registration",
    title: "Trademark, patent, and industrial design registration: legal protection for your business's intellectual property",
    eyebrow: "Intellectual Property",
    metaDescription:
      "Domestic and international (Madrid Protocol) trademark registration, patent and industrial design registration, name searches, and legal follow-up on trademark oppositions with Malibaan.",
    heroDescription:
      "Your business's name, logo, inventions, and designs are assets — not just a name on a sign. Malibaan makes your intellectual property legally protected and defensible, from search and registration through legal defense against infringement.",
    benefits: [
      {
        title: "A thorough search before you register",
        description:
          "Before taking any action, we check your desired name and trademark against domestic and international registries so you don't get rejected over a similar or already-registered mark.",
      },
      {
        title: "International registration via the Madrid Protocol",
        description:
          "If you're planning to export or operate in foreign markets, we pursue trademark registration across multiple countries at once through the Madrid Protocol.",
      },
      {
        title: "Defense against infringement and opposition",
        description:
          "If a competitor uses your trademark without permission, or your registration faces an opposition, our team pursues the case before the relevant authorities and defends your ownership rights.",
      },
    ],
    problems: [
      "A competitor has already registered your business's name or logo under their own name",
      "A trademark was registered without a prior search and later faced an opposition or cancellation",
      "An invention or industrial design is at risk of being copied without formal registration",
      "International trademark registration for export seems like an unclear, complicated process",
    ],
    process: [
      {
        title: "Search and initial review",
        description: "We check your desired name, logo, or invention against registries to confirm it can be registered.",
      },
      {
        title: "Preparing documents and the registration filing",
        description: "We prepare the technical documents or design needed (patent certificate, industrial design, or trademark application) to the registrar's standard.",
      },
      {
        title: "Following up with the Industrial Property Office",
        description: "We follow the review process, publication notice, and final registration through to the official certificate.",
      },
      {
        title: "Renewal and ongoing monitoring",
        description: "After registration, we track renewal dates and monitor for any potential misuse of your trademark.",
      },
    ],
    industries: [
      "Startups & digital businesses",
      "Manufacturers with a proprietary brand",
      "Exporters",
      "Knowledge-based businesses",
    ],
    faq: [
      {
        question: "How long does trademark registration take?",
        answer:
          "Assuming no opposition, it typically takes six to twelve months from filing the application to the official trademark certificate being issued; an initial search before you start significantly reduces the risk of an opposition.",
      },
      {
        question: "What's the difference between a patent and an industrial design registration?",
        answer:
          "A patent covers a new, functional technical solution, while an industrial design protects the visual shape, pattern, or ornamentation of a product. Many products need both forms of protection at once.",
      },
      {
        question: "What should I do if someone uses my registered trademark without permission?",
        answer:
          "With official trademark registration, you can pursue both civil and criminal claims against the infringer. Our team prepares the necessary documentation and manages the legal follow-up process.",
      },
    ],
    relatedSlugs: ["company-registration", "business-legal"],
    offerings: [
      "Trademark registration (domestic and international/Madrid Protocol)",
      "Name and trademark search",
      "Patent registration",
      "Industrial design registration",
      "Trademark renewal and amendments",
      "Trademark opposition and IP legal follow-up",
    ],
  },
];
