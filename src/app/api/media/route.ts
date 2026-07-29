import { NextResponse } from "next/server";
import prisma from "../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const files = await prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(files);
  } catch (error) {
    console.error("Error fetching media files:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads", folder);
    await mkdir(uploadsDir, { recursive: true });

    const ext = path.extname(file.name) || ".png";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folder}/${filename}`;

    const mediaFile = await prisma.mediaFile.create({
      data: {
        filename,
        originalName: file.name,
        url: publicUrl,
        mimeType: file.type || "image/png",
        size: file.size,
        folder,
      },
    });

    return NextResponse.json(mediaFile);
  } catch (error) {
    console.error("Error uploading media file:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Media ID required" }, { status: 400 });
    }

    const fileRecord = await prisma.mediaFile.findUnique({ where: { id } });
    if (fileRecord) {
      try {
        const localPath = path.join(process.cwd(), "public", fileRecord.url.replace(/^\//, ""));
        await unlink(localPath);
      } catch {
        // File may already be deleted from filesystem
      }
      await prisma.mediaFile.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media file:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
