import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TInitialState = {
  isDarkModeOn: boolean;
  isNavbarExpanded: boolean;
  isSearchBarOpen: boolean;
  homeDueSoonPage: number;
  homeOverduePage: number;
};

const initialState: TInitialState = {
  isDarkModeOn: false,
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
  toggleNavbarExpanded,
  toggleSearchBar,
  setHomeDueSoonPage,
  setHomeOverduePage,
} = systemSlice.actions;
