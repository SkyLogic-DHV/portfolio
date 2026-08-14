import { NextResponse } from "next/server";
import prisma from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    let settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
    if (!settings) {
      settings = await prisma.siteSetting.create({ data: { id: "default" } });
    }
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updated = await prisma.siteSetting.upsert({
      where: { id: "default" },
      update: {
        siteName: body.siteName,
        logo: body.logo,
        favicon: body.favicon,
        footerText: body.footerText,
        copyright: body.copyright,
        primaryColor: body.primaryColor,
        secondaryColor: body.secondaryColor,
        darkModeDefault: Boolean(body.darkModeDefault),
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        ogImage: body.ogImage,
        robots: body.robots,
        sitemap: body.sitemap,
        pricingTag: body.pricingTag,
        pricingTitle: body.pricingTitle,
        pricingDescription: body.pricingDescription,
      },
      create: {
        id: "default",
        siteName: body.siteName || "SkyLogic",
        logo: body.logo || "",
        favicon: body.favicon || "",
        footerText: body.footerText || "",
        copyright: body.copyright || "",
        primaryColor: body.primaryColor || "#6366F1",
        secondaryColor: body.secondaryColor || "#06B6D4",
        darkModeDefault: true,
        metaTitle: body.metaTitle || "SkyLogic",
        metaDescription: body.metaDescription || "",
        ogImage: body.ogImage || "",
        robots: body.robots || "index, follow",
        sitemap: body.sitemap || "https://skylogic.id/sitemap.xml",
        pricingTag: body.pricingTag || "Transparent & Affordable",
        pricingTitle: body.pricingTitle || "Pricing Tailored to Your Needs",
        pricingDescription:
          body.pricingDescription || "Choose the plan that fits your vision. No hidden costs.",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating site settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
