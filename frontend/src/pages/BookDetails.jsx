import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [review, setReview] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(console.error);
  }, [id]);

  const addReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login to add review!");
    try {
      await axios.post(
        `http://localhost:5000/api/reviews/${id}`,
        { review },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Review added!");
      setReview("");
    } catch {
      alert("Failed to post review");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-gray-700">By {book.author}</p>
      <p className="mt-4">{book.description}</p>

      <h3 className="mt-6 font-semibold text-lg">Reviews</h3>
      {book.reviews?.length > 0 ? (
        book.reviews.map((r, i) => (
          <p key={i} className="border-b py-2">{r.comment}</p>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      <form onSubmit={addReview} className="mt-4 flex gap-2">
        <input
          className="flex-1 border p-2"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>
    </div>
  );
};

export default BookDetails;
