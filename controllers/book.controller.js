// controllers/book.controller.js
import Book from '../models/Book.js';

// 📘 Add new book
export const addBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user._id,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// 📚 Get all books (with pagination)
export const getBooks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .populate('addedBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments();
    res.json({ books, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// 📖 Get a single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error });
  }
};

// ✏️ Update a book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit your own books' });
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error });
  }
};

// 🗑️ Delete a book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own books' });
    }

    await book.deleteOne();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error });
  }
};
