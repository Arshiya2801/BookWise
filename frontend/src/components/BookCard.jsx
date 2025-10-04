import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition">
      <h3 className="text-lg font-bold">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
      <p className="text-yellow-600 text-sm">⭐ {book.rating || "No rating"}</p>
      <Link
        to={`/book/${book._id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
