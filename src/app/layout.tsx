import type { Metadata } from "next";
import { Inter, Roboto_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SkyLogic — Fullstack Developer & UI Specialist",
  description:
    "Portfolio SkyLogic: jasa pengembangan web fullstack, dashboard interaktif, dan UI/UX modern. Dibangun dengan Next.js dan Prisma.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "SkyLogic",
    title: "SkyLogic — Fullstack Developer & UI Specialist",
    description:
      "Jasa pengembangan web fullstack, dashboard interaktif, dan UI/UX modern.",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className={`font-sans min-h-full flex flex-col bg-white text-gray-900 dark:bg-[#070A11] dark:text-slate-100 ${robotoMono.variable} ${montserrat.variable}`}>{children}</body>
    </html>
  );
}
