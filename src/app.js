import express from 'express';
import { env } from './config/env.js';
import { logRequest } from './middlewares/logger.js';

import { booksRouter } from './routes/books.js';
import { loansRouter } from './routes/loans.js';
import { reviewsRouter } from './routes/reviews.js';

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

    
    // Implement the routers: routes all endpoints defined in the routers will be prefixed with the router's path as in /api/v1/books/...
    app.use("/api/v1/books", booksRouter);
    app.use("/api/v1/books/:bookId/reviews", reviewsRouter);
    app.use("/api/v1/loans", loansRouter);

    return app;
}