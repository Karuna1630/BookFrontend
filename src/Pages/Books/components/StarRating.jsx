import PropTypes from 'prop-types';
import { FiStar } from 'react-icons/fi';

const StarRating = ({ rating, onRatingChange, interactive = false }) => {
  const handleStarClick = (starValue) => {
    if (interactive && onRatingChange) {
      onRatingChange(starValue);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          className={`focus:outline-none ${interactive ? 'cursor-pointer transform hover:scale-110 transition-transform' : ''}`}
          disabled={!interactive}
        >
          <FiStar
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-400' : ''}`}
          />
        </button>
      ))}
      <span className="text-gray-600 ml-2 font-medium text-sm">({rating}/5)</span>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func,
  interactive: PropTypes.bool
};

StarRating.defaultProps = {
  interactive: false,
  onRatingChange: () => {}
};

export default StarRating; 