import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

/** Simple email regex */
const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;

export async function POST(request: Request) {
  try {
    // ensure caller is an admin (throws if unauthorized)
    await requireAdmin();

    const { email } = await request.json();
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // check if admin already exists
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 409 });
    }

    await prisma.adminUser.create({
      data: { email, username: email.split('@')[0] },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Add admin error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
