import { AboutSection } from "@/components/frontend/AboutSection";
import { ContactSection } from "@/components/frontend/ContactSection";
import { HeroSection } from "@/components/frontend/HeroSection";
import { LeaveYourMarkSection } from "@/components/frontend/LeaveYourMarkSection";
import { Navbar } from "@/components/frontend/Navbar";
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
    orderBy: { displayOrder: "asc" },
  });

  const services = await prisma.service.findMany({
    orderBy: { displayOrder: "asc" },
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
        <Navbar siteName={siteSettings.siteName} />
        <HeroSection hero={hero} />
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <TechStackSection items={techStack} />
        <AboutSection info={teamInfo} members={teamMembers} />
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
