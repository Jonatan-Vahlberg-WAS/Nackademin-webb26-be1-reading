import express from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../data/books.js';
import { validateBody, validateQuery } from '../middlewares/validate.js';
import { createBookSchema, updateBookSchema, bookQuerySchema } from '../schemas/bookSchemas.js';
const router = express.Router();

// A GET: endpoint for retrieving all books from a "db"
router.get("/", validateQuery(bookQuerySchema), (req, res) => {
    // Respond with a 200 status code and a JSON array with in memory books
    const books = getBooks();
    let filteredBooks = [...books];
    // Filter by author if provided requires full match
    if (req.query.author) {
        filteredBooks = filteredBooks.filter(book => book.author.toLowerCase() === req.query.author.toLowerCase());
    }
    // Filter by title if provided requires partial match can be extended to full text search description or author name
    if (req.query.search) {
        filteredBooks = filteredBooks.filter(book => book.title.toLowerCase().includes(req.query.search.toLowerCase()));
    }
    res.status(200).json(filteredBooks);
});

// A GET: endpoint for retrieving a book by its id validated param by itself
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = getBookById(id);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// A POST: endpoint for creating a new book
router.post("/", validateBody(createBookSchema), (req, res) => {
    const book = createBook(req.body);
    res.status(201).json(book);
});

// A PUT: endpoint for updating a book by its id
router.put("/:id", validateBody(updateBookSchema), (req, res) => {
    const id = parseInt(req.params.id);
    const book = updateBook(id, req.body);
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

// A DELETE: endpoint for deleting a book by its id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const success = deleteBook(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});


export { router as booksRouter };