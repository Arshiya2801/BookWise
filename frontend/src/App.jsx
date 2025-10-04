// src/App.jsx (Modified)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";
import ProtectedRoute from "./components/ProtectedRoute"; // NEW IMPORT
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:id" element={<BookDetails />} />

          {/* PROTECTED ROUTES IMPLEMENTATION */}
          <Route element={<ProtectedRoute />}>
            <Route path="/add" element={<AddBook />} />
            {/* Add route for EditBook.jsx here when you create it */}
            <Route path="/edit/:id" element={<AddBook isEdit={true} />} /> 
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;