import { client } from '@/shared/api';

export interface Statistics {
  totalUsers: number;
  totalDecks: number;
  totalFlashcards: number;
  totalReviews: number;
  totalTags: number;
  totalEducationalResources: number;
  totalFeedbacks: number;
  recentUsers: Array<{
    id: number;
    username: string;
    email: string;
    createdAt: string;
  }>;
}

export async function getStatistics(): Promise<Statistics> {
  const response = await client.get<{ data: Statistics }>('/admin/statistics');
  return response.data.data; // Unwrap the nested data
}
