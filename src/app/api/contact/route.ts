import { NextResponse } from "next/server";
import prisma from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    let contact = await prisma.contactInfo.findUnique({ where: { id: "default" } });
    if (!contact) {
      contact = await prisma.contactInfo.create({ data: { id: "default" } });
    }
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updated = await prisma.contactInfo.upsert({
      where: { id: "default" },
      update: {
        email: body.email,
        whatsapp: body.whatsapp,
        instagram: body.instagram,
        linkedin: body.linkedin,
        github: body.github,
        discord: body.discord,
        telegram: body.telegram,
        address: body.address,
        googleMapsUrl: body.googleMapsUrl,
      },
      create: {
        id: "default",
        email: body.email || "hello@skylogic.id",
        whatsapp: body.whatsapp || "",
        instagram: body.instagram || "",
        linkedin: body.linkedin || "",
        github: body.github || "",
        discord: body.discord || "",
        telegram: body.telegram || "",
        address: body.address || "",
        googleMapsUrl: body.googleMapsUrl || "",
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
