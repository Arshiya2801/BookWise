// controllers/review.controller.js
import Review from '../models/Review.js';
import Book from '../models/Book.js';

// ➕ Add review
export const addReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const { bookId } = req.params;

    const review = await Review.create({
      rating,
      reviewText,
      bookId,
      userId: req.user._id,
    });

    // Update average rating
    const reviews = await Review.find({ bookId });
    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Book.findByIdAndUpdate(bookId, { averageRating: avgRating });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
};

// ✏️ Edit review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can edit only your reviews' });
    }

    const updated = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error });
  }
};

// 🗑️ Delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can delete only your reviews' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error });
  }
};

// 📊 Get all reviews for a book
export const getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};
