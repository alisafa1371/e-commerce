import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: [],
  },

  reducers: {
    addItem(state, action) {
      const item = state.cartItems.find(
        (el) => el.product.id === action.payload.id
      );
      if (item) item.quantity++;
      else {
        state.cartItems.push({
          product: action.payload.product,
          quantity: 1,
        });
      }
    },
    removeItem(state, action) {
      const item = state.cartItems.find(
        (el) => el.product.id === action.payload.id
      );
      if (item.quantity === 1) {
        state.cartItems.filter((el) => el.product.id !== action.payload.id);
      } else {
        item.quantity--;
      }
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
