// src/store/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../../../../Api/Api.js";

const initialState = {
  isLoading: false,
  isError: false,
  userData: null, // Store user data
  errorMessage: "", // Store error message
};

// Async action for login
export const userLogin = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials.email, credentials.password);
      return response; // Return the response payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async action for signup
export const userSignup = createAsyncThunk(
  "auth/signup",
  async (signupData, thunkAPI) => {
    try {
      const response = await signup(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.role,
        signupData.userType,
        signupData.institution
      );
      return response; // Return the response payload
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        //state.isError = false;
        state.userData = action.payload; // Store user data
        //localStorage.setItem("token", action.payload.token);

        //state.errorMessage = "";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
        state.errorMessage = action.payload?.message || "Login failed";
      })
      .addCase(userSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userData = action.payload; // Store user data
        state.errorMessage = "";
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
        state.errorMessage = action.payload?.message || "Signup failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
