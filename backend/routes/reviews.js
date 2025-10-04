import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByBook,
} from '../controllers/review.controller.js';

const router = express.Router();

// Add review
router.post('/:bookId', protect, addReview);

// Get all reviews for a book
router.get('/book/:bookId', getReviewsByBook);

// Update review
router.put('/:id', protect, updateReview);

// Delete review
router.delete('/:id', protect, deleteReview);

export default router;
