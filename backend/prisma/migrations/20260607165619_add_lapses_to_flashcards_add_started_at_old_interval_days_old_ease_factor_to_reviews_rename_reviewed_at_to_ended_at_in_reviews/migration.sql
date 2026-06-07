/*
  Warnings:

  - You are about to drop the column `reviewed_at` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `started_at` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flashcards" ADD COLUMN     "lapses" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "reviewed_at",
ADD COLUMN     "ended_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "old_ease_factor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
ADD COLUMN     "old_interval_days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "started_at" TIMESTAMP(3) NOT NULL;
