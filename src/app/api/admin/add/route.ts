import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { email, username, name } = await request.json();
    const allowedEmails = [
      'moluscaxyz@gmail.com',
      'heratonyputri@gmail.com',
      'meriaamelia01@gmail.com',
    ];
    if (!allowedEmails.includes(session.email)) {
      return NextResponse.json({ error: 'Only existing admins can add new admins' }, { status: 403 });
    }
    // Create new admin
    const newAdmin = await prisma.adminUser.create({
      data: { email, username, name },
    });
    return NextResponse.json({ success: true, admin: newAdmin });
  } catch (error) {
    console.error('Add admin error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
