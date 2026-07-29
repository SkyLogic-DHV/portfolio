import { NextResponse } from "next/server";
import prisma from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    let sectionInfo = await prisma.teamSectionInfo.findUnique({ where: { id: "default" } });
    if (!sectionInfo) {
      sectionInfo = await prisma.teamSectionInfo.create({ data: { id: "default" } });
    }

    const members = await prisma.teamMember.findMany({
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ sectionInfo, members });
  } catch (error) {
    console.error("Error fetching team:", error);
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

    // Check if updating section info
    if (body.type === "SECTION_INFO") {
      const updatedInfo = await prisma.teamSectionInfo.upsert({
        where: { id: "default" },
        update: {
          title: body.title,
          description: body.description,
        },
        create: {
          id: "default",
          title: body.title || "Meet Our Engineering Team",
          description: body.description || "",
        },
      });
      return NextResponse.json(updatedInfo);
    }

    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        bio: body.bio,
        avatar: body.avatar || "",
        linkedin: body.linkedin || "",
        github: body.github || "",
        instagram: body.instagram || "",
        email: body.email || "",
        displayOrder: Number(body.displayOrder) || 0,
        isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
      },
    });

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
