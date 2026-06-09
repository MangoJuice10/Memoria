export class StatisticsDto {
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
    createdAt: Date;
  }>;
}
