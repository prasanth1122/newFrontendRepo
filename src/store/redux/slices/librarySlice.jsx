import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSavedArticles } from "../../../../Api/Api.js"; // Adjust the import path

// Async thunk to fetch saved articles
export const fetchSavedArticles = createAsyncThunk(
  "library/fetchSavedArticles",
  async (userId, thunkAPI) => {
    try {
      const articles = await getSavedArticles(userId);
      return articles;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const librarySlice = createSlice({
  name: "library",
  initialState: {
    savedArticles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.savedArticles = action.payload;
      })
      .addCase(fetchSavedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default librarySlice.reducer;
