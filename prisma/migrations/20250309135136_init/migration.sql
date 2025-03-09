-- CreateTable
CREATE TABLE "DiagnosticTest" (
    "id" SERIAL NOT NULL,
    "patientName" TEXT NOT NULL,
    "testType" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "DiagnosticTest_pkey" PRIMARY KEY ("id")
);
