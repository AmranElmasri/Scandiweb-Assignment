import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  category: localStorage.getItem("category") ? JSON.parse(localStorage.getItem("category")) : "all",
  currency: localStorage.getItem("currency")? JSON.parse(localStorage.getItem("currency")): "usd",
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  currencySymbol: localStorage.getItem("currencySymbol") ? JSON.parse(localStorage.getItem("currencySymbol")) : "$",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      localStorage.setItem("category", JSON.stringify(action.payload));
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
      localStorage.setItem("currency", JSON.stringify(action.payload));
    },
    setCartItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setIncreaseAmount: (state, action) => {
      state.cartItems = state.cartItems.map((item) => item.id === action.payload ? 
      {...item, amount: item.amount + 1} : item);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setDecreaseAmount: (state, action) => {
      state.cartItems = state.cartItems.map((item) => item.id === action.payload ? 
      {...item, amount: item.amount - 1} : item);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setCurrencySymbol: (state, action) => {
      state.currencySymbol = action.payload;
      localStorage.setItem("currencySymbol", JSON.stringify(action.payload));
    },
    setRemoveFromCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { getData, setCategory, setCurrency, setCartItems, setIncreaseAmount, setDecreaseAmount, setCurrencySymbol, setRemoveFromCartItem } = dataSlice.actions;

export default dataSlice.reducer;
