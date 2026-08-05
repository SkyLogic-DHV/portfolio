import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const existing = await prisma.project.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        thumbnail: body.thumbnail,
        gallery: typeof body.gallery === "string" ? body.gallery : JSON.stringify(body.gallery || []),
        shortDesc: body.shortDesc,
        longDesc: body.longDesc,
        techStack: typeof body.techStack === "string" ? body.techStack : JSON.stringify(body.techStack || []),
        githubUrl: body.githubUrl,
        demoUrl: body.demoUrl,
        year: body.year,
        duration: body.duration,
        category: body.category,
        status: body.status,
        featured: Boolean(body.featured),
        highlight: body.highlight,
        projectType: body.projectType,
        challenge: body.challenge,
        solution: body.solution,
        result: body.result,
        screenshots: typeof body.screenshots === "string" ? body.screenshots : JSON.stringify(body.screenshots || []),
        videoDemo: body.videoDemo,
        seoImage: body.seoImage,
        isActive: typeof body.isActive === "boolean" ? body.isActive : existing.isActive,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
