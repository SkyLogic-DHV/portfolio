import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function GET() {
  try {
    const stacks = await prisma.techStack.findMany({ orderBy: { displayOrder: "asc" } });
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

    const contentType = req.headers.get("content-type") || "";
    let name = "";
    let image = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      name = (formData.get("name") as string) || "";
      const file = formData.get("image") as File | null;

      if (file) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          return NextResponse.json({ error: "Tipe file tidak diizinkan." }, { status: 400 });
        }
        if (file.size > MAX_FILE_SIZE) {
          return NextResponse.json({ error: "File terlalu besar. Maksimal 5MB." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadsDir, { recursive: true });
        const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const fileExt = originalName.split(".").pop() || "png";
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = path.join(uploadsDir, fileName);
        await writeFile(filePath, buffer);
        image = `/uploads/${fileName}`;
      }
    } else {
      const body = await req.json();
      name = body.name;
      image = body.image || "";
    }

    const stack = await prisma.techStack.create({
      data: {
        name,
        image: image || "",
        displayOrder: 0,
        isActive: true,
      },
    });

    return NextResponse.json(stack);
  } catch (error) {
    console.error("Error creating tech stack item:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
