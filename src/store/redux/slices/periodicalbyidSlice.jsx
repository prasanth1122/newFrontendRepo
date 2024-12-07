import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPeriodicalById } from "../../../../Api/Api.js"; // Import your API function

// Async thunk to fetch periodical by ID
export const fetchPeriodicalById = createAsyncThunk(
  "periodical/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getPeriodicalById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create slice
const periodicalidSlice = createSlice({
  name: "periodicalid",
  initialState: {
    periodical: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearPeriodicalState: (state) => {
      state.periodical = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriodicalById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeriodicalById.fulfilled, (state, action) => {
        state.loading = false;
        state.periodical = action.payload;
      })
      .addCase(fetchPeriodicalById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { clearPeriodicalState } = periodicalidSlice.actions;
export default periodicalidSlice.reducer;
