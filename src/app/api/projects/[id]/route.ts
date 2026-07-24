import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const project = await prisma.project.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil detail project." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Tidak memiliki hak akses." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { title, slug, description, content, image, demoUrl, githubUrl, tags, featured } = body;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Project tidak ditemukan." },
        { status: 404 }
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: title ?? existing.title,
        slug: slug ?? existing.slug,
        description: description ?? existing.description,
        content: content !== undefined ? content : existing.content,
        image: image !== undefined ? image : existing.image,
        demoUrl: demoUrl !== undefined ? demoUrl : existing.demoUrl,
        githubUrl: githubUrl !== undefined ? githubUrl : existing.githubUrl,
        tags: Array.isArray(tags) ? tags.join(",") : (tags ?? existing.tags),
        featured: featured !== undefined ? Boolean(featured) : existing.featured,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("PUT /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate project." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Tidak memiliki hak akses." },
        { status: 401 }
      );
    }

    const { id } = await params;
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Project berhasil dihapus." });
  } catch (error) {
    console.error("DELETE /api/projects/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus project." },
      { status: 500 }
    );
  }
}
