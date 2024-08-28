const express = require('express');
const app = express();
const port = 3000;

// middleware to parse JSON bodies
app.use(express.json());

let books = [];

// Create a new book (POST request)
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
      }

    const id = books.length+1;

    const newBook = { id, title, author };

    books.push(newBook);

    res.status(201).json(newBook);
});

app.get('/books', (req, res) => {
    res.json(books)
})

// Get a book by ID (GET request)
app.get('/books/:id', (req, res) => {
    const {id} = req.params;

    // find the book by id
    const book = books.find(b => b.id == id);

    if(book){
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Update a book by ID (PUT request)
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;

    // find the book by id
    const book = books.find(b => b.id == id);

    if (!title && !author) {
        return res.status(400).json({ error: 'At least one field (title or author) is required for update' });
     }

    if(book){
        // update book detail
        book.title = title || book.title;
        book.author = author || book.author;
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});


// Delete a book by ID (DELETE request)
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    // find the book index by id
    const bookIndex = books.findIndex(b => b.id == id);

    if(bookIndex !== -1){
        // Remove the book from the array
        const deleteBook = books.splice(bookIndex, 1);
        res.json(deleteBook);
    } else {
        res.status(404).send('Book not bound');
    }
});

// Global error handler for any unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error : 'Internal Server Error'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})