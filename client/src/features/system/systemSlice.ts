import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  darkMode: boolean;
  navbarExpanded: boolean;
  searchBar: boolean;
};

const initialState: TInitialState = {
  darkMode: false,
  navbarExpanded: true,
  searchBar: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleNavbarExpanded: (state) => {
      state.navbarExpanded = !state.navbarExpanded;
    },
    toggleSearchBar: (state) => {
      state.searchBar = !state.searchBar;
    },
  },
});

export default systemSlice.reducer;
export const { toggleDarkMode, toggleNavbarExpanded, toggleSearchBar } =
  systemSlice.actions;
