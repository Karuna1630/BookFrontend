import PropTypes from 'prop-types';
import { FiStar, FiUser, FiCalendar, FiTrash2 } from 'react-icons/fi';
import StarRating from './StarRating';

const ReviewList = ({ reviews, onDeleteReview }) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="bg-blue-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <FiStar className="text-blue-500 text-2xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Be the first to share your thoughts about this book with other readers.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div 
          key={review.id} 
          className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100 
          relative transform hover:scale-[1.01] transition-all duration-300 overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-100 rounded-xl">
                <FiUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{review.user}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <FiCalendar className="text-gray-400" />
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StarRating rating={review.rating} />
              <button
                onClick={() => onDeleteReview(review.id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                title="Delete review"
              >
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })).isRequired,
  onDeleteReview: PropTypes.func.isRequired
};

export default ReviewList; 