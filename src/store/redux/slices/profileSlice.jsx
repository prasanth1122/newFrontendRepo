import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserById } from "../../../../Api/Api.js"; // Adjust the import path as necessary

export const fetchUserById = createAsyncThunk(
  "profile/fetchUserById",
  async ({ rejectWithValue }) => {
    try {
      const user = await getUserById(localStorage.getItem("user")); // Call the function from api.js
      return user; // Return the user object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
