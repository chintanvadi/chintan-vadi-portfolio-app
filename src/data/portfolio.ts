export type Track = "frontend" | "backend";

export type ProjectCategory = "extension" | "saas" | "fintech" | "web";

export type PreviewKind = "dashboard" | "scraper" | "inbox" | "sourcing" | "ops" | "wallet" | "calculator";

export interface Project {
  slug: string;
  company: string;
  role: string;
  track: Track;
  category: ProjectCategory;
  start: number;
  end: number;
  period: string;
  tagline: string;
  summary: string;
  challenge: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  tech: string[];
  integrations: string[];
  accent: string;
  preview: PreviewKind;
  featured?: boolean;
}

export const profile = {
  name: "Chintan Vadi",
  firstName: "Chintan",
  title: "Full Stack Developer",
  headline: "Frontend Lead · Browser Extensions · SaaS Platforms",
  location: "Ahmedabad, India",
  timezone: "Asia/Kolkata",
  email: "chintanvadi8980@gmail.com",
  github: "https://github.com/chintanvadi",
  linkedin: "https://linkedin.com/in/chintan-vadi",
  resume: "/Chintan-Vadi-Resume.docx",
  current: { role: "Frontend Lead Developer", company: "Asset Hero", slug: "asset-hero" },
  summary:
    "Full Stack Developer with 6+ years of experience building scalable web applications, browser extensions, SaaS platforms, dashboards, and API-driven integrations — across the full lifecycle from frontend architecture to production deployment.",
  languages: ["English", "Hindi", "Gujarati"],
  education: {
    degree: "BCA",
    school: "Saurashtra University, Rajkot",
    college: "S.V.E.T. College, Jamnagar",
    year: "2015",
    score: "7.6 CGPI",
  },
};

export const stats = [
  { value: 6, label: "Years shipping production code", suffix: "+" },
  { value: 7, label: "Products delivered end-to-end", suffix: "" },
  { value: 20, label: "Third-party integrations shipped", suffix: "+" },
  { value: 4, label: "Extension ecosystems mastered", suffix: "" },
];

export const chapters = [
  {
    id: "lead",
    years: "2025 — Now",
    slugs: ["asset-hero", "dealerpromoter"],
    title: "Frontend leadership",
    body: "Leading the frontend of a multi-tenant SaaS platform — architecture, integrations, GDPR, testing and CI — while shipping MV3 tooling on the side.",
  },
  {
    id: "extensions",
    years: "2021 — 2024",
    slugs: ["getmyinvoices", "simplerecruiter"],
    title: "Extension specialist",
    body: "Moved to where users actually work: Chrome, Gmail, Thunderbird and Outlook extensions that pull recruiting and invoicing workflows into the browser.",
  },
  {
    id: "backend",
    years: "2018 — 2021",
    slugs: ["hotghst", "abey-apay", "smarter-loans"],
    title: "Backend foundations",
    body: "WordPress calculators, then Laravel ecosystems for blockchain fintech and agency operations — learning how data, money and permissions really flow.",
  },
];

export const projects: Project[] = [
  {
    slug: "asset-hero",
    company: "Asset Hero",
    role: "Frontend Lead Developer",
    track: "frontend",
    category: "saas",
    start: 2025,
    end: 2026,
    period: "2025 — 2026",
    tagline: "Multi-tenant property operations portal",
    summary:
      "Property and asset management platform with multi-tenant architecture and role-based access control.",
    challenge:
      "Property operators were juggling CCTV, door access, accounting, e-signatures and CRM across separate tools. The goal: one portal where every tenant sees exactly what their role allows — and nothing else.",
    highlights: [
      "Led the frontend for a multi-tenant property operations portal with role-based access control, asset management and user administration.",
      "Integrated live CCTV streaming over WebRTC and connected financial workflows with Xero and Google Sheets.",
      "Wired up LockVue access control, GoHighLevel marketing/sales workflows and DocuSign e-signatures.",
      "Shipped GDPR self-service: data export, account deletion and cookie consent.",
      "Established CI with automated Vitest suites and dependency vulnerability scanning.",
    ],
    metrics: [
      { value: "5", label: "Third-party platforms" },
      { value: "RBAC", label: "Multi-tenant access" },
      { value: "CI", label: "Vitest + vuln scanning" },
    ],
    tech: ["React 19", "TypeScript", "Vite", "TanStack Query", "Tailwind CSS", "Zod", "Vitest", "WebRTC"],
    integrations: ["Xero", "Google Sheets", "LockVue", "GoHighLevel", "DocuSign"],
    accent: "#c8ff3d",
    preview: "dashboard",
    featured: true,
  },
  {
    slug: "dealerpromoter",
    company: "DealerPromoter",
    role: "Frontend Developer",
    track: "frontend",
    category: "extension",
    start: 2025,
    end: 2025,
    period: "2025",
    tagline: "No-code web scraping extension + admin dashboard",
    summary: "No-code web scraping Chrome Extension (Manifest V3) and administration dashboard.",
    challenge:
      "Non-technical teams needed to extract structured data from dealer websites without writing selectors. The extension had to turn a few clicks on a live page into a reliable, repeatable scraping flow.",
    highlights: [
      "Built a Manifest V3 extension that records scraping flows visually — users simply click elements on live pages.",
      "Engineered robust CSS selector generation that survives Shadow DOM boundaries and nested iframes.",
      "Designed a Chrome Side Panel interface for managing scraping flows without leaving the page.",
      "Delivered an admin dashboard with role-based auth, site monitoring, on-demand scraping triggers and webhook / CSV / JSON exports.",
    ],
    metrics: [
      { value: "MV3", label: "Manifest V3 native" },
      { value: "No-code", label: "Visual flow recorder" },
      { value: "3", label: "Export channels" },
    ],
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "React Query", "Chrome APIs (MV3)", "Sentry", "Axios"],
    integrations: ["Chrome Side Panel", "Webhooks", "CSV", "JSON"],
    accent: "#38bdf8",
    preview: "scraper",
    featured: true,
  },
  {
    slug: "getmyinvoices",
    company: "GetMyInvoices",
    role: "Frontend Developer",
    track: "frontend",
    category: "extension",
    start: 2023,
    end: 2024,
    period: "2023 — 2024",
    tagline: "Invoice capture inside Gmail, Thunderbird & Outlook",
    summary: "Email client integrations suite for Gmail, Thunderbird, and Outlook.",
    challenge:
      "Invoices arrive by email, but filing them was manual. Users wanted invoices captured right where they read mail — across three very different email platforms with three very different extension models.",
    highlights: [
      "Shipped production integrations across a Chrome/Gmail extension, a Thunderbird WebExtension and an Outlook Office Mail add-in.",
      "Connected each client to REST APIs powering AI-assisted invoice classification, multi-account workflows and duplicate detection.",
      "Built manual and automated import via context menus, inline actions, folder/tag rules and scheduled alarms.",
      "Delivered filterable activity logs with CSV export, full i18n and marketplace publishing.",
    ],
    metrics: [
      { value: "3", label: "Email clients" },
      { value: "AI", label: "Invoice classification" },
      { value: "i18n", label: "Multilingual UI" },
    ],
    tech: ["JavaScript", "Chrome Extensions", "Thunderbird WebExtensions", "Office.js", "InboxSDK", "REST APIs", "IndexedDB", "SQLite", "i18n", "Webpack"],
    integrations: ["Gmail", "Thunderbird", "Outlook", "InboxSDK"],
    accent: "#f472b6",
    preview: "inbox",
    featured: true,
  },
  {
    slug: "simplerecruiter",
    company: "NIXZ / SimpleRecruiter",
    role: "Frontend Developer",
    track: "frontend",
    category: "extension",
    start: 2021,
    end: 2022,
    period: "2021 — 2022",
    tagline: "Multi-ATS sourcing extension for recruiters",
    summary: "Multi-ATS Chrome Extension for recruiter candidate sourcing and ATS data import.",
    challenge:
      "Recruiters copy-pasted candidate profiles from job boards into their ATS by hand. The extension needed to source from many platforms and push clean data into many ATSs — without creating duplicates.",
    highlights: [
      "Developed a Chrome Extension that sources candidate profiles from LinkedIn, Indeed, Xing and other recruitment platforms.",
      "Implemented ATS integrations with OTYS, Carerix, Salesforce and Recruitee, including duplicate detection and application updates.",
      "Built in-browser profile scraping, CV generation/download and candidate evaluation updates.",
      "Supported multi-platform builds and production releases through the Chrome Web Store.",
    ],
    metrics: [
      { value: "4", label: "ATS integrations" },
      { value: "3+", label: "Sourcing platforms" },
      { value: "1-click", label: "Profile → ATS" },
    ],
    tech: ["JavaScript", "Chrome Extension API", "REST APIs", "OAuth", "Chrome Web Store"],
    integrations: ["LinkedIn", "Indeed", "Xing", "OTYS", "Carerix", "Salesforce", "Recruitee"],
    accent: "#a78bfa",
    preview: "sourcing",
    featured: true,
  },
  {
    slug: "hotghst",
    company: "Hot Ghost Writer (HotGHST)",
    role: "Backend Developer (Laravel)",
    track: "backend",
    category: "saas",
    start: 2021,
    end: 2021,
    period: "2021",
    tagline: "Unified operations hub for a ghostwriting agency",
    summary: "Role-based operations dashboard for client, employee, recruitment, and project workflows.",
    challenge:
      "Revenue, hiring, projects and support lived in six different SaaS tools. Leadership needed a single source of truth with KPIs that stayed in sync automatically.",
    highlights: [
      "Integrated Shopify, Asana, Zendesk, Airtable, Zoom and Trustpilot into a centralized operations platform.",
      "Implemented scheduled synchronization jobs and dashboards for revenue, hiring and customer-support KPIs.",
      "Developed role-based workflows and backend services with Laravel, REST APIs and scheduled Artisan jobs.",
    ],
    metrics: [
      { value: "6", label: "Platforms unified" },
      { value: "24/7", label: "Scheduled sync" },
      { value: "KPI", label: "Live dashboards" },
    ],
    tech: ["Laravel 6", "PHP", "MySQL", "Spatie Permissions", "DataTables", "REST APIs", "Artisan Scheduling", "Bootstrap", "jQuery"],
    integrations: ["Shopify", "Asana", "Zendesk", "Airtable", "Zoom", "Trustpilot"],
    accent: "#fb923c",
    preview: "ops",
  },
  {
    slug: "abey-apay",
    company: "Abey & aPay",
    role: "Backend Developer (Laravel)",
    track: "backend",
    category: "fintech",
    start: 2019,
    end: 2020,
    period: "2019 — 2020",
    tagline: "Blockchain fintech ecosystem & digital wallet",
    summary: "Multi-application Laravel ecosystem for a blockchain-based fintech product.",
    challenge:
      "A crypto product spanning a token marketplace, staking, wallets and card issuance — where every feature touches money, identity and compliance.",
    highlights: [
      "Delivered backend features for a token marketplace, mining packages, staking, crypto deposits/withdrawals and P2P transfers.",
      "Built digital-wallet functionality with KYC workflows, prepaid card issuance, invoice payments and merchant payment APIs.",
      "Implemented two-factor auth, role-based administration, multilingual support, real-time notifications and third-party integrations.",
    ],
    metrics: [
      { value: "KYC", label: "Compliance workflows" },
      { value: "2FA", label: "Secured accounts" },
      { value: "P2P", label: "Transfers & staking" },
    ],
    tech: ["Laravel", "PHP", "MySQL", "REST APIs", "Blockchain Integrations", "Payment Gateways", "KYC"],
    integrations: ["Payment Gateways", "KYC Providers", "Blockchain Nodes"],
    accent: "#facc15",
    preview: "wallet",
  },
  {
    slug: "smarter-loans",
    company: "Smarter Loans",
    role: "Backend Developer (WordPress)",
    track: "backend",
    category: "web",
    start: 2018,
    end: 2018,
    period: "2018",
    tagline: "Interactive loan & interest calculators",
    summary: "Loan calculator platform focused on interest and repayment calculations.",
    challenge:
      "Borrowers needed to understand the true cost of a loan before applying — instantly, and without a spreadsheet.",
    highlights: [
      "Developed interactive loan-calculation and interest-computation functionality within a WordPress application.",
    ],
    metrics: [
      { value: "Live", label: "Repayment maths" },
      { value: "WP", label: "WordPress platform" },
      { value: "2018", label: "Where it all started" },
    ],
    tech: ["WordPress", "jQuery", "MySQL"],
    integrations: [],
    accent: "#34d399",
    preview: "calculator",
  },
];

export const skillGroups = [
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Typed, fast, accessible interfaces built to scale with the product.",
    items: ["React.js", "Vue.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Vite", "TanStack Query", "HTML5", "CSS3"],
  },
  {
    id: "extensions",
    title: "Browser Extensions",
    blurb: "From Manifest V2 to V3, side panels to Office add-ins — I ship where users already work.",
    items: ["Chrome MV2 / MV3", "Chrome Side Panel API", "Thunderbird WebExtensions", "Outlook Add-ins", "Office.js", "InboxSDK"],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs, auth and background jobs that keep data flowing.",
    items: ["Node.js", "Laravel", "PHP", "REST API Design", "API Authentication", "Scheduled Jobs"],
  },
  {
    id: "architecture",
    title: "Architecture & Integration",
    blurb: "Multi-tenant systems glued to the tools businesses run on.",
    items: ["Multi-tenant Apps", "RBAC", "OAuth", "WebRTC", "Webhooks", "Web Scraping", "CSV / JSON"],
  },
  {
    id: "data",
    title: "Databases",
    blurb: "Relational, document and in-browser storage.",
    items: ["MySQL", "MongoDB", "IndexedDB", "SQLite"],
  },
  {
    id: "quality",
    title: "Testing & DevOps",
    blurb: "Confidence on every release.",
    items: ["Vitest", "Sentry", "CI/CD", "Automated Testing", "Dependency Scanning", "Webpack", "Chrome Web Store"],
  },
  {
    id: "tools",
    title: "Tools & Libraries",
    blurb: "The everyday kit behind clean data, auth and UI.",
    items: ["Axios", "Zod", "shadcn/ui", "React Query", "Spatie Permissions", "DataTables", "Bootstrap", "jQuery", "i18n"],
  },
];

/** Search terms used to find a skill inside project copy, when the label alone won't match. */
const skillAliases: Record<string, string[]> = {
  "React.js": ["react"],
  "JavaScript (ES6+)": ["javascript"],
  "TanStack Query": ["tanstack query", "react query"],
  "React Query": ["react query", "tanstack query"],
  "Chrome MV2 / MV3": ["chrome extension", "manifest v3", "mv3"],
  "Chrome Side Panel API": ["side panel"],
  "Thunderbird WebExtensions": ["thunderbird"],
  "Outlook Add-ins": ["outlook"],
  "REST API Design": ["rest api"],
  "API Authentication": ["oauth", "auth"],
  "Scheduled Jobs": ["scheduled", "artisan"],
  "Multi-tenant Apps": ["multi-tenant"],
  RBAC: ["role-based"],
  "Web Scraping": ["scraping"],
  "CSV / JSON": ["csv", "json"],
  "CI/CD": ["ci", "web store"],
  "Automated Testing": ["vitest"],
  "Dependency Scanning": ["vulnerability scanning"],
  "Chrome Web Store": ["chrome web store", "marketplace"],
  "Spatie Permissions": ["spatie"],
  i18n: ["i18n", "multilingual"],
};

export function projectsUsing(skill: string): Project[] {
  const terms = skillAliases[skill] ?? [skill.toLowerCase()];
  return projects.filter((p) => {
    const haystack = [...p.tech, ...p.integrations, ...p.highlights, p.summary].join(" · ").toLowerCase();
    return terms.some((t) => new RegExp(`(^|[^a-z])${t.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}s?([^a-z]|$)`).test(haystack));
  });
}

export const integrationLogos = [
  "Xero",
  "DocuSign",
  "Salesforce",
  "Shopify",
  "Google Sheets",
  "GoHighLevel",
  "LockVue",
  "Gmail",
  "Outlook",
  "Thunderbird",
  "LinkedIn",
  "Indeed",
  "Xing",
  "Recruitee",
  "Carerix",
  "OTYS",
  "Asana",
  "Zendesk",
  "Airtable",
  "Zoom",
  "Trustpilot",
  "Sentry",
];

export const workProcess = [
  {
    step: "01",
    title: "Understand the workflow",
    body: "I start with the people using the product — where they work, what slows them down, and which tools they can't leave.",
  },
  {
    step: "02",
    title: "Architect for change",
    body: "Typed contracts, clear data boundaries and RBAC from day one, so new tenants, roles and integrations slot in cleanly.",
  },
  {
    step: "03",
    title: "Ship where users are",
    body: "Dashboards, side panels, inbox add-ins — I meet users inside the tools they already have open.",
  },
  {
    step: "04",
    title: "Harden in production",
    body: "Vitest suites, Sentry monitoring, CI pipelines and dependency scanning keep releases boring — in the best way.",
  },
];

export const sections = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
] as const;
