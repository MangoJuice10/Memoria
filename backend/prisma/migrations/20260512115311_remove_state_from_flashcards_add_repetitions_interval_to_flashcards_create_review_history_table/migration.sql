/*
  Warnings:

  - You are about to drop the column `state` on the `flashcards` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReviewRating" AS ENUM ('AGAIN', 'BAD', 'GOOD', 'PERFECT');

-- AlterTable
ALTER TABLE "flashcards" DROP COLUMN "state",
ADD COLUMN     "interval" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "repetitions" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "FlashcardState";

-- CreateTable
CREATE TABLE "review_history" (
    "id" SERIAL NOT NULL,
    "flashcard_id" INTEGER NOT NULL,
    "rating" "ReviewRating" NOT NULL,
    "reviewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "review_history" ADD CONSTRAINT "review_history_flashcard_id_fkey" FOREIGN KEY ("flashcard_id") REFERENCES "flashcards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
