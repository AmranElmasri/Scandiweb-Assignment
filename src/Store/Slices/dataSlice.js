import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: localStorage.getItem("currency")? JSON.parse(localStorage.getItem("currency")): "usd",
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  currencySymbol: localStorage.getItem("currencySymbol") ? JSON.parse(localStorage.getItem("currencySymbol")) : "$",
  switcherOpen: false,
  cartOpen: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
      localStorage.setItem("currency", JSON.stringify(action.payload));
    },
    setCartItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setIncreaseAmount: (state, action) => {
      state.cartItems = state.cartItems.map((item) => item.key === action.payload ? 
      {...item, amount: item.amount + 1} : item);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setDecreaseAmount: (state, action) => {
      state.cartItems = state.cartItems.map((item) => item.key === action.payload ? 
      {...item, amount: item.amount - 1} : item);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setCurrencySymbol: (state, action) => {
      state.currencySymbol = action.payload;
      localStorage.setItem("currencySymbol", JSON.stringify(action.payload));
    },
    setRemoveFromCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.key !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    setSwitcherOpen: (state, action) => {
      state.switcherOpen = action.payload;
    },
    setCartOpen: (state, action) => {
      state.cartOpen = action.payload;
    }
  },
});

export const { setCurrency, setCartItems, setIncreaseAmount, setDecreaseAmount, setCurrencySymbol, setRemoveFromCartItem, setSwitcherOpen, setCartOpen } = dataSlice.actions;

export default dataSlice.reducer;
