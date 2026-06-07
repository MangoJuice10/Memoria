import { Injectable } from "@nestjs/common";
import { ReviewRating } from "@prisma/client";
import {
  FIRST_INTERVAL_DAYS,
  MIN_EASE_FACTOR,
  REVIEW_RATING_TO_QUALITY,
  SECOND_INTERVAL_DAYS,
} from "src/review/constants/spaced-repetition.constants";

export type SchedulingState = {
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  dueAt: Date;
};

@Injectable()
export class Sm2Service {
  schedule(
    schedulingState: SchedulingState,
    quality: number,
    now: Date,
  ): SchedulingState {
    const newEaseFactor = this.computeEaseFactor(schedulingState.easeFactor, quality);

    if (quality < 3)
      return {
        repetitions: 0,
        intervalDays: 0,
        easeFactor: newEaseFactor,
        dueAt: now,
      };

    if (schedulingState.repetitions === 0)
      return {
        repetitions: 1,
        intervalDays: FIRST_INTERVAL_DAYS,
        easeFactor: newEaseFactor,
        dueAt: this.addDays(now, FIRST_INTERVAL_DAYS),
      };

    if (schedulingState.repetitions === 1)
      return {
        repetitions: 2,
        intervalDays: SECOND_INTERVAL_DAYS,
        easeFactor: newEaseFactor,
        dueAt: this.addDays(now, SECOND_INTERVAL_DAYS),
      };

    const newIntervalDays = Math.ceil(schedulingState.intervalDays * newEaseFactor);

    return {
      repetitions: schedulingState.repetitions + 1,
      intervalDays: newIntervalDays,
      easeFactor: newEaseFactor,
      dueAt: this.addDays(now, newIntervalDays),
    };
  }

  computeEaseFactor(easeFactor: number, quality: number) {
    const newEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    return Math.max(MIN_EASE_FACTOR, newEaseFactor);
  }

  addDays(date: Date, days: number) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }
}
