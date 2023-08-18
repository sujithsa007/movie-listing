/*
This is the slice file, which will be used for managing the state. createSlice is part of the rjs-toolkit, which helps us to overcome
logical errors which can happen while using reducers, where actions are passed as string identifiers. Also this code has lesser boilerplate
as there is no need to clone the current state everytime while it has to be changed, the changes in state can directly be written
and rjs-toolkit will clone and handle it under the hood.
*/
import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movieGrid",
  initialState: {
    gridData: [],
    loading: true,
    currentPage: 1,
    pageTitle: "",
  },
  reducers: {
    updateData: (state, action) => {
      state.gridData = [...state.gridData, ...action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload;
    },
  },
});

export const { updateData, setLoading, setCurrentPage, setPageTitle } =
  movieSlice.actions;

export default movieSlice.reducer;
