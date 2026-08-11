import { AboutSection } from "@/components/frontend/AboutSection";
import { ContactSection } from "@/components/frontend/ContactSection";
import { HeroSection } from "@/components/frontend/HeroSection";
import { HowItWorksSection } from "@/components/frontend/HowItWorksSection";
import { LeaveYourMarkSection } from "@/components/frontend/LeaveYourMarkSection";
import { QuoteSection } from "@/components/frontend/QuoteSection";
import { PricingSection } from "@/components/frontend/PricingSection";
import { ProjectsSection } from "@/components/frontend/ProjectsSection";
import { ServicesSection } from "@/components/frontend/ServicesSection";
import { TechStackSection } from "@/components/frontend/TechStackSection";
import { VisitorTracker } from "@/components/frontend/VisitorTracker";
import { prisma } from "@/lib/db";
import type { LeaveYourMark } from "@prisma/client";

export const revalidate = 0; // Always dynamic from database

export default async function HomePage() {
  const hero = {
    title: "We Build From Scratch",
    subtitle: "Innovative Software & Systems",
    description: "SkyLogic creates high-performance web applications, mobile platforms, and custom software systems engineered to scale.",
    ctaButton: "Explore Projects",
    ctaLink: "#projects",
    bgImage: "",
    bgGradient: "from-slate-100 via-indigo-50 to-slate-200",
    badge: "SKYLOGIC // ENTERPRISE SOFTWARE ARCHITECTURE",
    partnerLogos: "[]",
    socialLinks: "[]",
    isOpenForProject: true,
  };

  let teamInfo = await prisma.teamSectionInfo.findUnique({ where: { id: "default" } });
  if (!teamInfo) {
    teamInfo = await prisma.teamSectionInfo.create({ data: { id: "default" } });
  }

  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { displayOrder: "asc" },
  });

  const projects = await prisma.project.findMany({
    where: { featured: true, isActive: true },
    orderBy: { createdAt: "desc" },
  });

  const techStack = await prisma.techStack.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  const publicServices = await prisma.publicService.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  const pricingServices = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });
  const normalizedServices = pricingServices.map((s) => {
    let features: string[] = [];
    if (Array.isArray((s as any).features)) {
      features = (s as any).features;
    } else if (typeof (s as any).features === "string") {
      try {
        const parsed = JSON.parse((s as any).features);
        features = Array.isArray(parsed) ? parsed : [];
      } catch {
        features = [];
      }
    }
    return { ...s, features };
  });

  const notes = await prisma.leaveYourMark.findMany();

  const initialNotes = notes.map((note: LeaveYourMark) => ({
    ...note,
    createdAt: note.createdAt.toISOString(),
  }));

  // const notes = await prisma.leaveYourMark.findMany({
  //   where: { isApproved: true, isHidden: false },
  //   orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  // });

  let contact = await prisma.contactInfo.findUnique({ where: { id: "default" } });
  if (!contact) {
    contact = await prisma.contactInfo.create({ data: { id: "default" } });
  }

  let siteSettings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (!siteSettings) {
    siteSettings = await prisma.siteSetting.create({ data: { id: "default" } });
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Realtime Visitor Tracker Client Component */}
      <VisitorTracker />

      {/* Subtle background pattern for light theme */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0 opacity-40" />

      <div className="relative z-10">
        {/* Navbar rendered globally in (frontend)/layout.tsx */}

        {/* Shared Background for Hero and Quote Sections */}
        <div className="relative w-full">
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 85% 65% at 8% 8%, rgba(56, 189, 248, 0.15), transparent 60%),
                radial-gradient(ellipse 75% 60% at 75% 35%, rgba(37, 99, 235, 0.1), transparent 62%),
                radial-gradient(ellipse 70% 60% at 15% 80%, rgba(59, 130, 246, 0.15), transparent 62%),
                radial-gradient(ellipse 70% 60% at 92% 92%, rgba(30, 58, 138, 0.12), transparent 62%),
                linear-gradient(180deg, #ffffff 0%, #f4f8fc 50%, #eef6ff 100%)
              `,
            }}
          />
          <div className="relative z-10">
            <HeroSection hero={hero} />
            <QuoteSection />
          </div>
        </div>

        <ServicesSection services={publicServices} />

        <ProjectsSection projects={projects} />
        {/* Unified Tech Stack & Pricing Section */}
        <div className="relative w-full bg-white overflow-hidden border-y border-gray-100">
          {/* Shared Wave Backgrounds - Varied */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Left Waves */}
            <svg className="absolute left-0 top-0 h-full w-[45%] max-w-[600px] text-[#2563EB]" viewBox="0 0 200 1600" preserveAspectRatio="none">
              <path d="M0,0 L120,0 C60,300 180,500 80,800 C-20,1100 140,1300 90,1600 L0,1600 Z" fill="currentColor" opacity="0.02" />
              <path d="M0,0 L80,0 C120,250 40,600 120,950 C180,1200 50,1400 110,1600 L0,1600 Z" fill="currentColor" opacity="0.03" />
              <path d="M0,0 L150,0 C90,400 220,700 100,1050 C30,1250 180,1450 60,1600 L0,1600 Z" fill="currentColor" opacity="0.04" />
            </svg>
            
            {/* Right Waves */}
            <svg className="absolute right-0 top-0 h-full w-[45%] max-w-[600px] text-[#2563EB]" viewBox="0 0 200 1600" preserveAspectRatio="none">
              <path d="M200,0 L80,0 C140,300 20,500 120,800 C220,1100 60,1300 110,1600 L200,1600 Z" fill="currentColor" opacity="0.02" />
              <path d="M200,0 L120,0 C80,250 160,600 80,950 C20,1200 150,1400 90,1600 L200,1600 Z" fill="currentColor" opacity="0.03" />
              <path d="M200,0 L50,0 C110,400 -20,700 100,1050 C170,1250 20,1450 140,1600 L200,1600 Z" fill="currentColor" opacity="0.04" />
            </svg>
          </div>
          
          <TechStackSection items={techStack} />
          <PricingSection
            whatsapp={contact.whatsapp}
            pricingTag={
              !siteSettings.pricingTag || siteSettings.pricingTag.includes("Transparan")
                ? "Transparent & Affordable"
                : siteSettings.pricingTag
            }
            pricingTitle={
              !siteSettings.pricingTitle || siteSettings.pricingTitle.includes("Layanan yang disesuaikan")
                ? "Services Tailored to Your Needs"
                : siteSettings.pricingTitle
            }
            pricingDescription={
              !siteSettings.pricingDescription ||
              siteSettings.pricingDescription.includes("Pilih layanan yang tepat")
                ? "Choose the right service to realize your vision. No hidden costs."
                : siteSettings.pricingDescription
            }
            services={normalizedServices.map((s) => ({
              id: s.id,
              name: s.title,
              description: s.description,
              price: s.price,
              features: s.features,
              popular: s.popular,
              ctaText: s.cta || "Start Now",
            }))}
          />
        </div>
        <HowItWorksSection />
        {/* <AboutSection info={teamInfo} members={teamMembers} /> */}
        <LeaveYourMarkSection initialNotes={initialNotes} />
        <ContactSection contact={contact} />

        {/* Dynamic Footer */}
        <footer className="py-12 border-t border-gray-200 bg-gray-50 text-center text-xs text-gray-500 font-mono">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-1">
              <span className="font-bold text-gray-800 text-sm">Sky</span>
              <span className="font-bold text-gray-800 text-sm">
                L<span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mx-0.5" />
                gic
              </span>
              <span className="ml-2 text-gray-400">| {siteSettings.footerText}</span>
            </div>
            <div className="text-gray-400">{siteSettings.copyright}</div>
          </div>
        </footer>
      </div>

    </main>
  );
}
