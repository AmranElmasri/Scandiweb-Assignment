import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./Slices/categoriesSlice";
import dataReducer from "./Slices/dataSlice";
import productsReducer from "./Slices/productsSlice";
import productReducer from "./Slices/productSlice";


const store = configureStore({
  reducer: {
    data: dataReducer,
    categories: categoriesReducer,
    products: productsReducer,
    product: productReducer,
  },
});

export default store;
