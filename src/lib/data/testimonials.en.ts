import type { Testimonial } from "./testimonials.fa";

export const testimonials: Testimonial[] = [
  // company-registration
  {
    quote:
      "As a startup, we didn't know where to start. From the very first meeting, Malibaan mapped out our company registration and the right tax structure.",
    name: "Co-founder, tech startup",
    serviceSlugs: ["company-registration"],
  },
  {
    quote:
      "Our articles of association were rejected by the registrar on the first attempt. Malibaan redid all the paperwork properly, and it was done in under two weeks.",
    name: "CEO, parts import company",
    serviceSlugs: ["company-registration"],
  },
  {
    quote:
      "We registered our trademark at the same time as incorporating. If we'd waited, a competitor might have gotten there first.",
    name: "Founder, apparel brand",
    serviceSlugs: ["company-registration"],
  },

  // accounting
  {
    quote:
      "After years working with several different accountants, Malibaan was the first team whose reports I actually understood. I make financial decisions with a lot more confidence now.",
    name: "CEO, industrial parts manufacturer",
    serviceSlugs: ["accounting"],
  },
  {
    quote:
      "Our books were updated by a different person every month, with zero coordination. Malibaan assigned one dedicated expert who now knows our entire financial history.",
    name: "CFO, restaurant chain",
    serviceSlugs: ["accounting"],
  },
  {
    quote:
      "The cost report Malibaan prepared for us showed exactly which products weren't actually profitable. We overhauled our pricing completely.",
    name: "CEO, manufacturing workshop",
    serviceSlugs: ["accounting"],
  },

  // tax-consulting
  {
    quote:
      "During a tax audit, Malibaan's team stood by us and defended the case with precise documentation. The penalty we were bracing for never happened.",
    name: "CFO, import & distribution company",
    serviceSlugs: ["tax-consulting"],
  },
  {
    quote:
      "We used to pay a late-filing penalty every year because no one owned tracking the deadlines. Since working with Malibaan, that worry is completely gone.",
    name: "CEO, contracting firm",
    serviceSlugs: ["tax-consulting"],
  },
  {
    quote: "Malibaan suggested a legal way to reduce next year's tax bill that we hadn't even considered ourselves.",
    name: "CFO, trading company",
    serviceSlugs: ["tax-consulting"],
  },

  // vat
  {
    quote:
      "Getting onto the e-invoicing system seemed complicated. Malibaan rolled out the entire process in under two weeks without a single disruption to our sales.",
    name: "Founder, e-commerce store",
    serviceSlugs: ["vat"],
  },
  {
    quote:
      "We used to scramble every quarter to file our transaction reports. Now the whole process is automated and it's not something we worry about anymore.",
    name: "CFO, apparel wholesaler",
    serviceSlugs: ["vat"],
  },
  {
    quote: "We came close to a fine for missing e-invoices. Malibaan fixed our setup just in time.",
    name: "Owner, restaurant chain",
    serviceSlugs: ["vat"],
  },

  // payroll
  {
    quote:
      "As our team grew, payroll and insurance filings got complicated fast. Malibaan set up a monthly process that's never once been late or wrong since.",
    name: "HR Manager, construction contracting firm",
    serviceSlugs: ["payroll"],
  },
  {
    quote:
      "Getting our social security settlement clearance on our last project took months. This time, with Malibaan, it was done much faster and without any hassle.",
    name: "Project Manager, contracting firm",
    serviceSlugs: ["payroll"],
  },
  {
    quote:
      "Our staff constantly complained about payslip errors. Since Malibaan took over the calculations, those complaints have stopped entirely.",
    name: "CEO, manufacturing workshop",
    serviceSlugs: ["payroll"],
  },

  // audit
  {
    quote:
      "We needed a credible audit to raise capital. Malibaan's team coordinated the entire path, from preparing documents to the final meeting with the independent auditor.",
    name: "CEO, holding company raising capital",
    serviceSlugs: ["audit"],
  },
  {
    quote:
      "The internal controls Malibaan designed caught a serious financial weak point before it turned into a much bigger problem.",
    name: "CFO, mid-size manufacturer",
    serviceSlugs: ["audit"],
  },
  {
    quote: "Our bank asked for an audited report to renew our credit line. Malibaan had it ready in a short amount of time.",
    name: "CEO, trading company",
    serviceSlugs: ["audit"],
  },

  // intellectual-property
  {
    quote:
      "We discovered a competitor using a name very close to ours. Because we'd already registered our trademark with Malibaan, we could pursue legal action quickly.",
    name: "CEO, food products brand",
    serviceSlugs: ["intellectual-property"],
  },
  {
    quote:
      "To export to several countries in the region, we needed our trademark registered internationally. Malibaan managed the entire Madrid Protocol process for us.",
    name: "Export Manager, manufacturing company",
    serviceSlugs: ["intellectual-property"],
  },
  {
    quote:
      "We registered our product's industrial design late and ran into a copycat once already. This time, Malibaan handled the registration from day one.",
    name: "Product Designer, design studio",
    serviceSlugs: ["intellectual-property"],
  },

  // financial-consulting
  {
    quote:
      "We didn't have a presentable financial model to raise capital. Malibaan prepared a business plan and forecast that won the investor over in the very first meeting.",
    name: "CEO, startup raising capital",
    serviceSlugs: ["financial-consulting"],
  },
  {
    quote: "We didn't know which part of our business was actually profitable. Malibaan's financial analysis made it completely clear.",
    name: "CEO, multi-branch business",
    serviceSlugs: ["financial-consulting"],
  },
  {
    quote:
      "Instead of hiring a full-time CFO, we used Malibaan's outsourced CFO service — we got the same quality of advice for a fraction of the cost.",
    name: "CEO, growing mid-size company",
    serviceSlugs: ["financial-consulting"],
  },

  // business-legal
  {
    quote:
      "A contract we'd signed with a business partner turned out badly for us. Malibaan helped us structure the next one so it actually protected our interests.",
    name: "CEO, trading company",
    serviceSlugs: ["business-legal"],
  },
  {
    quote:
      "We had a long-running registry dispute that never got followed up properly. Malibaan's legal team pursued the entire case through to a final resolution.",
    name: "CEO, manufacturing company",
    serviceSlugs: ["business-legal"],
  },
  {
    quote:
      "Our team was still using an old, incomplete template for employment contracts. Malibaan rewrote them properly and brought them fully up to date.",
    name: "HR Manager, services company",
    serviceSlugs: ["business-legal"],
  },

  // digital-fintech
  {
    quote:
      "We no longer have to wait for the end-of-month report — Malibaan's dashboard keeps our sales and cash position in front of us at all times.",
    name: "CEO, e-commerce store",
    serviceSlugs: ["digital-fintech"],
  },
  {
    quote: "E-invoice issuance is now fully automated for us, and we no longer have any repetitive manual work.",
    name: "Operations Manager, retail chain",
    serviceSlugs: ["digital-fintech"],
  },
  {
    quote:
      "Connecting our bank account to our accounting software completely eliminated the monthly transaction-reconciliation nightmare.",
    name: "CFO, distribution company",
    serviceSlugs: ["digital-fintech"],
  },

  // homepage-only (general brand trust, not tied to a single service)
  {
    quote: "What sets Malibaan apart is that they genuinely stand alongside our business, not just send a monthly invoice.",
    name: "CEO, family-owned business",
    serviceSlugs: [],
  },
  {
    quote:
      "From incorporation to today, almost all of our financial and tax needs have been covered by one single team — that coordination is Malibaan's biggest value to us.",
    name: "CEO, trading company",
    serviceSlugs: [],
  },
  {
    quote: "In all these years, we've never once had to go hunting for a new specialist for a new financial problem. Malibaan has always been one step ahead.",
    name: "CFO, industrial company",
    serviceSlugs: [],
  },
];
