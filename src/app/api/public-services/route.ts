import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.publicService.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching public services:", error);
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

    const service = await prisma.publicService.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || "Code",
        displayOrder: Number(body.displayOrder) || 0,
        isActive: typeof body.isActive === "boolean" ? body.isActive : true,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error creating public service:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}