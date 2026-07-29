import { NextResponse } from "next/server";
import prisma from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (category && category !== "All") {
      where.category = category;
    }

    if (featured === "true") {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { shortDesc: { contains: search } },
        { techStack: { contains: search } },
      ];
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }
    
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug,
        thumbnail: body.thumbnail || "",
        gallery: typeof body.gallery === "string" ? body.gallery : JSON.stringify(body.gallery || []),
        shortDesc: body.shortDesc,
        longDesc: body.longDesc || body.shortDesc,
        techStack: typeof body.techStack === "string" ? body.techStack : JSON.stringify(body.techStack || []),
        githubUrl: body.githubUrl || "",
        demoUrl: body.demoUrl || "",
        client: body.client || "",
        year: body.year || "2026",
        duration: body.duration || "3 Months",
        category: body.category || "Website",
        status: body.status || "Completed",
        featured: Boolean(body.featured),
        highlight: body.highlight || "",
        projectType: body.projectType || "Enterprise",
        challenge: body.challenge || "",
        solution: body.solution || "",
        result: body.result || "",
        screenshots: typeof body.screenshots === "string" ? body.screenshots : JSON.stringify(body.screenshots || []),
        videoDemo: body.videoDemo || "",
        seoImage: body.seoImage || "",
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
