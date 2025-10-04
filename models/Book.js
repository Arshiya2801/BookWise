import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  description: { type: String },
  genre: { type: String },
  year: { type: Number },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // denormalized fields for faster reads (kept updated when reviews change)
  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
export default Book;
