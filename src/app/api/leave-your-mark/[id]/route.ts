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

    const updated = await prisma.leaveYourMark.update({
      where: { id },
      data: {
        isPinned: body.isPinned !== undefined ? Boolean(body.isPinned) : undefined,
        isApproved: body.isApproved !== undefined ? Boolean(body.isApproved) : undefined,
        isHidden: body.isHidden !== undefined ? Boolean(body.isHidden) : undefined,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating Leave Your Mark note:", error);
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
    await prisma.leaveYourMark.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting Leave Your Mark note:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
