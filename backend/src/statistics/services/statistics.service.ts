import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FlashcardPhaseService } from 'src/flashcard/services/flashcard-phase.service';
import { FlashcardPhase } from 'src/flashcard/enums/flashcard-phase.enum';
import {
  StatisticsResponseDto,
  TodayStatsDto,
  FutureDueDto,
  CardCountsDto,
  ReviewIntervalsDto,
  CardEaseDto,
  RetentionDto,
  HourlyStatsDto,
  AnswerButtonsDto,
} from '../dto/statistics-response.dto';
import { ReviewRating } from '@prisma/client';

type Period = '1month' | '3months' | '1year' | 'all';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly flashcardPhaseService: FlashcardPhaseService,
  ) {}

  async getStatistics(
    deckId: number,
    period: Period = '1year',
    includeBacklog = true,
  ): Promise<StatisticsResponseDto> {
    const { startDate, endDate } = this.getDateRange(period);

    const [
      today,
      futureDue,
      calendar,
      cardCounts,
      reviewIntervals,
      cardEase,
      retention,
      hourly,
      answerButtons,
      added,
    ] = await Promise.all([
      this.getTodayStats(deckId),
      this.getFutureDueStats(deckId, includeBacklog),
      this.getCalendarStats(deckId, startDate, endDate),
      this.getCardCounts(deckId),
      this.getReviewIntervals(deckId, startDate, endDate),
      this.getCardEase(deckId, startDate, endDate),
      this.getRetention(deckId, startDate, endDate),
      this.getHourlyBreakdown(deckId, startDate, endDate),
      this.getAnswerButtons(deckId, startDate, endDate),
      this.getCardsAdded(deckId, startDate, endDate),
    ]);

    return {
      today,
      futureDue,
      calendar,
      cardCounts,
      reviewIntervals,
      cardEase,
      retention,
      hourly,
      answerButtons,
      added,
    };
  }

  private getDateRange(period: Period): { startDate: Date; endDate: Date } {
    const now = new Date();
    const endDate = now;
    let startDate: Date;

    switch (period) {
      case '1month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '1year':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
        startDate = new Date(0); // Unix epoch
        break;
    }

    return { startDate, endDate };
  }

  private getStartOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private getEndOfDay(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999,
    );
  }

  private async getTodayStats(deckId: number): Promise<TodayStatsDto> {
    const startOfToday = this.getStartOfDay(new Date());
    const endOfToday = this.getEndOfDay(new Date());

    const reviews = await this.prisma.review.findMany({
      where: {
        flashcard: { deckId },
        endedAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      select: { rating: true },
    });

    const byRating = {
      AGAIN: 0,
      BAD: 0,
      GOOD: 0,
      PERFECT: 0,
    };

    reviews.forEach((review) => {
      byRating[review.rating]++;
    });

    return {
      reviewCount: reviews.length,
      byRating,
    };
  }

  private async getFutureDueStats(
    deckId: number,
    includeBacklog: boolean,
  ): Promise<FutureDueDto> {
    const now = new Date();
    const startOfToday = this.getStartOfDay(now);

    // Get ALL flashcards with their due dates - SIMPLE
    const allCards = await this.prisma.flashcard.findMany({
      where: {
        deckId,
      },
      select: { dueAt: true },
    });

    // Filter out cards without due dates
    const cardsWithDueDate = allCards.filter((card) => card.dueAt !== null);

    // Group by exact date - NO LOGIC, JUST GROUP
    const forecastMap = new Map<string, number>();
    cardsWithDueDate.forEach((card) => {
      const dateKey = card.dueAt.toISOString().split('T')[0];
      forecastMap.set(dateKey, (forecastMap.get(dateKey) || 0) + 1);
    });

    // Convert to array and sort - THAT'S IT
    const forecast = Array.from(forecastMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Count backlog (cards before today) for the warning box
    const backlog = cardsWithDueDate.filter(
      (card) => card.dueAt < startOfToday,
    ).length;

    // Due tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfTomorrow = this.getStartOfDay(tomorrow);
    const endOfTomorrow = this.getEndOfDay(tomorrow);
    const dueTomorrow = cardsWithDueDate.filter(
      (card) =>
        card.dueAt >= startOfTomorrow && card.dueAt <= endOfTomorrow,
    ).length;

    // Simple counts
    const total = cardsWithDueDate.length;
    const average = total > 0 ? total / 365 : 0;

    return {
      backlog: includeBacklog ? backlog : 0,
      forecast,
      total,
      average: Math.round(average * 10) / 10,
      dueTomorrow,
      dailyLoad: Math.round(average),
    };
  }

  private async getCalendarStats(
    deckId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Array<{ date: string; count: number }>> {
    const reviews = await this.prisma.review.findMany({
      where: {
        flashcard: { deckId },
        endedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { endedAt: true },
    });

    const calendarMap = new Map<string, number>();
    reviews.forEach((review) => {
      const dateKey = review.endedAt.toISOString().split('T')[0];
      calendarMap.set(dateKey, (calendarMap.get(dateKey) || 0) + 1);
    });

    return Array.from(calendarMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  private async getCardCounts(deckId: number): Promise<CardCountsDto> {
    const flashcards = await this.prisma.flashcard.findMany({
      where: { deckId },
    });

    const phases =
      await this.flashcardPhaseService.getPhasesForFlashcards(flashcards);

    const counts = {
      NEW: 0,
      LEARNING: 0,
      RELEARNING: 0,
      YOUNG: 0,
      MATURE: 0,
    };

    flashcards.forEach((fc) => {
      const phase = phases.get(fc.id);

      if (phase === FlashcardPhase.NEW) counts.NEW++;
      else if (phase === FlashcardPhase.LEARNING) counts.LEARNING++;
      else if (phase === FlashcardPhase.RELEARNING) counts.RELEARNING++;
      else if (phase === FlashcardPhase.REVIEW) {
        if (fc.intervalDays < 21) counts.YOUNG++;
        else counts.MATURE++;
      }
    });

    return {
      ...counts,
      total: flashcards.length,
    };
  }

  private async getReviewIntervals(
    deckId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<ReviewIntervalsDto> {
    const reviews = await this.prisma.review.findMany({
      where: {
        flashcard: { deckId },
        endedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { oldIntervalDays: true },
    });

    const intervalMap = new Map<number, number>();
    reviews.forEach((review) => {
      const interval = review.oldIntervalDays;
      intervalMap.set(interval, (intervalMap.get(interval) || 0) + 1);
    });

    const distribution = Array.from(intervalMap.entries())
      .map(([interval, count]) => ({ interval, count }))
      .sort((a, b) => a.interval - b.interval);

    // Calculate median
    const sortedIntervals = reviews
      .map((r) => r.oldIntervalDays)
      .sort((a, b) => a - b);
    const median =
      sortedIntervals.length > 0
        ? sortedIntervals[Math.floor(sortedIntervals.length / 2)]
        : 0;

    return {
      distribution,
      median,
    };
  }

  private async getCardEase(
    deckId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<CardEaseDto> {
    const reviews = await this.prisma.review.findMany({
      where: {
        flashcard: { deckId },
        endedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { oldEaseFactor: true },
    });

    const easeMap = new Map<number, number>();
    reviews.forEach((review) => {
      const easeBucket = Math.round(review.oldEaseFactor * 10) / 10;
      easeMap.set(easeBucket, (easeMap.get(easeBucket) || 0) + 1);
    });

    const distribution = Array.from(easeMap.entries())
      .map(([ease, count]) => ({ ease, count }))
      .sort((a, b) => a.ease - b.ease);

    // Calculate median
    const sortedEase = reviews
      .map((r) => r.oldEaseFactor)
      .sort((a, b) => a - b);
    const median =
      sortedEase.length > 0
        ? Math.round(sortedEase[Math.floor(sortedEase.length / 2)] * 10) / 10
        : 2.5;

    return {
      distribution,
      median,
    };
  }

  private async getRetention(
    deckId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<RetentionDto> {
    const reviews = await this.prisma.review.findMany({
      where: {
        flashcard: { deckId },
        endedAt: {
          gte: startDate,
          lte: endDate,
        },
        oldIntervalDays: { gt: 0 }, // Only review cards
      },
      select: { oldIntervalDays: true, rating: true, endedAt: true },
    });

    const calculateRate = (
      filtered: typeof reviews,
    ): { rate: number; count: number } => {
      if (filtered.length === 0) return { rate: 0, count: 0 };
      const passed = filtered.filter(
        (r) => r.rating === 'BAD' || r.rating === 'GOOD' || r.rating === 'PERFECT',
      ).length;
      return {
        rate: Math.round((passed / filtered.length) * 1000) / 10,
        count: filtered.length,
      };
    };

    const young = calculateRate(reviews.filter((r) => r.oldIntervalDays < 21));
    const mature = calculateRate(reviews.filter((r) => r.oldIntervalDays >= 21));
    const overall = calculateRate(reviews);

    // By period
    const now = new Date();
    const getRetentionForPeriod = (start: Date, end: Date): number | null => {
      const filtered = reviews.filter(
        (r) => r.endedAt >= start && r.endedAt <= end,
      );
      if (filtered.length === 0) return null;
      const passed = filtered.filter(
        (r) => r.rating === 'BAD' || r.rating === 'GOOD' || r.rating === 'PERFECT',
      ).length;
      return Math.round((passed / filtered.length) * 1000) / 10;
    };

    const startOfToday = this.getStartOfDay(now);
    const endOfToday = this.getEndOfDay(now);
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const endOfYesterday = new Date(endOfToday);
    endOfYesterday.setDate(endOfYesterday.getDate() - 1);
    const lastWeekStart = new Date(startOfToday);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const lastMonthStart = new Date(startOfToday);
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
    const lastYearStart = new Date(startOfToday);
    lastYearStart.setFullYear(lastYearStart.getFullYear() - 1);

    return {
      young,
      mature,
      overall,
      byPeriod: {
        today: getRetentionForPeriod(startOfToday, endOfToday),
        yesterday: getRetentionForPeriod(startOfYesterday, endOfYesterday),
        lastWeek: getRetentionForPeriod(lastWeekStart, endOfToday),
        lastMonth: getRetentionForPeriod(lastMonthStart, endOfToday),
        lastYear: getRetentionForPeriod(lastYearStart, endOfToday),
      },
    };
  }

  private async getHourlyBreakdown(
    deckId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<HourlyStatsDto[]> {
    const reviews = await this.prisma.review.findMany({
      where: {
        flashcard: { deckId },
        endedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { endedAt: true, rating: true },
    });

    const hourlyMap = new Map<
      number,
      { count: number; passed: number }
    >();

    for (let i = 0; i < 24; i++) {
      hourlyMap.set(i, { count: 0, passed: 0 });
    }

    reviews.forEach((review) => {
      const hour = review.endedAt.getHours();
      const data = hourlyMap.get(hour)!;
      data.count++;
      if (
        review.rating === 'BAD' ||
        review.rating === 'GOOD' ||
        review.rating === 'PERFECT'
      ) {
        data.passed++;
      }
    });

    return Array.from(hourlyMap.entries())
      .map(([hour, data]) => ({
        hour,
        count: data.count,
        successRate:
          data.count > 0
            ? Math.round((data.passed / data.count) * 1000) / 10
            : 0,
      }))
      .sort((a, b) => a.hour - b.hour);
  }

  private async getAnswerButtons(
    deckId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<AnswerButtonsDto> {
    const reviews = await this.prisma.review.findMany({
      where: {
        flashcard: { deckId },
        endedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { rating: true, oldIntervalDays: true },
    });

    const learning = { AGAIN: 0, BAD: 0, GOOD: 0, PERFECT: 0 };
    const young = { AGAIN: 0, BAD: 0, GOOD: 0, PERFECT: 0 };
    const mature = { AGAIN: 0, BAD: 0, GOOD: 0, PERFECT: 0 };

    reviews.forEach((review) => {
      if (review.oldIntervalDays === 0) {
        learning[review.rating]++;
      } else if (review.oldIntervalDays < 21) {
        young[review.rating]++;
      } else {
        mature[review.rating]++;
      }
    });

    return { learning, young, mature };
  }

  private async getCardsAdded(
    deckId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Array<{ date: string; count: number }>> {
    const flashcards = await this.prisma.flashcard.findMany({
      where: {
        deckId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: { createdAt: true },
    });

    const addedMap = new Map<string, number>();
    flashcards.forEach((fc) => {
      const dateKey = fc.createdAt.toISOString().split('T')[0];
      addedMap.set(dateKey, (addedMap.get(dateKey) || 0) + 1);
    });

    return Array.from(addedMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
}
