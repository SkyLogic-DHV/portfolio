import { NextResponse } from "next/server";
import prisma  from "../../../../lib/utils/prisma";
import { generateOtp } from "@/lib/auth";
import { sendOtpEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { usernameOrEmail } = await req.json();

    if (!usernameOrEmail) {
      return NextResponse.json({ error: "Username or Email is required" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    // Check rate limit: max 3 requests per 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recentOtps = await prisma.otpToken.count({
      where: {
        email: admin.email,
        createdAt: { gte: tenMinutesAgo },
      },
    });

    if (recentOtps >= 3) {
      return NextResponse.json(
        { error: "Too many OTP requests. Please wait 10 minutes." },
        { status: 429 }
      );
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await prisma.otpToken.create({
      data: {
        email: admin.email,
        otp,
        expiresAt,
      },
    });

    await sendOtpEmail(admin.email, otp);

    return NextResponse.json({
      success: true,
      message: `OTP sent to ${admin.email}. Valid for 5 minutes.`,
      email: admin.email,
      // For seamless local dev testing:
      devOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
