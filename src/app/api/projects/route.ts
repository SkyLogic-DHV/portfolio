import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get("featured") === "true";

    const whereCondition = featuredOnly ? { featured: true } : {};

    const projects = await prisma.project.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data project." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Tidak memiliki hak akses." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, slug, description, content, image, demoUrl, githubUrl, tags, featured } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Judul dan deskripsi wajib diisi." },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    const projectSlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const newProject = await prisma.project.create({
      data: {
        title,
        slug: projectSlug,
        description,
        content: content || null,
        image: image || null,
        demoUrl: demoUrl || null,
        githubUrl: githubUrl || null,
        tags: Array.isArray(tags) ? tags.join(",") : (tags || ""),
        featured: Boolean(featured),
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/projects error:", error);
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { error: "Slug project sudah digunakan, gunakan judul lain." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Gagal membuat project baru." },
      { status: 500 }
    );
  }
}
