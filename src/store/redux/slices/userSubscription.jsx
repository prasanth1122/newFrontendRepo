import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSubscription } from "../../../../Api/Api.js"; // Adjust the import path

// Thunk to fetch user subscription
export const fetchUserSubscription = createAsyncThunk(
  "subscription/fetchUserSubscription",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getUserSubscription(userId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch subscription data"
      );
    }
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscription: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(fetchUserSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subscriptionSlice.reducer;
