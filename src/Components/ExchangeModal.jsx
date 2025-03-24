import { useState } from 'react';
import { FiX, FiBook, FiDollarSign } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { getImgUrl } from "../Utils/getImgUrl";

const ExchangeModal = ({ book, isOpen, onClose }) => {
  const [exchangeType, setExchangeType] = useState('money');
  const [moneyAmount, setMoneyAmount] = useState('');
  const [selectedBooks, setSelectedBooks] = useState(['']);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement exchange request submission
    const exchangeData = {
      bookId: book._id,
      exchangeType,
      offer: exchangeType === 'money' ? Number(moneyAmount) : selectedBooks.filter(book => book.trim() !== '')
    };
    console.log('Exchange request:', exchangeData);
    onClose();
  };

  const addBookField = () => {
    setSelectedBooks([...selectedBooks, '']);
  };

  const removeBookField = (index) => {
    const newBooks = selectedBooks.filter((_, i) => i !== index);
    setSelectedBooks(newBooks);
  };

  const updateBookField = (index, value) => {
    const newBooks = [...selectedBooks];
    newBooks[index] = value;
    setSelectedBooks(newBooks);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md m-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Exchange Book</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="text-xl text-gray-600" />
          </button>
        </div>

        {/* Book Info */}
        <div className="flex gap-4 mb-6">
          <img 
            src={getImgUrl(book.coverImage)} 
            alt={book.title} 
            className="w-20 h-28 object-cover rounded-md shadow-md"
          />
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
            <p className="text-gray-600 text-sm">
              Available for:
              {book.exchange.money && <span className="block">💰 Rs.{book.exchange.money}</span>}
              {book.exchange.books?.length > 0 && (
                <span className="block">📚 {book.exchange.books.join(', ')}</span>
              )}
            </p>
          </div>
        </div>

        {/* Exchange Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="text-gray-700 font-medium mb-2 block">Exchange Type</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setExchangeType('money')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
                  ${exchangeType === 'money' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <FiDollarSign />
                Money
              </button>
              <button
                type="button"
                onClick={() => setExchangeType('books')}
                className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors
                  ${exchangeType === 'books' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <FiBook />
                Books
              </button>
            </div>
          </div>

          {/* Money Input */}
          {exchangeType === 'money' && (
            <div className="mb-6">
              <label className="text-gray-700 font-medium mb-2 block">Amount (Rs.)</label>
              <input
                type="number"
                value={moneyAmount}
                onChange={(e) => setMoneyAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min="1"
              />
            </div>
          )}

          {/* Books Input */}
          {exchangeType === 'books' && (
            <div className="mb-6">
              <label className="text-gray-700 font-medium mb-2 block">Books to Exchange</label>
              <div className="space-y-3">
                {selectedBooks.map((book, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={book}
                      onChange={(e) => updateBookField(index, e.target.value)}
                      placeholder="Enter book title"
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    {selectedBooks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBookField(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBookField}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add another book
                </button>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium
              hover:bg-blue-500 transition-colors duration-300"
          >
            Submit Exchange Request
          </button>
        </form>
      </div>
    </div>
  );
};

ExchangeModal.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    exchange: PropTypes.shape({
      money: PropTypes.number,
      books: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ExchangeModal; 