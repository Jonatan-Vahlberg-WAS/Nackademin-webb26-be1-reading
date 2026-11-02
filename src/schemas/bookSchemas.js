import { z } from "zod";

// A schema for creating a new book
export const createBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
});

// A schema for updating a book
export const updateBookSchema = z.object({
    title: z.string().trim().min(1, "Title is required").optional(),
    author: z.string().trim().min(1, "Author is required").optional(),
});

// A schema for querying books
export const bookQuerySchema = z.object({
    search: z.string().trim().optional(),
    author: z.string().trim().optional(),
});