import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../Utils/getImgUrl";
import { clearCart, removeFromCart } from "../../Redux/features/cart/cartSlice";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/navbar";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen py-20">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>

          {cartItems.length > 0 ? (
            <ul className="divide-y divide-gray-200 mt-4">
              {cartItems.map((product) => (
                <li key={product?._id} className="flex items-center py-4">
                  <img
                    src={getImgUrl(product?.coverImage)}
                    alt={product?.title}
                    className="h-24 w-24 object-cover rounded-lg shadow-md border"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{product?.title}</h3>
                    <p className="text-gray-600 text-sm capitalize"><strong>Category:</strong> {product?.category}</p>
                    <p className="text-gray-800 font-semibold">Rs.{product?.newPrice}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(product)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center mt-6">Your cart is empty!</p>
          )}

          {cartItems.length > 0 && (
            <div className="border-t mt-6 pt-4">
              <div className="flex justify-between text-lg font-medium text-gray-800">
                <p>Subtotal</p>
                <p>Rs.{totalPrice}</p>
              </div>
              <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/checkout"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
