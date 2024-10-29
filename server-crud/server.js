const express =require('express');
const cors =require('cors');
const app = express();
const PORT = 5000;
let nextId = 4;

app.use(cors());
app.use(express.json());

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: '1984', author: 'George Orwell' },
  ];

  //Get all books
  app.get('/books', (req, res) => {
    res.json(books);
  });

  //Get a specific book
  app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });

  //Create a new Book
  app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    const newBook = {
      id: nextId++,
      title,
      author,
    };
    books.push(newBook);
    res.status(201).json({ message: 'Book created successfully', book: newBook });
  });

  //Update a book
  app.put('/books/:id', (req, res)=>{
  const bookId = parseInt(req.params.id, 10);
  const { title, author } = req.body;
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], title, author };
    res.json({ message: 'Book updated successfully', book: books[bookIndex] });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
  });
  //Delete a book
  app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex((b) => b.id === bookId);
  
    if (bookIndex !== -1) {
      const deletedBook = books.splice(bookIndex, 1);
      res.json({ message: 'Book deleted successfully', book: deletedBook[0] });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });