export type EducationalResourceResponseDto = {
  id: number;
  name: string;
  description: string;
  fileUrl: string;
  coverUrl: string | null;
  originalFilename: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}