import PropTypes from 'prop-types';
import { FiX, FiDollarSign, FiBook } from 'react-icons/fi';
import { getImgUrl } from '../../../Utils/getImgUrl';

const ExchangeModal = ({ book, exchangeType, setExchangeType, exchangeAmount, setExchangeAmount, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative z-50">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <h3 className="text-xl font-semibold mb-4">Exchange Book</h3>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="w-20 h-28 object-cover rounded"
          />
          <div>
            <h4 className="text-lg font-medium">{book.title}</h4>
            <div className="text-sm text-gray-600 mt-2">Available for:</div>
            <div className="flex items-center gap-2 mt-1">
              <FiDollarSign className="text-green-600" />
              <span>Rs.{book.exchange.money}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <FiBook className="text-blue-600" />
              <span>{book.exchange.books[0]}</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Exchange Type</div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setExchangeType('money')}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                exchangeType === 'money'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiDollarSign /> Money
            </button>
            <button
              onClick={() => setExchangeType('books')}
              className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                exchangeType === 'books'
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiBook /> Books
            </button>
          </div>
        </div>

        {exchangeType === 'money' && (
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Amount (Rs.)</label>
            <input
              type="number"
              value={exchangeAmount}
              onChange={(e) => setExchangeAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Exchange Request
        </button>
      </div>
    </div>
  );
};

ExchangeModal.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    exchange: PropTypes.shape({
      money: PropTypes.number.isRequired,
      books: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }).isRequired,
  exchangeType: PropTypes.oneOf(['money', 'books']).isRequired,
  setExchangeType: PropTypes.func.isRequired,
  exchangeAmount: PropTypes.string.isRequired,
  setExchangeAmount: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ExchangeModal; 