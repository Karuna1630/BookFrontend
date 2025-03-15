
import { getImgUrl } from "../../Utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, clearCartMessage } from "../../Redux/features/cart/cartSlice";
import { useEffect } from "react";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    // Clear the message after 3 seconds
    setTimeout(() => {
      dispatch(clearCartMessage());
    }, 3000);
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <a href="/">
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt={book.title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </a>
        </div>

        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description.length > 80 ? `${book.description.slice(0, 80)}...` : book?.description}
          </p>
          <p className="font-medium mb-5">
            Rs.{book?.newPrice} <span className="line-through font-normal ml-2">Rs. {book?.oldPrice}</span>
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 rounded-lg 
             transition-all duration-300 ease-in-out 
           hover:bg-blue-500 hover:scale-105 hover:shadow-lg"
          >
           
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
