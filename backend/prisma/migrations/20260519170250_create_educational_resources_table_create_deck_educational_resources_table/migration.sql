-- CreateTable
CREATE TABLE "educational_resources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "file_key" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educational_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deck_educational_resources" (
    "deck_id" INTEGER NOT NULL,
    "educational_resource_id" INTEGER NOT NULL,

    CONSTRAINT "deck_educational_resources_pkey" PRIMARY KEY ("deck_id","educational_resource_id")
);

-- AddForeignKey
ALTER TABLE "educational_resources" ADD CONSTRAINT "educational_resources_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_educational_resources" ADD CONSTRAINT "deck_educational_resources_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_educational_resources" ADD CONSTRAINT "deck_educational_resources_educational_resource_id_fkey" FOREIGN KEY ("educational_resource_id") REFERENCES "educational_resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
