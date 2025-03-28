import Footer from "../../Components/Footer";
import BookCard from "../Books/BookCard";
import booksData from "../../../public/book.json";
import { useState, useEffect } from "react";
import Navbar from "../../Components/navbar";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiDollarSign, FiBook, FiX } from "react-icons/fi";
import { getImgUrl } from "../../Utils/getImgUrl";

const categories = [
  { name: "All Books", value: "All" },
  { name: "Business", value: "Business" },
  { name: "Fiction", value: "Fiction" },
  { name: "Horror", value: "Horror" },
  { name: "Adventure", value: "Adventure" },
  { name: "Exchange", value: "Exchange" }
];

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showExchange, setShowExchange] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [exchangeType, setExchangeType] = useState('money');
  const [exchangeAmount, setExchangeAmount] = useState('');

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredBooks(booksData);
    } else if (selectedCategory === "Exchange") {
      const exchangeBooks = booksData.filter(book => book.exchange);
      setFilteredBooks(exchangeBooks);
    } else {
      const filtered = booksData.filter(book => {
        const categoryLower = selectedCategory.toLowerCase();
        
        return (book.category && book.category.toLowerCase() === categoryLower) ||
               (book.genre && book.genre.toLowerCase() === categoryLower) ||
               (book.categories && Array.isArray(book.categories) && 
                book.categories.some(cat => cat.toLowerCase() === categoryLower)) ||
               (book.type && book.type.toLowerCase() === categoryLower);
      });
      
      setFilteredBooks(filtered);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  const handleExchangeClick = (book) => {
    setSelectedBook(book);
    setShowExchange(true);
  };

  const handleSubmitExchange = () => {
    // Handle exchange submission
    setShowExchange(false);
    setSelectedBook(null);
    setExchangeType('money');
    setExchangeAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200">
      <Navbar />

      {/* Category Navigation */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 whitespace-nowrap">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200
                  ${selectedCategory === category.value 
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {selectedCategory === "All" ? "All Books" : `${selectedCategory} Books`}
          </h1>
          <p className="text-gray-600">
            Browse our collection of {selectedCategory.toLowerCase()} books
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <BookCard book={book} onExchangeClick={() => handleExchangeClick(book)} />
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <h3 className="text-2xl text-gray-500 mb-4">No books found in this category</h3>
              <p className="text-gray-400">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>

      {/* Exchange Options Modal */}
      {showExchange && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative z-50">
            <button 
              onClick={() => {
                setShowExchange(false);
                setSelectedBook(null);
                setExchangeType('money');
                setExchangeAmount('');
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Exchange Book</h3>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={`${getImgUrl(selectedBook.coverImage)}`}
                alt={selectedBook.title}
                className="w-20 h-28 object-cover rounded"
              />
              <div>
                <h4 className="text-lg font-medium">{selectedBook.title}</h4>
                <div className="text-sm text-gray-600 mt-2">Available for:</div>
                <div className="flex items-center gap-2 mt-1">
                  <FiDollarSign className="text-green-600" />
                  <span>Rs.{selectedBook.exchange.money}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <FiBook className="text-blue-600" />
                  <span>{selectedBook.exchange.books[0]}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Exchange Type</div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setExchangeType('money')}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    exchangeType === 'money'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiDollarSign /> Money
                </button>
                <button
                  onClick={() => setExchangeType('books')}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                    exchangeType === 'books'
                      ? 'bg-gray-200 text-gray-800'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiBook /> Books
                </button>
              </div>
            </div>

            {exchangeType === 'money' && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Amount (Rs.)</label>
                <input
                  type="number"
                  value={exchangeAmount}
                  onChange={(e) => setExchangeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              onClick={handleSubmitExchange}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Exchange Request
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Product;