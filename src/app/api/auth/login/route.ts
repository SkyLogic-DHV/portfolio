import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = await prisma.adminUser.findUnique({
      where: { email },
    });
    const allowedEmails = [
      'moluscaxyz@gmail.com',
      'heratonyputri@gmail.com',
      'meriaamelia01@gmail.com',
    ];
    if (!allowedEmails.includes(email)) {
      return NextResponse.json({ error: 'Unauthorized email' }, { status: 403 });
    }

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Password login belum didukung. Gunakan OTP login." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
