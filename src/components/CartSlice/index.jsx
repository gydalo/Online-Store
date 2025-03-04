import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  products: savedCart,
  cartTotal: savedCart.reduce(
    (total, item) => total + item.quantity * item.discountedPrice,
    0
  ),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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

    resetCart: (state) => {
      state.products = [];
      state.cartTotal = 0;
      localStorage.removeItem("cart");
    },

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
