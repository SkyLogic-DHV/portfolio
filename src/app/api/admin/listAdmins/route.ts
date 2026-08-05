import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await requireAdmin(); // will throw if not admin
    const admins = await prisma.adminUser.findMany({
      where: { deactive: false },
      orderBy: { createdAt: 'desc' },
      select: {
        email: true,
        deactive: true,
        id: true,
        name: true,
        username: true,
        createdAt: true,
        createdBy: { select: { id: true, email: true, username: true, name: true } },
      },
    });
    return NextResponse.json(admins);
  } catch (error) {
    console.error('List admins error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
