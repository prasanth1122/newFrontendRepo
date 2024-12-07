// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice.jsx"; // Import the authSlice reducer
import articleReducer from "../redux/slices/articleSlice.jsx";
import libraryReducer from "../redux/slices/librarySlice.jsx";
import periodicalsReducer from "../redux/slices/periodicalSlice.jsx";
import periodicalidReducer from "../redux/slices/periodicalbyidSlice.jsx";
import profileReducer from "../redux/slices/profileSlice.jsx";
import subscriptionReducer from "../redux/slices/userSubscription.jsx";
const store = configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
    library: libraryReducer,
    periodicals: periodicalsReducer,
    periodicalid: periodicalidReducer,
    profile: profileReducer,
    subscriptionData: subscriptionReducer,
  },
});

export default store;
