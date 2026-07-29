import { NextResponse } from "next/server";
import prisma from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    let hero = await prisma.heroSection.findUnique({ where: { id: "default" } });
    if (!hero) {
      hero = await prisma.heroSection.create({ data: { id: "default" } });
    }
    return NextResponse.json(hero);
  } catch (error) {
    console.error("Error fetching Hero section:", error);
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
    const updated = await prisma.heroSection.upsert({
      where: { id: "default" },
      update: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        ctaButton: body.ctaButton,
        ctaLink: body.ctaLink,
        bgImage: body.bgImage,
        bgGradient: body.bgGradient,
        badge: body.badge,
        partnerLogos: typeof body.partnerLogos === "string" ? body.partnerLogos : JSON.stringify(body.partnerLogos || []),
        socialLinks: typeof body.socialLinks === "string" ? body.socialLinks : JSON.stringify(body.socialLinks || []),
        isOpenForProject: Boolean(body.isOpenForProject),
      },
      create: {
        id: "default",
        title: body.title || "We Build From Scratch",
        subtitle: body.subtitle || "Innovative Software & Systems",
        description: body.description || "",
        ctaButton: body.ctaButton || "Explore Projects",
        ctaLink: body.ctaLink || "#projects",
        bgImage: body.bgImage || "",
        bgGradient: body.bgGradient || "from-slate-950 via-indigo-950 to-slate-950",
        badge: body.badge || "SKYLOGIC // ENTERPRISE SOFTWARE ARCHITECTURE",
        partnerLogos: JSON.stringify(body.partnerLogos || []),
        socialLinks: JSON.stringify(body.socialLinks || []),
        isOpenForProject: Boolean(body.isOpenForProject),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating Hero section:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
