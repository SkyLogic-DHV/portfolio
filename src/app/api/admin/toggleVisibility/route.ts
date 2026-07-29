import { NextResponse } from 'next/server';
import prisma from '@/lib/utils/prisma';
import { requireAdmin } from '@/lib/admin';

type ModelName = 'project' | 'techStack' | 'service' | 'leaveYourMark';

async function updateModel(model: ModelName, id: string, data: any) {
  switch (model) {
    case 'project':
      return await prisma.project.update({ where: { id }, data });
    case 'techStack':
      return await prisma.techStack.update({ where: { id }, data });
    case 'service':
      return await prisma.service.update({ where: { id }, data });
    case 'leaveYourMark':
      return await prisma.leaveYourMark.update({ where: { id }, data });
    default:
      throw new Error('Invalid model');
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const { model, id, isActive } = await request.json();
    if (!model || !id) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    const allowedModels: ModelName[] = ['project', 'techStack', 'service', 'leaveYourMark'];
    if (!allowedModels.includes(model as ModelName)) {
      return NextResponse.json({ error: 'Invalid model' }, { status: 400 });
    }
    let updateData: any = { isActive };
    if (model === 'leaveYourMark') {
      updateData = { isHidden: isActive };
    }
    await updateModel(model as ModelName, id, updateData);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Toggle visibility error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}