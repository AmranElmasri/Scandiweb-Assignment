import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApifetchProductsByCategory } from "../../api/api";

export const fetchProducts = createAsyncThunk( "products/fetchProducts", async (category, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const products = await ApifetchProductsByCategory(category);
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error: "",
  },
  extraReducers(builder){
    builder.addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    });
  }
});

export default productsSlice.reducer;
