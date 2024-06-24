/*
  Warnings:

  - Added the required column `title` to the `Lectures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lectures" ADD COLUMN     "title" TEXT NOT NULL;
