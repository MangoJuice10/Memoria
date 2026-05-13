/*
  Warnings:

  - You are about to drop the column `interval` on the `flashcards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flashcards" DROP COLUMN "interval",
ADD COLUMN     "interval_days" INTEGER NOT NULL DEFAULT 0;
