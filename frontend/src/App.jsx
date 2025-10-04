import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import AddEditBook from "./pages/AddEditBook";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddEditBook />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
