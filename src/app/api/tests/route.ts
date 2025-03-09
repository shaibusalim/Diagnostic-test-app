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

// GET: Fetch all test results
export async function GET() {
  const tests = await prisma.diagnosticTest.findMany();
  return NextResponse.json(tests);
}

// POST: Create a new test result
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const test = await prisma.diagnosticTest.create({ data });
    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}