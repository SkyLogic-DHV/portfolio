import "dotenv/config";
import prisma from "../src/lib/utils/prisma.js";

const DEFAULT_SERVICES = [
  {
    icon: "Palette",
    title: "UI/UX Design",
    description:
      "Crafting intuitive interfaces and seamless user journeys that balance beauty with function — turning ideas into experiences people love.",
    cta: "Start Now",
    price: "450K",
    features: [
      "Wireframing & Prototyping",
      "User Research & Flow",
      "Visual Design (Figma)",
      "Interactive Mockups",
      "Design System & Asset Export",
    ],
    popular: false,
    displayOrder: 1,
  },
  {
    icon: "Globe",
    title: "Website",
    description:
      "Building clean, high-performance websites that represent your brand with clarity and precision across all devices and browsers.",
    cta: "Start Now",
    price: "500K",
    features: [
      "Responsive Design",
      "Basic SEO Optimization",
      "Integrasi Form Kontak",
      "Performa & Kecepatan Tinggi",
      "Termasuk Hosting Standard",
    ],
    popular: false,
    displayOrder: 2,
  },
  {
    icon: "Wrench",
    title: "Maintenance Web",
    description:
      "Ensuring your digital assets run smoothly with regular updates, performance optimization, and proactive technical support.",
    cta: "Start Now",
    price: "500K",
    features: [
      "Pembaruan Keamanan",
      "Backup Data Berkala",
      "Monitoring Uptime",
      "Perbaikan Bug & Error",
      "Dukungan Teknis Bulanan",
    ],
    popular: false,
    displayOrder: 3,
  },
  {
    icon: "AppWindow",
    title: "Web Application",
    description:
      "Developing full-featured web applications with robust architecture, smooth interactions, and scalable backend systems built for continuous growth.",
    cta: "Choose Web App",
    price: "1.5M",
    features: [
      "Full Custom Development",
      "Sistem Autentikasi User (OAuth/JWT)",
      "Integrasi Database Kompleks",
      "Dashboard Admin Interaktif",
      "API Development & Integration",
      "Scalable Cloud Architecture",
    ],
    popular: true,
    displayOrder: 4,
  },
];

const DEFAULT_STACK = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Bootstrap",
  "Node.js",
  "PostgreSQL",
  "MariaDB",
  "MySQL",
  "Supabase",
  "Express.js",
  "Prisma",
  "Git",
  "Figma",
  "Postman",
  "Vercel",
];

const DEFAULT_PROJECTS = [
  {
    title: "Enterprise ERP Dashboard",
    slug: "enterprise-erp-dashboard",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gallery:
      '["https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"]',
    shortDesc:
      "Scalable ERP dashboard with real-time analytics, role-based access, and a modular admin system.",
    longDesc:
      "A full-featured ERP dashboard covering finance, inventory, HR, and project operations. Built with a robust architecture, real-time analytics, and granular role-based access so every team works from a single source of truth.",
    techStack: JSON.stringify(["Next.js", "TypeScript", "Prisma", "MySQL", "Tailwind"]),
    githubUrl: "https://github.com/skylogic",
    demoUrl: "https://skylogic.id",
    year: "2025",
    duration: "4 Months",
    category: "Website Application",
    status: "Completed",
    featured: true,
    highlight: "Real-time analytics & RBAC",
    projectType: "Enterprise",
    challenge:
      "Complex business logic must scale across dozens of teams while staying fast and secure.",
    solution:
      "Designed a modular backend with cached API layers, server-side rendering, and an RBAC system.",
    result:
      "Cut reporting time by 60% and unified operations across a single secure dashboard.",
    screenshots: "[]",
    videoDemo: "",
    seoImage: "",
    isActive: true,
  },
  {
    title: "Corporate Website SkyLogic",
    slug: "corporate-website-skylogic",
    thumbnail:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
    gallery:
      '["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80"]',
    shortDesc:
      "High-performance company profile site with CMS, SEO optimization, and blazing-fast page loads.",
    longDesc:
      "A modern corporate website for SkyLogic featuring a custom content management system, multilingual-ready pages, Appointment scheduling, and on-page SEO tuned for search visibility.",
    techStack: JSON.stringify(["Next.js", "Tailwind", "Prisma", "MariaDB"]),
    githubUrl: "",
    demoUrl: "https://skylogic.id",
    year: "2025",
    duration: "2 Months",
    category: "Website",
    status: "Completed",
    featured: true,
    highlight: "Custom CMS & SEO-first",
    projectType: "Enterprise",
    challenge:
      "Non-technical teams need to publish content daily without touching code.",
    solution:
      "Shipped a headless-style admin panel so content, services, and pricing are managed visually.",
    result:
      "Lighthouse scores above 95 and a content workflow the team can manage in minutes.",
    screenshots: "[]",
    videoDemo: "",
    seoImage: "",
    isActive: true,
  },
  {
    title: "Smart Inventory Management",
    slug: "smart-inventory-management",
    thumbnail:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80",
    gallery:
      '["https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80"]',
    shortDesc:
      "Real-time stock tracking with barcode scanning, low-stock alerts, and purchase order automation.",
    longDesc:
      "An inventory system that tracks stock in real time, supports barcode scanning, sends low-stock alerts, and automates purchase orders — reducing manual work and stockouts.",
    techStack: JSON.stringify(["React", "Node.js", "Express", "PostgreSQL", "Tailwind"]),
    githubUrl: "https://github.com/skylogic",
    demoUrl: "https://skylogic.id",
    year: "2024",
    duration: "3 Months",
    category: "Website Application",
    status: "Completed",
    featured: true,
    highlight: "Barcode scan & stock alerts",
    projectType: "Enterprise",
    challenge:
      "Manual stock counting led to frequent stockouts and over-orders across multiple warehouses.",
    solution:
      "Built barcode-scan-aware flows with predictive low-stock thresholds and automated POs.",
    result:
      "Reduced stockouts by 45% and saved ~8 hours of manual counting every week.",
    screenshots: "[]",
    videoDemo: "",
    seoImage: "",
    isActive: true,
  },
  {
    title: "Fintech Landing & Application Portal",
    slug: "fintech-landing-portal",
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    gallery:
      '["https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"]',
    shortDesc:
      "Conversion-focused landing page with an integrated application portal and secure API integrations.",
    longDesc:
      "A fintech launch site combining a high-converting landing page with an application portal, secure KYC-style forms, and API integrations for payments and verification.",
    techStack: JSON.stringify(["Next.js", "TypeScript", "Prisma", "MySQL"]),
    githubUrl: "",
    demoUrl: "https://skylogic.id",
    year: "2024",
    duration: "2 Months",
    category: "Website",
    status: "Completed",
    featured: true,
    highlight: "Conversion-focused & secure",
    projectType: "Enterprise",
    challenge:
      "Fast, trustworthy first impression plus a frictionless application flow with strict data security.",
    solution:
      "Optimized for Core Web Vitals with encrypted form handling and a streamlined application wizard.",
    result:
      "Application completions doubled after launch with a 98/100 performance score.",
    screenshots: "[]",
    videoDemo: "",
    seoImage: "",
    isActive: true,
  },
  {
    title: "E-Commerce Mobile Experience",
    slug: "ecommerce-mobile-experience",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    gallery:
      '["https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80"]',
    shortDesc:
      "UI/UX design system and high-fidelity prototypes for a mobile-first e-commerce storefront.",
    longDesc:
      "A complete UI/UX overhaul for an e-commerce brand: user research, wireframes, design system, and high-fidelity prototypes validated through usability testing.",
    techStack: JSON.stringify(["Figma", "Design System", "Prototyping"]),
    githubUrl: "",
    demoUrl: "https://skylogic.id",
    year: "2025",
    duration: "5 Weeks",
    category: "UI/UX",
    status: "Completed",
    featured: false,
    highlight: "Design system & usability-tested",
    projectType: "Startup",
    challenge:
      "High cart abandonment caused by a confusing checkout flow and inconsistent brand visuals.",
    solution:
      "Rebuilt the design system, simplified the checkout, and validated every screen with usability tests.",
    result:
      "Checkout drop-off fell by 38% and the new design language shipped to 12 product screens.",
    screenshots: "[]",
    videoDemo: "",
    seoImage: "",
    isActive: true,
  },
  {
    title: "Community Radio Streaming Platform",
    slug: "community-radio-streaming",
    thumbnail:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
    gallery:
      '["https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80"]',
    shortDesc:
      "Live audio streaming platform with a broadcast dashboard, playlist automation, and listener analytics.",
    longDesc:
      "A community radio platform that lets hosts stream live, schedule playlists, moderate chat, and view real-time listener analytics from a single dashboard.",
    techStack: JSON.stringify(["Node.js", "Express", "WebRTC", "PostgreSQL", "Tailwind"]),
    githubUrl: "https://github.com/skylogic",
    demoUrl: "https://skylogic.id",
    year: "2024",
    duration: "4 Months",
    category: "Website Application",
    status: "In Progress",
    featured: false,
    highlight: "Live streaming & listener analytics",
    projectType: "Community",
    challenge:
      "Delivering low-latency audio to many simultaneous listeners without blowing up bandwidth costs.",
    solution:
      "Used WebRTC broadcasting with an HLS fallback and adaptive bitrate for stable streams.",
    result:
      "Supported 500+ concurrent listeners with under 2 seconds of latency on average.",
    screenshots: "[]",
    videoDemo: "",
    seoImage: "",
    isActive: true,
  },
];

const DEFAULT_PUBLIC_SERVICES = [
  {
    icon: "Palette",
    title: "UI/UX Design",
    description:
      "Crafting intuitive interfaces and seamless user journeys that balance beauty with function — turning ideas into experiences people love.",
    displayOrder: 1,
  },
  {
    icon: "AppWindow",
    title: "Website Application",
    description:
      "Developing full-featured web applications with robust architecture, smooth interactions, and scalable backend systems built for continuous growth.",
    displayOrder: 2,
  },
  {
    icon: "Globe",
    title: "Website",
    description:
      "Building clean, high-performance websites that represent your brand with clarity and precision across all devices and browsers.",
    displayOrder: 3,
  },
  {
    icon: "Wrench",
    title: "Website Maintenance",
    description:
      "Ensuring your digital assets run smoothly with regular updates, performance optimization, and proactive technical support.",
    displayOrder: 4,
  },
];

async function main() {
  const admins = [
    { email: "moluscaxyz@gmail.com", username: "moluscaxyz" },
    { email: "heratonyputri@gmail.com", username: "heratonyputri" },
    { email: "meriaamelia01@gmail.com", username: "meriaamelia01" },
  ];

  for (const admin of admins) {
    await prisma.adminUser.upsert({
      where: { email: admin.email },
      update: { deactive: false },
      create: {
        email: admin.email,
        username: admin.username,
        deactive: false,
      },
    });
    console.log(`✅ Upserted admin: ${admin.email}`);
  }

  const existingContact = await prisma.contactInfo.findUnique({ where: { id: "default" } });
  if (!existingContact) {
    await prisma.contactInfo.create({ data: { id: "default" } });
    console.log("✅ Created default ContactInfo");
  }

  const existingSite = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (!existingSite) {
    await prisma.siteSetting.create({ data: { id: "default" } });
    console.log("✅ Created default SiteSetting");
  }

  const existingTeamInfo = await prisma.teamSectionInfo.findUnique({ where: { id: "default" } });
  if (!existingTeamInfo) {
    await prisma.teamSectionInfo.create({ data: { id: "default" } });
    console.log("✅ Created default TeamSectionInfo");
  }

  // Services: seed default so the public site matches "web public" content.
  const existingServices = await prisma.service.findMany({ select: { title: true } });
  const existingTitles = new Set(existingServices.map((s) => s.title));
  for (const svc of DEFAULT_SERVICES) {
    if (existingTitles.has(svc.title)) continue;
    await prisma.service.create({
      data: {
        ...svc,
        features: JSON.stringify(svc.features),
      },
    });
    console.log(`✅ Created service: ${svc.title}`);
  }

  // Tech Stack: seed the default public list so admin matches what's shown.
  const existingStack = await prisma.techStack.findMany({ select: { name: true } });
  const existingNames = new Set(existingStack.map((s) => s.name));
  for (let i = 0; i < DEFAULT_STACK.length; i++) {
    const name = DEFAULT_STACK[i];
    if (existingNames.has(name)) continue;
    await prisma.techStack.create({
      data: { name, displayOrder: i, isActive: true },
    });
    console.log(`✅ Created stack: ${name}`);
  }

  // Featured Engineering Projects: seed default so the public section is populated.
  const existingProjects = await prisma.project.findMany({ select: { slug: true } });
  const existingSlugs = new Set(existingProjects.map((p) => p.slug));
  for (const project of DEFAULT_PROJECTS) {
    if (existingSlugs.has(project.slug)) continue;
    await prisma.project.create({ data: project });
    console.log(`✅ Created project: ${project.title}`);
  }

  // Public Services ("We Provide The Best Services" section).
  const existingPublicServices = await prisma.publicService.findMany({ select: { title: true } });
  const existingPsTitles = new Set(existingPublicServices.map((s) => s.title));
  for (const svc of DEFAULT_PUBLIC_SERVICES) {
    if (existingPsTitles.has(svc.title)) continue;
    await prisma.publicService.create({ data: svc });
    console.log(`✅ Created public service: ${svc.title}`);
  }

  console.log("🎉 Seed selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });