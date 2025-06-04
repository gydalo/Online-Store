import { createSlice } from "@reduxjs/toolkit";

/**
 * Retrieves the saved cart from localStorage or returns an empty array if none exists.
 * @type {Array<Object>}
 */
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

/**
 * Initial state for the cart slice.
 * `products`: an array of products in the cart.
 * `cartTotal`: the total price based on quantity and discountedPrice.
 */
const initialState = {
  products: savedCart,
  cartTotal: savedCart.reduce(
    (total, item) => total + item.quantity * item.discountedPrice,
    0
  ),
};

/**
 * Slice for managing the shopping cart.
 * Handles adding products, removing products, and resetting the cart.
 */
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Adds a product to the cart. If the product already exists, increases its quantity.
     * Also updates the total cart price.
     *
     * @param {Object} state - The current cart state
     * @param {Object} action - Redux action
     * @param {Object} action.payload - The product object to add
     */
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 });
      }

      state.cartTotal += product.discountedPrice;
    },

    /**
     * Resets the cart by clearing all products and setting total to 0.
     * Also clears the saved cart from localStorage.
     *
     * @param {Object} state - The current cart state
     */
    resetCart: (state) => {
      state.products = [];
      state.cartTotal = 0;
      localStorage.removeItem("cart");
    },

    /**
     * Removes one unit of a product from the cart.
     * If it's the last unit, removes the entire product from the cart.
     * Updates the cart total and localStorage.
     *
     * @param {Object} state - The current cart state
     * @param {Object} action - Action
     * @param {string} action.payload - The ID of the product to remove
     */
    removeProduct: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.products.find(
        (item) => item.id === productId
      );

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          state.cartTotal -= existingProduct.discountedPrice;
        } else {
          state.products = state.products.filter(
            (item) => item.id !== productId
          );
          state.cartTotal -= existingProduct.discountedPrice;
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addProduct, removeProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
