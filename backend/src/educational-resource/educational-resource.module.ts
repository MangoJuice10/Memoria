import { Module } from "@nestjs/common";
import { EducationalResourceService } from "./educational-resource.service";
import { StorageModule } from "src/storage/storage.module";
import { EducationalResourceController } from "src/educational-resource/controllers/educational-resource.controller";
import { EducationalResourceOwnershipGuard } from "src/educational-resource/guards/educational-resource-ownership.guard";
import { DeckModule } from "src/deck/deck.module";
import { DeckEducationalResourceController } from "src/educational-resource/controllers/deck-educational-resource.controller";
import { VectorStoreModule } from "src/vector-store/vector-store.module";

@Module({
  imports: [StorageModule, DeckModule, VectorStoreModule],
  providers: [EducationalResourceService],
  controllers: [EducationalResourceController, DeckEducationalResourceController],
  exports: [EducationalResourceService],
})
export class EducationalResourceModule {}
