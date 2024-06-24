/*
  Warnings:

  - You are about to drop the `Lections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Lections";

-- CreateTable
CREATE TABLE "Lectures" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Lectures_pkey" PRIMARY KEY ("id")
);
