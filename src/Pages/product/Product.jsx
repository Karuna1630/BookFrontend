import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import BookCard from "../Books/BookCard";
import ExchangeBookCard from "../Books/Exchangebookcard";
import booksData from "../../../public/book.json";
import exchangeBooksData from "../../../public/exchangebook.json";
import { useState, useEffect } from "react";

const categories = ["All", "Business", "Fiction", "Horror", "Adventure", "Exchange"];

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    console.log("Books data sample:", booksData[0]);

    if (selectedCategory === "Exchange") {
      setFilteredBooks(exchangeBooksData);
    } else if (selectedCategory === "All") {
      setFilteredBooks(booksData);
    } else {
      // More flexible filtering - try multiple properties and case-insensitive matching
      const filtered = booksData.filter(book => {
        const categoryLower = selectedCategory.toLowerCase();
        
        // Check various possible category fields with case-insensitive comparison
        return (book.category && book.category.toLowerCase() === categoryLower) ||
               (book.genre && book.genre.toLowerCase() === categoryLower) ||
               (book.categories && Array.isArray(book.categories) && 
                book.categories.some(cat => cat.toLowerCase() === categoryLower)) ||
               (book.type && book.type.toLowerCase() === categoryLower);
      });
      
      setFilteredBooks(filtered);
    }
  }, [selectedCategory]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-200 ">
      <Navbar />

      {/* Genre Menu */}
      <div className="flex gap-4 p-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md ${
              selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Books Listing */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            selectedCategory === "Exchange" ? (
              <ExchangeBookCard key={book._id} book={book} />
            ) : (
              <BookCard key={book._id} book={book} />
            )
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <h3 className="text-xl text-gray-500">No books found in this category</h3>
            <p className="text-gray-400 mt-2">Check console log to see book data structure</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Product;