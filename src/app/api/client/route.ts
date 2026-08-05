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

function buildClientPayload(body: Record<string, unknown>, fallback: Record<string, unknown> = {}, assignedAdminId?: string) {
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

export async function GET() {
  try {
    const items = await prisma.clientProject.findMany({
      orderBy: [{ isActive: "desc" }, { orderedAt: "desc" }, { createdAt: "desc" }],
      include: {
        assignedAdmin: {
          select: { id: true, email: true, username: true, name: true },
        },
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching client projects:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const clientProject = await prisma.clientProject.create({
      data: buildClientPayload(body, {}, session.userId),
    });

    return NextResponse.json(clientProject);
  } catch (error) {
    console.error("Error creating client project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
