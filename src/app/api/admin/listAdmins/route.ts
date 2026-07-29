import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

export async function GET() {
  try {
    await requireAdmin(); // will throw if not admin
    const admins = await prisma.adminUser.findMany({
      where: { deactive: false },
      select: { email: true, deactive: true, id: true },
    });
    return NextResponse.json(admins);
  } catch (error) {
    console.error('List admins error:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
