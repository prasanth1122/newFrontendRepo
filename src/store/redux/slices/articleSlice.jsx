// store/slices/articleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticleById } from "../../../../Api/Api.js"; // Import your API function

// Thunk to fetch article by ID
export const fetchArticleById = createAsyncThunk(
  "article/fetchArticleById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getArticleById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch article");
    }
  }
);

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;
