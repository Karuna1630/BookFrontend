import { FiRefreshCw, FiBook, FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState } from 'react';
import ExchangeModal from "../../Components/ExchangeModal";

const ExchangeBookCard = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!book) return null;

  return (
    <>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Book Cover */}
          <div className="sm:w-1/3">
            <Link to={`exchangebook/${book._id}`} className="block">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>

          {/* Book Details */}
          <div className="sm:w-2/3 flex flex-col justify-between">
            <div>
              <Link to={`exchangebook/${book._id}`}>
                <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-3">
                  {book.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-lg mb-6">
                {book?.description?.length > 100
                  ? `${book.description.slice(0, 100)}...`
                  : book?.description}
              </p>

              {/* Exchange Details */}
              {book.exchange && (
                <div className="space-y-4 mb-6">
                  <h4 className="text-xl font-semibold text-gray-800">Exchange Options</h4>
                  <div className="space-y-3">
                    {/* Money Option */}
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <FiDollarSign className="text-green-600" />
                      </div>
                      <span className="font-medium">Money:</span>
                      <span className="text-green-600 font-bold">
                        Rs.{book.exchange.money ?? "N/A"}
                      </span>
                    </div>

                    {/* Books Option */}
                    <div className="flex items-start gap-2 text-gray-700">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                        <FiBook className="text-blue-600" />
                      </div>
                      <div>
                        <span className="font-medium">Books:</span>
                        {book.exchange.books?.length ? (
                          <ul className="mt-2 space-y-1">
                            {book.exchange.books.map((exchangeBook, index) => (
                              <li key={index} className="flex items-center gap-2 text-gray-600">
                                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                {exchangeBook}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="ml-2 text-gray-500">No books available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Exchange Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg 
                transition-all duration-300 ease-in-out 
                hover:bg-blue-500 hover:scale-105 hover:shadow-lg
                flex items-center justify-center gap-2 text-lg font-medium w-full sm:w-auto"
            >
              <FiRefreshCw className="text-xl" />
              <span>Exchange Book</span>
            </button>
          </div>
        </div>
      </div>

      {/* Exchange Modal */}
      <ExchangeModal 
        book={book}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

ExchangeBookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    coverImage: PropTypes.string.isRequired,
    exchange: PropTypes.shape({
      money: PropTypes.number,
      books: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired
};

export default ExchangeBookCard;
