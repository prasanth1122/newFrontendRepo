import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPeriodicals } from "../../../../Api/Api.js"; // Import the API function

// Create an async thunk for fetching all periodicals
export const fetchPeriodicals = createAsyncThunk(
  "periodicals/fetchAll",
  async () => {
    const response = await getAllPeriodicals();
    return response; // The result of the async function will be used to update the state
  }
);

// Define the initial state for periodicals
const initialState = {
  periodicals: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create the periodicals slice
const periodicalsSlice = createSlice({
  name: "periodicals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriodicals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPeriodicals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.periodicals = action.payload; // Save the fetched periodicals
      })
      .addCase(fetchPeriodicals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store any error message
      });
  },
});

// Export any reducers or actions if needed, though we don't have any custom reducers here
export default periodicalsSlice.reducer;
