// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Import the reducer from authSlice

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducer here
  }
});

export default store;
