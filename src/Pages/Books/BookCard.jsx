import { getImgUrl } from "../../Utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, clearCartMessage } from "../../Redux/features/cart/cartSlice";
import { FiRefreshCw } from "react-icons/fi";
import PropTypes from 'prop-types';
import { useState } from 'react';
import ExchangeModal from "../../Components/ExchangeModal";

const BookCard = ({ book, onExchangeClick }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setTimeout(() => {
      dispatch(clearCartMessage());
    }, 3000);
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt={book.title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description?.length > 80 ? `${book.description.slice(0, 80)}...` : book?.description}
          </p>

          <p className="font-medium mb-5">
            Rs.{book?.newPrice} <span className="line-through font-normal ml-2">Rs. {book?.oldPrice}</span>
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => handleAddToCart(book)}
              className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg 
               transition-all duration-300 ease-in-out 
               hover:bg-blue-500 hover:scale-105 hover:shadow-lg"
            >
              <span>Add to Cart</span>
            </button>
            {book.exchange && (
              <button
                onClick={() => onExchangeClick(book)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg 
                hover:bg-opacity-90 transition-colors flex items-center"
              >
                <FiRefreshCw />
              </button>
            )}
          </div>
        </div>
      </div>

      <ExchangeModal
        book={{ ...book, _id: String(book._id) }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    coverImage: PropTypes.string.isRequired,
    newPrice: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    exchange: PropTypes.shape({
      money: PropTypes.number,
      books: PropTypes.arrayOf(PropTypes.string)
    }),
  }).isRequired,
  onExchangeClick: PropTypes.func.isRequired,
};

export default BookCard;
