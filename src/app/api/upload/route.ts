import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { uploadImage } from "@/lib/storage";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: "Tidak memiliki hak akses." },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada file yang diunggah." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipe file tidak diizinkan: ${file.type}. Gunakan JPG, PNG, WebP, GIF, atau SVG.` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File terlalu besar. Maksimal 5MB. Ukuran file: ${(file.size / 1024 / 1024).toFixed(1)}MB.` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileExt = originalName.split(".").pop() || "png";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const fileUrl = await uploadImage(buffer, fileName, file.type);

    return NextResponse.json({
      url: fileUrl,
      filename: fileName,
      originalName: originalName,
      size: file.size,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal mengunggah gambar." },
      { status: 500 }
    );
  }
}