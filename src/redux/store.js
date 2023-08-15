/*
File to initialize the store object.
*/

import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice';

const movieStore = configureStore({
    reducer: {
      movieState: movieReducer,
    },
  });

  export default movieStore;