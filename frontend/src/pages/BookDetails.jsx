// src/pages/BookDetails.jsx (Modified for Reviews & Rating)
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api/axios"; // Use the API instance
import { AuthContext } from "../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]); // Separate state for reviews
  const [rating, setRating] = useState(5); // For new review rating
  const [reviewText, setReviewText] = useState(""); // For new review text
  const { user } = useContext(AuthContext);

  // --- Fetching Logic ---
  const fetchData = async () => {
    try {
      // 1. Fetch Book Details (should include averageRating and addedBy)
      const bookRes = await API.get(`/books/${id}`);
      setBook(bookRes.data);

      // 2. Fetch Reviews for this Book
      const reviewRes = await API.get(`/reviews/book/${id}`);
      setReviews(reviewRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // --- Review Submission Logic ---
  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login to add review!");
    try {
      await API.post(`/reviews/${id}`, { rating, reviewText });
      alert("Review added! Refreshing data...");
      setReviewText("");
      // Re-fetch data to update reviews and average rating immediately
      fetchData(); 
    } catch (err) {
      // Handle the unique constraint error from the backend if a user tries to review twice
      alert("Failed to post review. You might have already reviewed this book.");
    }
  };
  
  // --- UI Logic ---
  if (!book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow-lg">
      <h2 className="text-3xl font-extrabold">{book.title}</h2>
      <p className="text-gray-700">By {book.author}</p>
      
      {/* Average Rating Display */}
      <div className="mt-2 text-xl font-bold text-yellow-500">
        ⭐ {book.averageRating?.toFixed(1) || '0.0'} / 5 ({reviews.length} reviews)
      </div>

      <p className="mt-4 text-gray-800">{book.description}</p>
      
      {/* Edit/Delete Buttons (Authorization Check) */}
      {user && user.id === book.addedBy._id && ( // Note: Check against book.addedBy._id, which is populated by the backend
        <div className="mt-4 flex gap-2">
          <Link to={`/edit/${book._id}`} className="px-3 py-1 bg-green-500 text-white rounded">Edit Book</Link>
          <button className="px-3 py-1 bg-red-500 text-white rounded">Delete Book (TODO)</button>
        </div>
      )}

      <h3 className="mt-8 font-semibold text-2xl border-t pt-4">Reviews</h3>
      
      {/* Add Review Form */}
      {user && (
        <form onSubmit={handleAddReview} className="mt-4 space-y-3 p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-2">
            <label>Rating:</label>
            <input 
              type="number" 
              min="1" 
              max="5" 
              value={rating} 
              onChange={(e) => setRating(Number(e.target.value))} 
              className="border p-1 w-16 text-center"
              required
            />
          </div>
          <textarea
            className="w-full border p-2 rounded"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your detailed review"
            rows="3"
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Post Review
          </button>
        </form>
      )}


      {/* Display Existing Reviews */}
      <div className="mt-6 space-y-4">
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r._id} className="p-4 border rounded shadow-sm">
              <div className="font-semibold text-lg flex justify-between items-center">
                <span>{r.userId.name}</span>
                <span className="text-yellow-500">⭐ {r.rating}</span>
              </div>
              <p className="text-gray-600 italic">{r.reviewText}</p>
              {/* Add Edit/Delete review button here (TODO) */}
            </div>
          ))
        ) : (
          <p className="text-gray-500">Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;