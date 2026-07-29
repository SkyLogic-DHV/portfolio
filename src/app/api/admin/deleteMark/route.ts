import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin';

/** Delete a record (e.g., leaveYourMark) */
export async function DELETE(request: Request) {
  try {
    await requireAdmin();
    const { model, id } = await request.json();
    if (!model || !id) {
      return NextResponse.json({ error: 'Missing model or id' }, { status: 400 });
    }
    // Only allow whitelisted models for safety
    const allowed = ['leaveYourMark'];
    if (!allowed.includes(model)) {
      return NextResponse.json({ error: 'Model not allowed' }, { status: 403 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma as any)[model].delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Delete error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
