import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { deleteProject } from "../projects/projectSlice";
import { deleteBug } from "../bugs/bugSlice";

export type THomeFilter = 0 | 1 | 2;

type TInitialState = {
  isDarkModeOn: boolean;
  hasTransition: boolean; // Used to prevent transition when turing darkmode on/off
  isNavbarExpanded: boolean;
  isSearchBarModalOpen: boolean;
  homeDueSoonFilterOption: THomeFilter;
  homeOverdueFilterOption: THomeFilter;
  homeDueSoonPage: number;
  homeOverduePage: number;
};

const initialState: TInitialState = {
  isDarkModeOn: false,
  hasTransition: true,
  isNavbarExpanded: true,
  isSearchBarModalOpen: false,
  homeDueSoonFilterOption: 0,
  homeOverdueFilterOption: 0,
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
    toggleSearchBarModal: (state) => {
      state.isSearchBarModalOpen = !state.isSearchBarModalOpen;
    },
    setHomeDueSoonFilterOption: (state, action: PayloadAction<THomeFilter>) => {
      state.homeDueSoonFilterOption = action.payload;
      state.homeDueSoonPage = 1;
    },
    setHomeOverdueFilterOption: (state, action: PayloadAction<THomeFilter>) => {
      state.homeOverdueFilterOption = action.payload;
      state.homeOverduePage = 1;
    },
    setHomeDueSoonPage: (state, action: PayloadAction<number>) => {
      state.homeDueSoonPage = action.payload;
    },
    setHomeOverduePage: (state, action: PayloadAction<number>) => {
      state.homeOverduePage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Delete Project
    builder.addCase(deleteProject.fulfilled, (state) => {
      state.homeDueSoonPage = 1;
      state.homeOverduePage = 1;
    });
    // Delete Bug
    builder.addCase(deleteBug.fulfilled, (state) => {
      state.homeDueSoonPage = 1;
      state.homeOverduePage = 1;
    });
  },
});

export default systemSlice.reducer;
export const {
  toggleDarkMode,
  setHasTransition,
  toggleNavbarExpanded,
  toggleSearchBarModal,
  setHomeDueSoonFilterOption,
  setHomeOverdueFilterOption,
  setHomeDueSoonPage,
  setHomeOverduePage,
} = systemSlice.actions;
