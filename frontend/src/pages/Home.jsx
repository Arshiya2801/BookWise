// src/pages/Home.jsx (Modified for Pagination)
import { useEffect, useState } from "react";
import API from "../api/axios"; // Use your configured API instance
import BookCard from "../components/BookCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        // Fetching with pagination query parameter
        const res = await API.get(`/books?page=${page}`);
        setBooks(res.data.books);
        setTotalPages(res.data.pages);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page]); // Re-fetch whenever the page state changes

  if (loading) return <p className="text-center mt-10">Loading books...</p>;

  return (
    <div className="p-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(page => Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page => Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;