import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const schema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  testType: z.string().min(1, "Test type is required"),
  result: z.string().min(1, "Result is required"),
  testDate: z.coerce.date(), // Ensures valid Date
  notes: z.string().optional(),
});

// GET: Fetch all test results
export async function GET() {
  try {
    const tests = await prisma.diagnosticTest.findMany();
    return NextResponse.json(tests);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch test results' }, { status: 500 });
  }
}

// POST: Create a new test result
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    // Debugging: Check parsed data
    console.log("Data being sent to Prisma:", data);

    const test = await prisma.diagnosticTest.create({
      data: {
        patientName: data.patientName,
        testType: data.testType,
        result: data.result,
        testDate: new Date(data.testDate), 
        notes: data.notes ?? null, 
      },
    });

    return NextResponse.json(test, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
