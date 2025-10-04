import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AddBook = () => {
  const [form, setForm] = useState({ title: "", author: "", description: "" });
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first!");

    try {
      await axios.post("http://localhost:5000/api/books", form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Book added successfully!");
      setForm({ title: "", author: "", description: "" });
    } catch (err) {
      alert("Error adding book");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          className="w-full border p-2"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
