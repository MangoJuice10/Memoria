import { ReviewRating } from "@prisma/client";

export const MIN_EASE_FACTOR = 1.3;
export const DEFAULT_EASE_FACTOR = 2.5;

export const FIRST_INTERVAL_DAYS = 1;
export const SECOND_INTERVAL_DAYS = 6;

export const PASSING_QUALITY = 3;

export const REVIEW_RATING_TO_QUALITY: Record<ReviewRating, 0 | 3 | 4 | 5> = {
  AGAIN: 0,
  BAD: 3,
  GOOD: 4,
  PERFECT: 5,
};
