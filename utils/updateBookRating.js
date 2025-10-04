import Review from '../models/Review.js';
import Book from '../models/Book.js';
import mongoose from 'mongoose';

export default async function updateBookRating(bookId) {
  if (!mongoose.isValidObjectId(bookId)) return;
  const agg = await Review.aggregate([
    { $match: { bookId: mongoose.Types.ObjectId(bookId) } },
    { $group: { _id: '$bookId', avg: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  const avg = agg[0]?.avg ?? 0;
  const count = agg[0]?.count ?? 0;
  await Book.findByIdAndUpdate(bookId, { averageRating: avg, reviewCount: count });
}
