import { EducationalResourceMetadata } from "src/educational-resource/types";

export type RagCitation = EducationalResourceMetadata & {
  id: string;
  score: number;
};

export type RagResult = {
  context: string;
  citations: RagCitation[];
};
