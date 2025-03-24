import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, clearCartMessage } from '../../Redux/features/cart/cartSlice';
import { FiRefreshCw, FiBook, FiDollarSign, FiStar, FiSend, FiTrash2, FiCalendar, FiUser, FiX } from 'react-icons/fi';
import { getImgUrl } from '../../Utils/getImgUrl';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import StarRating from './components/StarRating';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import ExchangeModal from './components/ExchangeModal';
import BookInfo from './components/BookInfo';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showExchange, setShowExchange] = useState(false);
  const [exchangeType, setExchangeType] = useState('money');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch('/book.json');
        const booksData = await response.json();
        const foundBook = booksData.find(b => b._id.toString() === id);
        
        if (foundBook) {
          setBook(foundBook);
          const savedReviews = localStorage.getItem(`book_reviews_${id}`);
          if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
          }
        } else {
          setError('Book not found');
        }
      } catch (err) {
        console.error('Error loading book details:', err);
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setTimeout(() => {
      dispatch(clearCartMessage());
    }, 3000);
  };

  const handleExchangeClick = () => {
    setShowExchange(true);
  };

  const handleSubmitExchange = () => {
    setShowExchange(false);
    setExchangeType('money');
    setExchangeAmount('');
  };

  const handleReviewSubmit = (review) => {
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      user: 'Anonymous User'
    };
    
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`book_reviews_${id}`, JSON.stringify(updatedReviews));
    setShowReviewForm(false);
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const updatedReviews = reviews.filter(review => review.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem(`book_reviews_${id}`, JSON.stringify(updatedReviews));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">{error || 'Book not found'}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-200">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <BookInfo 
          book={book}
          showExchange={showExchange}
          exchangeType={exchangeType}
          setExchangeType={setExchangeType}
          exchangeAmount={exchangeAmount}
          setExchangeAmount={setExchangeAmount}
          handleAddToCart={handleAddToCart}
          handleExchangeClick={handleExchangeClick}
        />

        <div className="border-t border-gray-200">
          <div className="max-w-4xl mx-auto p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Reviews</h2>
                <p className="text-gray-500">
                  {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                </p>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 
                transition-all duration-300 font-semibold transform hover:scale-[1.02] hover:shadow-lg
                flex items-center gap-2"
              >
                <FiSend className={`${showReviewForm ? 'rotate-90' : ''} transition-transform duration-300`} />
                <span>{showReviewForm ? 'Cancel' : 'Write a Review'}</span>
              </button>
            </div>

            {showReviewForm && (
              <div className="mb-8 p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100">
                <ReviewForm onSubmit={handleReviewSubmit} />
              </div>
            )}

            <ReviewList 
              reviews={reviews}
              onDeleteReview={handleDeleteReview}
            />
          </div>
        </div>
      </div>
      <Footer />

      {showExchange && book && (
        <ExchangeModal
          book={book}
          exchangeType={exchangeType}
          setExchangeType={setExchangeType}
          exchangeAmount={exchangeAmount}
          setExchangeAmount={setExchangeAmount}
          onClose={() => {
            setShowExchange(false);
            setExchangeType('money');
            setExchangeAmount('');
          }}
          onSubmit={handleSubmitExchange}
        />
      )}
    </div>
  );
};

export default BookDetails; 