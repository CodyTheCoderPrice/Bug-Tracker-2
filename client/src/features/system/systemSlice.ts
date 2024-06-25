import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  darkMode: boolean;
  navbarExpanded: boolean;
  searchBar: boolean;
  homeDueSoonRowsPerPage: 10 | 25;
  homeOverdueRowsPerPage: 10 | 25;
};

const initialState: TInitialState = {
  darkMode: false,
  navbarExpanded: true,
  searchBar: false,
  homeDueSoonRowsPerPage: 10,
  homeOverdueRowsPerPage: 10,
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
    setHomeDueSoonRowsPerPage: (state, action: PayloadAction<10 | 25>) => {
      state.homeDueSoonRowsPerPage = action.payload;
    },
    setHomeOverdueRowsPerPage: (state, action: PayloadAction<10 | 25>) => {
      state.homeOverdueRowsPerPage = action.payload;
    },
  },
});

export default systemSlice.reducer;
export const {
  toggleDarkMode,
  toggleNavbarExpanded,
  toggleSearchBar,
  setHomeDueSoonRowsPerPage,
  setHomeOverdueRowsPerPage,
} = systemSlice.actions;
