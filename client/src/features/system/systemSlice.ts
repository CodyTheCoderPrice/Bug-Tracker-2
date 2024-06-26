import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  darkMode: boolean;
  navbarExpanded: boolean;
  searchBar: boolean;
  homeDueSoonPage: number;
  homeOverduePage: number;
};

const initialState: TInitialState = {
  darkMode: false,
  navbarExpanded: true,
  searchBar: false,
  homeDueSoonPage: 1,
  homeOverduePage: 1,
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
    setHomeDueSoonPage: (state, action: PayloadAction<number>) => {
      state.homeDueSoonPage = action.payload;
    },
    setHomeOverduePage: (state, action: PayloadAction<number>) => {
      state.homeOverduePage = action.payload;
    },
  },
});

export default systemSlice.reducer;
export const {
  toggleDarkMode,
  toggleNavbarExpanded,
  toggleSearchBar,
  setHomeDueSoonPage,
  setHomeOverduePage,
} = systemSlice.actions;
