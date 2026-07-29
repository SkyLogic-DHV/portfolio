import { NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const headers = req.headers;
    const ip = headers.get("x-forwarded-for") || "127.0.0.1";

    const log = await prisma.visitorLog.create({
      data: {
        ip: ip.split(",")[0],
        path: body.path || "/",
        device: body.device || "Desktop",
        browser: body.browser || "Chrome",
        os: body.os || "Windows",
        country: body.country || "Indonesia",
        city: body.city || "Jakarta",
        referral: body.referral || "Direct",
        sessionDuration: Number(body.sessionDuration) || 0,
      },
    });

    return NextResponse.json({ success: true, logId: log.id });
  } catch (error) {
    console.error("Error logging visitor:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
