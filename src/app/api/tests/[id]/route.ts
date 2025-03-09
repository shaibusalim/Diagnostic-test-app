import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const schema = z.object({
  patientName: z.string(),
  testType: z.string(),
  result: z.string(),
  testDate: z.string().datetime(),
  notes: z.string().optional(),
});

// GET: Fetch a single test result by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const test = await prisma.diagnosticTest.findUnique({ where: { id: Number(params.id) } });
  if (test) {
    return NextResponse.json(test);
  } else {
    return NextResponse.json({ error: 'Test not found' }, { status: 404 });
  }
}

// PUT: Update a test result by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const test = await prisma.diagnosticTest.update({
      where: { id: Number(params.id) },
      data,
    });
    return NextResponse.json(test);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

// DELETE: Delete a test result by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const test = await prisma.diagnosticTest.delete({ where: { id: Number(params.id) } });
  return NextResponse.json(test);
}