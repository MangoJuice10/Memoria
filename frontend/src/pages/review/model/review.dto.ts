export type ReviewRating =
    | "AGAIN"
    | "BAD"
    | "GOOD"
    | "PERFECT"

export type ReviewDto = {
    rating: ReviewRating;
}