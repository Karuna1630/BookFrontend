import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import BookCard from './BookCard';
import { FiDollarSign, FiBook, FiX } from "react-icons/fi";
import { getImgUrl } from "../../Utils/getImgUrl";

import 'swiper/css';
import 'swiper/css/navigation';

const Recommended = ({ books }) => {
  const [showExchange, setShowExchange] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [exchangeType, setExchangeType] = useState('money');
  const [exchangeAmount, setExchangeAmount] = useState('');

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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Recommended Books</h2>
      
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="recommended-swiper"
      >
        {books.map((book) => (
          <SwiperSlide key={book._id}>
            <BookCard book={book} onExchangeClick={() => handleExchangeClick(book)} />
          </SwiperSlide>
        ))}
      </Swiper>

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

export default Recommended; 