import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controllers/book.controller.js';

const router = express.Router();

// public: list & details
router.get('/', getBooks);
router.get('/:id', getBookById);

// protected: add, edit, delete
router.post('/', protect, addBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

export default router;
