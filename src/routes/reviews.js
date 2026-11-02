import { Router } from 'express';
import { getBookById } from '../data/books.js';
import { getReviews, createReview } from '../data/reviews.js';
import { validateBody } from '../middlewares/validate.js';
import { createReviewSchema } from '../schemas/reviewSchemas.js';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const book = getBookById(bookId);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const reviews = getReviews(bookId);
    res.status(200).json(reviews);
});

router.post('/', validateBody(createReviewSchema), (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const book = getBookById(bookId);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    if (req.body.bookId !== bookId) {
        return res.status(400).json({ error: 'Book ID does not match' });
    }
    const review = createReview(req.body);
    res.status(201).json(review);
});

export { router as reviewsRouter };