/* ===== AI GENERATED CODE START ===== */
import { TagResponseDto } from "../../tag/dto/tag-response.dto";
/* ===== AI GENERATED CODE END ===== */

export type DeckResponseDto = {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  coverUrl: string | null;
  flashcardsCount: number;
  /* ===== AI GENERATED CODE START ===== */
  tags: TagResponseDto[];
  /* ===== AI GENERATED CODE END ===== */
  createdAt: Date;
  updatedAt: Date;
};
