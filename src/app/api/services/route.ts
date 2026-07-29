import { NextResponse } from "next/server";
import prisma from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
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
    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || "Code",
        cta: body.cta || "Learn More",
        displayOrder: Number(body.displayOrder) || 0,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
