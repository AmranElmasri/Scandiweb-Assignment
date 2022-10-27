import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiFetchAllCategories } from "../../api/api";

export const fetchCategories = createAsyncThunk( "categories/fetchCategories", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const cat = await ApiFetchAllCategories();
      return cat;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    activeCategory: "all",
    isLoading: false,
    error: "",
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = [...state.categories, ...action.payload.data.categories];
      state.error = '';
    });

    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = [];
      state.error = action.payload;
    });
  },
});

export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
