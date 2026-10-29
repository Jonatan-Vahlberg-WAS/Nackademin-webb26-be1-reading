import { Router } from 'express';
import { getLoans, createLoan } from '../data/loans.js';

// creates a new router instance
// A router bundles a set of routes for a given part of the URL
// in this case, we are creating a router for the /api/v1/loans URL
// so all the routes defined in this file will be prefixed with /api/v1/loans
const router = Router();

router.get('/', (req, res) => {
    const loans = getLoans();
    res.status(200).json(loans);
});

router.post('/', (req, res) => {
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    if (!bookId || !userId) {
        return res.status(400).json({ error: 'Book ID and user ID are required' });
    }
    const loan = createLoan({ bookId, userId });
    res.status(201).json(loan);
});

export { router as loansRouter };