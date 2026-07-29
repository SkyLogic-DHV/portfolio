import { NextResponse } from "next/server";
import prisma from "../../../../lib/utils/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();

    // Today start (00:00:00)
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // 5 minutes ago for Online Visitors
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    // Week start (7 days ago)
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Month start (30 days ago)
    const monthStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalVisitors,
      onlineVisitors,
      todayVisitors,
      weekVisitors,
      monthVisitors,
      totalProjects,
      totalStack,
      totalLeaveYourMark,
      totalMedia,
      recentVisitors,
    ] = await Promise.all([
      prisma.visitorLog.count(),
      prisma.visitorLog.count({ where: { createdAt: { gte: fiveMinutesAgo } } }),
      prisma.visitorLog.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.visitorLog.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.visitorLog.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.project.count(),
      prisma.techStack.count(),
      prisma.leaveYourMark.count(),
      prisma.mediaFile.count(),
      prisma.visitorLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    // Aggregate Device Breakdown
    const allVisitors = await prisma.visitorLog.findMany({ select: { device: true, browser: true, os: true, country: true } });

    const deviceMap: Record<string, number> = {};
    const browserMap: Record<string, number> = {};
    const osMap: Record<string, number> = {};
    const countryMap: Record<string, number> = {};

    for (const v of allVisitors) {
      deviceMap[v.device] = (deviceMap[v.device] || 0) + 1;
      browserMap[v.browser] = (browserMap[v.browser] || 0) + 1;
      osMap[v.os] = (osMap[v.os] || 0) + 1;
      countryMap[v.country] = (countryMap[v.country] || 0) + 1;
    }

    return NextResponse.json({
      overview: {
        totalVisitors,
        onlineVisitors,
        todayVisitors,
        weekVisitors,
        monthVisitors,
        totalProjects,
        totalStack,
        totalLeaveYourMark,
        totalMedia,
      },
      breakdowns: {
        device: deviceMap,
        browser: browserMap,
        os: osMap,
        country: countryMap,
      },
      recentVisitors,
    });
  } catch (error) {
    console.error("Error fetching analytics stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
