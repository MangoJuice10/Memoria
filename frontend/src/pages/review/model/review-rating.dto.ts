export type ReviewRating =
    | "AGAIN"
    | "BAD"
    | "GOOD"
    | "PERFECT"

export type ReviewRatingDto = {
    rating: ReviewRating;
}