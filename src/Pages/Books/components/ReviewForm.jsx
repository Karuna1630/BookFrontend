import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiSend } from 'react-icons/fi';
import StarRating from './StarRating';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating</label>
        <StarRating 
          rating={rating} 
          onRatingChange={setRating} 
          interactive={true} 
        />
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          id="comment"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Share your thoughts about this book..."
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
      >
        <FiSend className="text-lg" />
        <span className="font-semibold">Submit Review</span>
      </button>
    </form>
  );
};

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReviewForm; 