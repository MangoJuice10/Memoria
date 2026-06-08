export class TodayStatsDto {
  reviewCount: number;
  byRating: {
    AGAIN: number;
    BAD: number;
    GOOD: number;
    PERFECT: number;
  };
}

export class FutureDueDto {
  backlog: number;
  forecast: Array<{ date: string; count: number }>;
  total: number;
  average: number;
  dueTomorrow: number;
  dailyLoad: number;
}

export class CardCountsDto {
  NEW: number;
  LEARNING: number;
  RELEARNING: number;
  YOUNG: number;
  MATURE: number;
  total: number;
}

export class ReviewIntervalsDto {
  distribution: Array<{ interval: number; count: number }>;
  median: number;
}

export class CardEaseDto {
  distribution: Array<{ ease: number; count: number }>;
  median: number;
}

export class RetentionDto {
  young: { rate: number; count: number };
  mature: { rate: number; count: number };
  overall: { rate: number; count: number };
  byPeriod: {
    today: number | null;
    yesterday: number | null;
    lastWeek: number | null;
    lastMonth: number | null;
    lastYear: number | null;
  };
}

export class HourlyStatsDto {
  hour: number;
  count: number;
  successRate: number;
}

export class AnswerButtonsDto {
  learning: { AGAIN: number; BAD: number; GOOD: number; PERFECT: number };
  young: { AGAIN: number; BAD: number; GOOD: number; PERFECT: number };
  mature: { AGAIN: number; BAD: number; GOOD: number; PERFECT: number };
}

export class StatisticsResponseDto {
  today: TodayStatsDto;
  futureDue: FutureDueDto;
  calendar: Array<{ date: string; count: number }>;
  cardCounts: CardCountsDto;
  reviewIntervals: ReviewIntervalsDto;
  cardEase: CardEaseDto;
  retention: RetentionDto;
  hourly: HourlyStatsDto[];
  answerButtons: AnswerButtonsDto;
  added: Array<{ date: string; count: number }>;
}
