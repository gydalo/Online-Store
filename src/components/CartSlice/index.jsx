import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],  
  cartTotal: 0,  
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProduct = state.products.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...product, quantity: 1 }); 
      }

      state.cartTotal += product.discountedPrice;
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      const existingProduct = state.products.find((item) => item.id === productId);

      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          state.cartTotal -= existingProduct.discountedPrice;
        } else {
          state.products = state.products.filter((item) => item.id !== productId); 
          state.cartTotal -= existingProduct.discountedPrice;
        }
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
