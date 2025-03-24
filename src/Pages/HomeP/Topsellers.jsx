import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookCard from "../Books/BookCard";
import { FiDollarSign, FiBook, FiX } from "react-icons/fi";
import { getImgUrl } from "../../Utils/getImgUrl";

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const [showExchange, setShowExchange] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [exchangeType, setExchangeType] = useState('money');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const swiperRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    fetch("/book.json")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.params.navigation.prevEl = prevButtonRef.current;
      swiperRef.current.swiper.params.navigation.nextEl = nextButtonRef.current;
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

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

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter((book) => book.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="px-10 py-6 relative bg-gradient-to-r from-blue-50 to-blue-200">
      <h2 className="text-4xl font-semibold mb-6">Top Sellers</h2>
      
      {/* Genre Dropdown */}
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Navigation Buttons */}
      <div className="relative">
        <button
          ref={prevButtonRef}
          className="absolute left-[-40px] ml-2 top-1/2 w-10 h-10 transform -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          ❮
        </button>
        <button
          ref={nextButtonRef}
          className="absolute right-[-40px] mr-2 top-1/2 w-10 h-10 transform -translate-y-1/2 z-10 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          ❯
        </button>

        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={30}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 2, spaceBetween: 50 },
            1080: { slidesPerView: 3, spaceBetween: 50 },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {filteredBooks.length > 0 &&
            filteredBooks.map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} onExchangeClick={() => handleExchangeClick(book)} />
              </SwiperSlide>
            ))}
        </Swiper>
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
    </div>
  );
};

export default TopSellers;
