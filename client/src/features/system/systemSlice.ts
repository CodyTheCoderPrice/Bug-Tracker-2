import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  isDarkModeOn: boolean;
  hasTransition: boolean; // Used to prevent transition when turing darkmode on/off
  isNavbarExpanded: boolean;
  isSearchBarOpen: boolean;
  homeDueSoonPage: number;
  homeOverduePage: number;
};

const initialState: TInitialState = {
  isDarkModeOn: false,
  hasTransition: true,
  isNavbarExpanded: true,
  isSearchBarOpen: false,
  homeDueSoonPage: 1,
  homeOverduePage: 1,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkModeOn = !state.isDarkModeOn;
    },
    setHasTransition: (state, action: PayloadAction<boolean>) => {
      state.hasTransition = action.payload;
    },
    toggleNavbarExpanded: (state) => {
      state.isNavbarExpanded = !state.isNavbarExpanded;
    },
    toggleSearchBar: (state) => {
      state.isSearchBarOpen = !state.isSearchBarOpen;
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
  setHasTransition,
  toggleNavbarExpanded,
  toggleSearchBar,
  setHomeDueSoonPage,
  setHomeOverduePage,
} = systemSlice.actions;
