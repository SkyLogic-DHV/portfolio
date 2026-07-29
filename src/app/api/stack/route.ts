import { NextResponse } from "next/server";
import prisma from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const stacks = await prisma.techStack.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(stacks);
  } catch (error) {
    console.error("Error fetching tech stack:", error);
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
    const stack = await prisma.techStack.create({
      data: {
        name: body.name,
        icon: body.icon || "",
        color: body.color || "#6366F1",
        level: body.level || "Expert",
        category: body.category || "Framework",
        displayOrder: Number(body.displayOrder) || 0,
      },
    });

    return NextResponse.json(stack);
  } catch (error) {
    console.error("Error creating tech stack item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
