export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  summary: string;
  role: string;
  tags: string[];
  problem: string;
  build: string[];
  outcome: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "citic-pacific",
    title: "Enterprise onboarding platform & CMS",
    client: "CITIC Pacific",
    summary:
      "A self-serve onboarding and orientation platform for one of Hong Kong's largest conglomerates — React CMS for HR, Node + PostgreSQL behind it.",
    role: "Full-stack developer — frontend CMS, REST API, database schema, deployment",
    tags: ["React", "Ant Design", "Node.js", "PostgreSQL", "Express", "Nginx"],
    problem:
      "New-hire onboarding and orientation ran on manual processes. HR needed to publish and reorder orientation content, build forms, and pull reports — without a developer in the loop for every change.",
    build: [
      "React CMS frontend (Ant Design) with drag-and-drop content ordering (react-beautiful-dnd), so HR could restructure orientation flows visually.",
      "Dynamic form builder (Formeo) for HR-authored questionnaires — no developer needed for new forms.",
      "CSV export of responses and attendance for HR reporting.",
      "Express + knex API on PostgreSQL; JWT auth via Passport; file uploads via multer.",
      "Deployed to Ubuntu with Nginx, documented for handover.",
    ],
    outcome:
      "HR took over content, forms and reporting without developer involvement — orientation flows restructured in the CMS, questionnaires authored in the form builder, attendance pulled as CSV. The platform was documented and handed over to run independently.",
  },
  {
    slug: "puyi-optical",
    title: "Luxury retail campaign microsites",
    client: "Puyi Optical",
    summary:
      "Campaign sites for luxury eyewear launches — Gucci, Gentle Monster, David Beckham Eyewear — built to brand-guideline fidelity on retail deadlines.",
    role: "Frontend developer — campaign sites, bilingual content, asset pipeline",
    tags: ["HTML/CSS/JS", "Bilingual EN/TC", "Luxury retail", "Performance"],
    problem:
      "Each brand launch needed a fast, image-heavy campaign site that honoured strict luxury brand guidelines, shipped in both English and Traditional Chinese, and went live on the brand's retail calendar — non-negotiable dates.",
    build: [
      "Static campaign microsites per launch (Gucci eyewear, Gentle Monster, David Beckham Eyewear, SmartLife Pro lenses) — lean hand-written pages, no framework overhead.",
      "Bilingual EN/TC page variants with shared asset pipelines.",
      "Heavy product photography and video optimised for fast loads on retail-floor and mobile connections.",
      "Brand-guideline review cycles with each label's regional team.",
    ],
    outcome:
      "Every launch shipped on the brand's retail calendar — non-negotiable dates, all hit — with each label's regional team signing off on guideline fidelity. The bilingual pipeline meant EN and TC variants always launched together.",
  },
  {
    slug: "utm-christmas-party",
    title: "Live event check-in & lucky draw",
    client: "UTM Group — annual Christmas party",
    summary:
      "Self-service guest check-in with real-time sync and a lucky draw that ran live on stage — React, Socket.IO and SQLite doing event-night duty.",
    role: "Designer & developer — the whole thing",
    tags: ["React", "Socket.IO", "Express", "SQLite", "Real-time"],
    problem:
      "150+ guests arriving at once, a check-in desk bottleneck, and a lucky draw that had to run flawlessly in front of the whole company — with no second chances on the night.",
    build: [
      "Self-service check-in: guests find themselves via partial-match search (suggestions after 3 characters) and see their table number.",
      "Socket.IO keeps every kiosk and the host screen in sync in real time — a guest checking in appears instantly in the draw pool.",
      "Lucky draw selects only from checked-in guests and tracks winners to prevent duplicates.",
      "Guest lists imported from CSV (multer + csv-parse) into SQLite — simple, reliable, runs anywhere.",
      "Failure planning: local-first stack with no external dependencies on event night.",
    ],
    outcome:
      "Ran live on the night for 150+ guests — the check-in desk bottleneck disappeared, and the draw executed on stage without a hitch.",
  },
];

// Earlier agency work — websites & web apps
export const earlierWork = [
  {
    name: "Designnow Limited",
    note: "Full-stack ecommerce for a design & branding studio — payments, file upload, order tracking, integrated supplier platform.",
  },
  {
    name: "Manulife Financial Centre",
    note: "Property website revamp for a local real-estate developer.",
  },
  {
    name: "Best Employee & Employer Award",
    note: "Event website for HKSMEA & JCI Dragon's annual award.",
  },
  {
    name: "Million Production & Promotion",
    note: "Company site for a local event production house.",
  },
];
