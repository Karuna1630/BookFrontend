import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage when initializing
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const initialState = {
  cartItems: loadCartFromStorage(),
  cartMessage: "" // New state to store the success message
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (!existingItem) {
        state.cartItems.push(action.payload);
        state.cartMessage = `${action.payload.title} is successfully added to cart!`; // Update the message
      } else {
        state.cartMessage = `${action.payload.title} is already exist the cart!`; // Prevent duplicates
      }

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.cartMessage = "Item removed from cart!"; // Message for removal

      // Save to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartMessage = "Cart is now empty!";

      // Clear localStorage
      localStorage.setItem('cartItems', JSON.stringify([]));
    },
    clearCartMessage: (state) => {
      state.cartMessage = ""; // Clear the message
    }
  },
});

export const { addToCart, removeFromCart, clearCart, clearCartMessage } = cartSlice.actions;
export default cartSlice.reducer;
