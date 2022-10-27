import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApifetchProductById } from "../../api/api";

export const fetchProduct = createAsyncThunk( "product/fetchProduct", async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const product = await ApifetchProductById(id);
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    isLoading: false,
    error: "",
  },
  extraReducers(builder){
    builder.addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.product = [];
      state.error = action.payload;
    });
  }
});

export default productSlice.reducer;
