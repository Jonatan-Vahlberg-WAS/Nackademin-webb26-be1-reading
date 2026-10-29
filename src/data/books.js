

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 4, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
    { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen' },
    { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
    { id: 7, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
    { id: 8, title: 'The Wizard of Oz', author: 'L. Frank Baum' },
    { id: 9, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 10, title: '1984', author: 'George Orwell' },
];

let nextId = 11;

/**
 * Get all books
 * @returns {Array<Object>} - An array of book objects
 */
export function getBooks() {
    return books;
}

/**
 * Get a book by its id
 * @param {number} id - The id of the book to get
 * @returns {Object|null} - A book object or null if not found
 */
export function getBookById(id) {
    return books.find(book => book.id === id) || null;
}

/**
 * Create a new book
 * @param {Object} book - The book object to create
 * @returns {Object} - The created book object
 */
export function createBook(book) {
    nextId = Math.max(...books.map(book => book.id)) + 1;
    const newBook = { id: nextId, ...book };
    books.push(newBook);
    return newBook;
}

/**
 * Update a book by its id
 * @param {number} id - The id of the book to update
 * @param {Object} book - The book object to update
 * @returns {Object|null} - The updated book object or null if not found
 */
export function updateBook(id, book) {
    const index = books.findIndex(book => book.id === id);
    // Book found, update it
    if (index !== -1) {
        books[index] = { id: nextId, ...book };
        return books[index];
    }
    // Book not found, return null
    return null;
}   

/**
 * Delete a book by its id
 * @param {number} id - The id of the book to delete
 */
export function deleteBook(id) {
    const index = books.findIndex(book => book.id === id);
    // Book found, delete it
    if (index !== -1) {
        books.splice(index, 1);
        return true;
    }
    // Book not found, return false
    return false;
}