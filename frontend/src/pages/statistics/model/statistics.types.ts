export interface TodayStats {
  reviewCount: number;
  byRating: {
    AGAIN: number;
    BAD: number;
    GOOD: number;
    PERFECT: number;
  };
}

export interface FutureDue {
  backlog: number;
  forecast: Array<{ date: string; count: number }>;
  total: number;
  average: number;
  dueTomorrow: number;
  dailyLoad: number;
}

export interface CardCounts {
  NEW: number;
  LEARNING: number;
  RELEARNING: number;
  YOUNG: number;
  MATURE: number;
  total: number;
}

export interface ReviewIntervals {
  distribution: Array<{ interval: number; count: number }>;
  median: number;
}

export interface CardEase {
  distribution: Array<{ ease: number; count: number }>;
  median: number;
}

export interface Retention {
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

export interface HourlyStats {
  hour: number;
  count: number;
  successRate: number;
}

export interface AnswerButtons {
  learning: { AGAIN: number; BAD: number; GOOD: number; PERFECT: number };
  young: { AGAIN: number; BAD: number; GOOD: number; PERFECT: number };
  mature: { AGAIN: number; BAD: number; GOOD: number; PERFECT: number };
}

export interface StatisticsResponse {
  today: TodayStats;
  futureDue: FutureDue;
  calendar: Array<{ date: string; count: number }>;
  cardCounts: CardCounts;
  reviewIntervals: ReviewIntervals;
  cardEase: CardEase;
  retention: Retention;
  hourly: HourlyStats[];
  answerButtons: AnswerButtons;
  added: Array<{ date: string; count: number }>;
}
