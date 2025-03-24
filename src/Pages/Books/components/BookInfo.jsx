import PropTypes from 'prop-types';
import { FiStar, FiRefreshCw, FiBook, FiDollarSign } from 'react-icons/fi';
import { getImgUrl } from '../../../Utils/getImgUrl';

const BookInfo = ({ 
  book, 
  showExchange, 
  exchangeType, 
  setExchangeType, 
  exchangeAmount, 
  setExchangeAmount,
  handleAddToCart,
  handleExchangeClick
}) => {
  const averageRating = book.reviews?.length 
    ? Math.round((book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length) * 2) / 2
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiStar className="text-yellow-500" />
                <span className="font-medium">Rating: {averageRating.toFixed(1)}</span>
              </div>
              <span className="text-gray-600">({book.reviews?.length || 0} reviews)</span>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 p-8">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1.5 rounded-full">
                {book.category}
              </span>
              {book.trending && (
                <span className="inline-flex items-center bg-red-100 text-red-800 text-sm font-medium px-4 py-1.5 rounded-full">
                  Trending
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-3">{book.title}</h1>
            
            {book.author && (
              <p className="text-xl text-gray-600 mb-3 font-medium">By {book.author}</p>
            )}

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 mb-8 shadow-sm">
              <p className="text-gray-700 text-lg leading-relaxed">{book.description}</p>
            </div>

            {showExchange && book.exchange ? (
              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Exchange Options</h3>
                
                <div className="flex gap-4 mb-6">
                  <button
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

                {exchangeType === 'money' ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FiDollarSign className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Exchange Price:</span>
                        <span className="ml-2 text-green-600 font-bold">Rs.{book.exchange.money}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-gray-700 font-medium mb-2">Enter Amount (Rs.)</label>
                      <input
                        type="number"
                        value={exchangeAmount}
                        onChange={(e) => setExchangeAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min="1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg mt-1">
                        <FiBook className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium">Available for exchange with:</span>
                        <ul className="mt-3 space-y-2">
                          {book.exchange.books.map((exchangeBook, index) => (
                            <li key={index} className="text-gray-600 flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                              {exchangeBook}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 shadow-sm">
                <p className="text-3xl font-bold text-gray-800">
                  Rs.{book.newPrice}
                  {book.oldPrice && (
                    <span className="text-xl text-gray-500 line-through ml-3">
                      Rs.{book.oldPrice}
                    </span>
                  )}
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => handleAddToCart(book)}
                className="flex-1 bg-blue-600 text-white px-8 py-3.5 rounded-xl
                  text-lg font-semibold transition-all duration-300 
                  hover:bg-blue-500 hover:shadow-lg transform hover:scale-[1.02]"
              >
                Add to Cart
              </button>
              {book.exchange && (
                <button
                  onClick={handleExchangeClick}
                  className={`${
                    showExchange 
                      ? exchangeType === 'money' ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'
                      : 'bg-gray-600 hover:bg-gray-500'
                  } text-white px-6 py-3.5 rounded-xl 
                  hover:shadow-lg transition-all duration-300 flex items-center gap-2
                  text-lg font-semibold transform hover:scale-[1.02]`}
                >
                  <FiRefreshCw className={`text-xl ${showExchange ? 'rotate-180' : ''} transition-transform duration-300`} />
                  <span>Exchange</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BookInfo.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    trending: PropTypes.bool,
    coverImage: PropTypes.string.isRequired,
    newPrice: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    exchange: PropTypes.shape({
      money: PropTypes.number.isRequired,
      books: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    reviews: PropTypes.arrayOf(PropTypes.shape({
      rating: PropTypes.number.isRequired
    }))
  }).isRequired,
  showExchange: PropTypes.bool.isRequired,
  exchangeType: PropTypes.oneOf(['money', 'books']).isRequired,
  setExchangeType: PropTypes.func.isRequired,
  exchangeAmount: PropTypes.string.isRequired,
  setExchangeAmount: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleExchangeClick: PropTypes.func.isRequired
};

export default BookInfo; 