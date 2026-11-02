import { z } from "zod";

// A schema for creating a new review
export const createReviewSchema = z.object({
    bookId: z.number().int().positive("Book ID is required"),
    userId: z.number().int().positive("User ID is required"),
    review: z.string().min(1, "Review is required"),
    rating: z.number().int().positive("Rating is required"),
});
