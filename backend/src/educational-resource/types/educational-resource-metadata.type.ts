import { EducationalResource } from "@prisma/client";

export type EducationalResourceMetadata = {
  educationalResourceId: EducationalResource["id"];
  educationalResourceName: EducationalResource["name"];
  educationalResourceOriginalFilename: EducationalResource["originalFilename"];
};
