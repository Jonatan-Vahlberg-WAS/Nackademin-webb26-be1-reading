import { z } from "zod";

// A schema for creating a new loan
export const createLoanSchema = z.object({
    bookId: z.number().int().positive("Book ID is required"),
    userId: z.number().int().positive("User ID is required"),
});

// A schema for updating a loan
export const updateLoanSchema = z.object({
    bookId: z.number().int().positive("Book ID is required").optional(),
    userId: z.number().int().positive("User ID is required").optional(),
});