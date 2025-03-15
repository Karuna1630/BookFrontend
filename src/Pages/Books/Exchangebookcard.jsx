import { FiRefreshCw } from "react-icons/fi";
import { getImgUrl } from "../../Utils/getImgUrl";
import { Link } from "react-router-dom";

const ExchangeBookCard = ({ book }) => {
  if (!book) return null;

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/exchangebook/${book._id}`}>
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/exchangebook/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book?.description?.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book?.description}
          </p>

          {/* Exchange Details */}
          {book.exchange && (
            <div className="mb-5">
              <p className="font-medium text-lg">Exchange Options:</p>
              <ul className="text-gray-700">
                <li>
                  💰 Money:{" "}
                  <span className="font-semibold">
                    ${book.exchange.money ?? "N/A"}
                  </span>
                </li>
                <li>
                  📚 Books:
                  {book.exchange.books?.length ? (
                    <ul className="ml-5 list-disc">
                      {book.exchange.books.map((exchangeBook, index) => (
                        <li key={index}>{exchangeBook}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="ml-2 text-gray-500">No books available</span>
                  )}
                </li>
              </ul>
            </div>
          )}

          <button
             className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 rounded-lg 
             transition-all duration-300 ease-in-out 
           hover:bg-blue-500 hover:scale-105 hover:shadow-lg"
          >
            <FiRefreshCw className="text-lg" />
            <span>Exchange Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeBookCard;