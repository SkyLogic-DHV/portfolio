import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

/** Simple email regex */
const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;

async function buildUniqueUsername(email: string) {
  const base = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_.-]/g, '');
  let username = base || 'admin';
  let suffix = 1;

  while (await prisma.adminUser.findUnique({ where: { username } })) {
    username = `${base || 'admin'}${suffix}`;
    suffix += 1;
  }

  return username;
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();

    const { email } = await request.json();
    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // check if admin already exists
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 409 });
    }

    const username = await buildUniqueUsername(email);

    await prisma.adminUser.create({
      data: {
        email,
        username,
        name: null,
        createdById: session.userId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Add admin error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
