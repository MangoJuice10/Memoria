/*
  Warnings:

  - Added the required column `original_filename` to the `educational_resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "educational_resources" ADD COLUMN     "cover_key" TEXT,
ADD COLUMN     "original_filename" TEXT NOT NULL;
