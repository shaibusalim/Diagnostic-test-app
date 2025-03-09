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

// GET a single test by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const testId = Number(params.id);
    if (isNaN(testId)) {
      return NextResponse.json({ error: 'Invalid test ID' }, { status: 400 });
    }

    const test = await prisma.diagnosticTest.findUnique({
      where: { id: testId },
    });

    if (!test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 });
    }

    return NextResponse.json(test);
  } catch (error) {
    console.error('Error fetching test:', error);
    return NextResponse.json({ error: 'Failed to fetch test result' }, { status: 500 });
  }
}

// UPDATE a test by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const testId = Number(params.id);
    if (isNaN(testId)) {
      return NextResponse.json({ error: 'Invalid test ID' }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = schema.parse(body); // Validate request body

    const test = await prisma.diagnosticTest.update({
      where: { id: testId },
      data: validatedData,
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error('Validation Error:', error);
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

// DELETE a test by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const testId = Number(params.id);
    if (isNaN(testId)) {
      return NextResponse.json({ error: 'Invalid test ID' }, { status: 400 });
    }

    const test = await prisma.diagnosticTest.delete({
      where: { id: testId },
    });

    return NextResponse.json(test);
  } catch (error) {
    console.error('Error deleting test:', error);
    return NextResponse.json({ error: 'Failed to delete test result' }, { status: 500 });
  }
}