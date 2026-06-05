/*
  Warnings:

  - You are about to drop the `review_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "review_history" DROP CONSTRAINT "review_history_flashcard_id_fkey";

-- DropTable
DROP TABLE "review_history";

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "flashcard_id" INTEGER NOT NULL,
    "rating" "ReviewRating" NOT NULL,
    "reviewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_flashcard_id_fkey" FOREIGN KEY ("flashcard_id") REFERENCES "flashcards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
