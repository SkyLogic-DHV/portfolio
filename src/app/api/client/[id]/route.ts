import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

function parseDate(value: unknown): Date | null {
  if (!value || typeof value !== "string") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function addOneMonth(date: Date) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + 1);
  return next;
}

function normalizeRevision(value: unknown) {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(0, Math.min(2, Math.trunc(parsed)));
}

function buildClientPayload(body: Record<string, unknown>, fallback: Record<string, unknown>, assignedAdminId?: string) {
  const orderedAt = parseDate(body.orderedAt) || parseDate(fallback.orderedAt) || new Date();
  const completedAt = parseDate(body.completedAt) || parseDate(fallback.completedAt) || null;
  const status = typeof body.status === "string" ? body.status : (fallback.status as string) || "To Do";
  const normalizedCompletedAt = status === "Completed" ? completedAt || orderedAt : completedAt;

  return {
    title: typeof body.title === "string" ? body.title : (fallback.title as string),
    clientName: typeof body.clientName === "string" ? body.clientName : (fallback.clientName as string) || "",
    description: typeof body.description === "string" ? body.description : (fallback.description as string) || "",
    status,
    assignedAdminId: assignedAdminId || (fallback.assignedAdminId as string | null) || null,
    orderedAt,
    completedAt: normalizedCompletedAt,
    revisionUsed: normalizeRevision(body.revisionUsed ?? fallback.revisionUsed),
    revisionLimit: 2,
    expiresAt: status === "Completed" ? addOneMonth(normalizedCompletedAt || orderedAt) : null,
    priority: typeof body.priority === "string" ? body.priority : (fallback.priority as string) || "Medium",
    isActive: typeof body.isActive === "boolean" ? body.isActive : Boolean(fallback.isActive ?? true),
  };
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await prisma.clientProject.findUnique({
      where: { id },
      include: {
        assignedAdmin: {
          select: { id: true, email: true, username: true, name: true },
        },
      },
    });

    if (!item) {
      return NextResponse.json({ error: "Client project not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error fetching client project:", error);
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
    const existing = await prisma.clientProject.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: "Client project not found" }, { status: 404 });
    }

    const updated = await prisma.clientProject.update({
      where: { id },
      data: buildClientPayload(body, existing, session.userId),
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating client project:", error);
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
    await prisma.clientProject.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting client project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
