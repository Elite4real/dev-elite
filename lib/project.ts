// lib/projects.ts
export type Category = "app" | "website";

export type Project = {
  title: string;
  slug: string;      // precomputed slug to avoid surprises
  category: Category;
  tag: string;
  img: string;       // /public/web/... or remote
  story: string;
  demo: string;
  caseStudy?: string;
  // case study fields
  overview?: string;
  problem?: string;
  approach?: string[];
  tech?: string[];
  results?: { label: string; value: string }[];
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    title: "Fabrico Manufacturing",
    slug: "manufacturing-website",
    category: "website",
    tag: "Next.js · TypeScript",
    img: "/web/Fabrico.png",
    story: "Fabrico — Smart Manufacturing. Plan, track, and optimize production with reliability.",
    demo: "https://fabrico-manufacturing.vercel.app/",
    caseStudy: "/work/manufacturing-website",
    overview:
      "A modern manufacturing site that communicates value clearly and loads fast. Built with the App Router, accessible components, and a conversion‑focused layout.",
    problem:
      "The client needed a site that feels premium, loads fast on emerging markets networks, and clearly explains product benefits to non‑technical buyers.",
    approach: [
      "Information architecture that mirrors buyer questions: ‘What is it?’, ‘How does it help?’, ‘Proof & integrations’.",
      "Visual system using light hero + dark capability blocks for scannability.",
      "Component library with cards, badges, and motion—kept subtle for performance.",
    ],
    tech: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    results: [
      { label: "CLS", value: "0.01" },
      { label: "LCP", value: "1.8s" },
      { label: "Pages", value: "10+" },
    ],
    gallery: [
      { src: "/web/Fabrico.png", alt: "Fabrico hero" },
      { src: "/web/Fabrico-section.png", alt: "Fabrico sections" },
    ],
  },
  {
    title: "Blinq Pay",
    slug: "blinqpay",
    category: "app",
    tag: "Laravel API · React Native · Zustand",
    img: "/web/blinq-pay.jpg",
    story: "Fintech bill payments: airtime, data, cable, electricity—with clean UX and safe retries.",
    demo: "#",
    caseStudy: "/work/blinqpay",
    overview:
      "A mobile fintech app for instant bill payments with a secure API, graceful retries, and simple flows.",
    problem:
      "Legacy flows were slow and confusing. We needed a unified purchase path with clear feedback and safe failure states.",
    approach: [
      "One‑screen purchase flow with progressive disclosure for advanced options.",
      "Optimistic UI + safe server checks; idempotent requests for refunds.",
      "Lightweight state with Zustand; clean separation between API and UI.",
    ],
    tech: ["React Native", "Expo", "Laravel API", "Zustand", "React Query"],
    results: [
      { label: "Checkout time", value: "-40%" },
      { label: "Error rate", value: "-60%" },
    ],
    gallery: [{ src: "/web/blinq-pay.jpg", alt: "Blinq Pay app" }],
  },
  {
    title: "realvillax",
    slug: "real-estate",
    category: "website",
    tag: "Laravel · Blade",
    img: "/web/realvillax.png",
    story: "Real estate platform with listings, map search, and agent workflows.",
    demo: "https://realvillax.org/",
    caseStudy: "/work/real-estate",
    overview:
      "SEO‑friendly real estate site with fast search, clean listing pages, and easy content updates.",
    problem:
      "Slow searches and high bounce rates. Needed snappy filters and strong listing detail pages.",
    approach: [
      "Server‑rendered pages with cached search endpoints.",
      "Structured data markup for listings, better snippet coverage.",
    ],
    tech: ["Laravel", "Blade", "Alpine.js", "MySQL"],
    results: [{ label: "Bounce rate", value: "-22%" }],
    gallery: [{ src: "/web/realvillax.png", alt: "Realvillax home" }],
  },
  {
    title: "Airdrop Empire",
    slug: "airdrop-empire",
    category: "app",
    tag: "Laravel API · React Native · Zustand",
    img: "/web/airdropempire.jpg",
    story: "Airdrop discovery app with tasks, alerts, and wallet integrations.",
    demo: "#",
    caseStudy: "/work/airdrop-empire",
    overview:
      "Mobile app to track airdrops, complete tasks, and get notified for deadlines.",
    approach: [
      "Task engine with completion rules and wallet checks.",
      "Local cache + server sync to survive poor connectivity.",
    ],
    tech: ["React Native", "Expo", "Laravel API", "Zustand"],
    results: [{ label: "DAU", value: "4.3k" }],
    gallery: [{ src: "/web/airdropempire.jpg", alt: "Airdrop Empire screens" }],
  },
  {
    title: "transwidelogistics",
    slug: "logistics-website",
    category: "website",
    tag: "Laravel API · Blade",
    img: "/web/transwidelogistics.png",
    story: "Logistics site with quotes, tracking, and CMS‑driven pages.",
    demo: "https://transwidelogistics.com/",
    caseStudy: "/work/logistics-website",
    overview:
      "Modern brand site for a logistics company; optimised forms and lead capture.",
    approach: [
      "Lightweight forms with spam prevention; CRM webhooks.",
      "Clear service taxonomy and routes for SEO.",
    ],
    tech: ["Laravel", "Blade", "MySQL"],
    results: [{ label: "Leads", value: "+31%" }],
    gallery: [{ src: "/web/transwidelogistics.png", alt: "Transwide hero" }],
  },
  {
    title: "maga dispatch",
    slug: "magadispatch",
    category: "app",
    tag: "Laravel API · React Native",
    img: "/web/magadispatch.png",
    story: "Logistics dispatching with driver app, statuses, and POD photos.",
    demo: "#",
    caseStudy: "/work/magadispatch",
    overview:
      "Dispatch app to assign loads, track drivers, and capture delivery proof.",
    approach: [
      "Status machine for loads; clean driver UI with offline capture.",
      "Push notifications and deep links to specific loads.",
    ],
    tech: ["React Native", "Laravel API", "Expo", "Firebase"],
    results: [{ label: "Dispatch time", value: "-35%" }],
    gallery: [{ src: "/web/magadispatch.png", alt: "Maga Dispatch app" }],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
