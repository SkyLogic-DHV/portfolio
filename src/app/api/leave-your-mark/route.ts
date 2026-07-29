import { NextResponse } from "next/server";
import prisma  from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getAdminSession();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    // If admin, return all notes with search filter. Otherwise, only non-hidden approved notes
    const where: Record<string, unknown> = {};

    if (!session) {
      where.isHidden = false;
      where.isApproved = true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const notes = await prisma.leaveYourMark.findMany({
      where,
      orderBy: [
        { isPinned: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Error fetching Leave Your Mark notes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, message, color } = await req.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Name and message are required" }, { status: 400 });
    }

    if (message.length > 84) {
      return NextResponse.json({ error: "Message must not exceed 84 characters" }, { status: 400 });
    }

    const validColors = ["yellow", "blue", "green", "pink", "cream"];
    const noteColor = validColors.includes(color) ? color : "yellow";

    const note = await prisma.leaveYourMark.create({
      data: {
        name: name.trim(),
        message: message.trim(),
        color: noteColor,
        isPinned: false,
        isApproved: true,
        isHidden: false,
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error creating Leave Your Mark note:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
