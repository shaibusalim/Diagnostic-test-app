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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const test = await prisma.diagnosticTest.findUnique({
      where: { id: Number(params.id) },
    });
    if (test) {
      return NextResponse.json(test);
    } else {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching test:', error);
    return NextResponse.json({ error: 'Failed to fetch test result' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const validatedData = schema.parse(body); // Validate the request body
    const test = await prisma.diagnosticTest.update({
      where: { id: Number(params.id) },
      data: validatedData,
    });
    return NextResponse.json(test);
  } catch (error) {
    console.error('Validation Error:', error);
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const test = await prisma.diagnosticTest.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(test);
  } catch (error) {
    console.error('Error deleting test:', error);
    return NextResponse.json({ error: 'Failed to delete test result' }, { status: 500 });
  }
}