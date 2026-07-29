import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.techStack.update({
      where: { id },
      data: {
        name: body.name,
        icon: body.icon,
        color: body.color,
        level: body.level,
        category: body.category,
        displayOrder: Number(body.displayOrder),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating tech stack item:", error);
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
    await prisma.techStack.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting tech stack item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
