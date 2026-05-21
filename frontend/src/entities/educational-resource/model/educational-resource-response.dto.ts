export type EducationalResourceResponseDto = {
    id: number;
    name: string;
    description: string;
    fileUrl: string;
    coverUrl?: string | null;
    userId: number;
    createdAt: string;
    updatedAt: string;
}