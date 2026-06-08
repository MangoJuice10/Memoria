import { client } from '@/shared/api';
import type { StatisticsResponse } from '../model/statistics.types';

export type StatisticsPeriod = '1month' | '3months' | '1year' | 'all';

export async function getStatistics(
  deckId: number,
  period: StatisticsPeriod = '1year',
  includeBacklog = true,
): Promise<StatisticsResponse> {
  const response = await client.get(
    `/decks/${deckId}/statistics`,
    {
      params: {
        period,
        includeBacklog: includeBacklog.toString(),
      },
    },
  );
  // Backend wraps responses in { status: "success", statusCode: 200, data: {...} }
  return response.data.data || response.data;
}
