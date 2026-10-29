import express from 'express';
import { env } from './config/env.js';
import { logRequest } from './middlewares/logger.js';

import { loansRouter } from './routes/loans.js';

import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} from './data/books.js';

/**
 * Create a new express application for running our API on
 * @returns {express.Application}
 */
export function createApp() {
    // Instantiates a new express application
    const app = express();

    // Add a middleware to parse the request body as JSON
    app.use(express.json());

    // Custom middleware to log the request
    app.use(logRequest);

    // Add a health check endpoint
    app.get('/health', (req, res) => {
        // Respond with a 200 status code and a JSON object with a status key
        res.status(200).json({
            status: 'ok',
            message: 'API is running',
            appName: env.appName,
            tagLine: env.libraryTagline,
        });
    });

    app.get("/api/v1/opening-hours", (req, res) => {
        res.status(200).json({
            weekday: '07:00 - 17:00',
            saturday: '08:00 - 15:00',
            sunday: 'Closed',
        });
    });

    // A GET: endpoint for retrieving all books from a "db"
    app.get("/api/v1/books", (req, res) => {
        // Respond with a 200 status code and a JSON array with in memory books
        const books = getBooks();
        res.status(200).json(books);
    });

    // A GET: endpoint for retrieving a book by its id
    app.get("/api/v1/books/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const book = getBookById(id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    });

    // A POST: endpoint for creating a new book
    app.post("/api/v1/books", (req, res) => {
        const title = req.body.title;
        const author = req.body.author;
        if (!title || !author) {
            return res.status(400).json({ error: 'Title and author are required' });
        }
        const book = createBook({ title, author });
        res.status(201).json(book);
    });

    // A PUT: endpoint for updating a book by its id
    app.put("/api/v1/books/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const title = req.body.title;
        const author = req.body.author;
        if (!title || !author) {
            return res.status(400).json({ error: 'Title and author are required' });
        }
        const book = updateBook(id, { title, author });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    });

    // A DELETE: endpoint for deleting a book by its id
    app.delete("/api/v1/books/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const success = deleteBook(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    });

    // Implement the loans routes all routes defined in the loansRouter will be prefixed with /api/v1/loans
    app.use("/api/v1/loans", loansRouter);

    return app;
}