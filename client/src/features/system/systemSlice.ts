import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  darkMode: boolean;
  searchBar: boolean;
};

const initialState: TInitialState = {
  darkMode: false,
  searchBar: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleSearchBar: (state) => {
      state.searchBar = !state.searchBar;
    },
  },
});

export default systemSlice.reducer;
export const { toggleDarkMode, toggleSearchBar } = systemSlice.actions;
