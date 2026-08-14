import { Navbar } from "@/components/frontend/Navbar";
import { WhatsAppButton } from "@/components/frontend/WhatsAppButton";
import SplashScreen from "@/components/ui/splash-screen";
import { prisma } from "@/lib/db";

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let siteSettings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  if (!siteSettings) {
    siteSettings = await prisma.siteSetting.create({ data: { id: "default" } });
  }

  let contact = await prisma.contactInfo.findUnique({ where: { id: "default" } });
  if (!contact) {
    contact = await prisma.contactInfo.create({ data: { id: "default" } });
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <Navbar siteName={siteSettings.siteName} />
      <SplashScreen>{children}</SplashScreen>
      <WhatsAppButton whatsapp={contact.whatsapp} />
    </div>
  );
}
