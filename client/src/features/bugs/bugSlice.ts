import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/API";
import { login, logout, relogin } from "../auth/authSlice";
import { deleteProject } from "../projects/projectSlice";

export type TBug = {
  bug_id: number;
  project_id: number;
  account_id: number;
  name: string;
  project: string;
  description: string;
  priority_id: number;
  priority_name: string;
  status_id: number;
  status_name: string;
  create_time: string;
  due_date: string | null;
  complete_date: string | null;
  update_time: string;
};

type TCreateBugError = {
  project_id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  priority_id: string | undefined;
  status_id: string | undefined;
  due_date: string | undefined;
  complete_date: string | undefined;
  server: string | undefined;
};

type TUpdateBugError = {
  bug_id: string | undefined;
  project_id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  priority_id: string | undefined;
  status_id: string | undefined;
  due_date: string | undefined;
  complete_date: string | undefined;
  server: string | undefined;
};

type TDeleteBugError = {
  bug_id: string | undefined;
  server: string | undefined;
};

type TInitialState = {
  isCreateBugLoading: boolean;
  isUpdateBugLoading: boolean;
  isDeleteBugLoading: boolean;
  bugs: TBug[] | null;
  hasCreateBugSucceeded: boolean;
  hasUpdateBugSucceeded: boolean;
  hasDeleteBugSucceeded: boolean;
  createBugErrors: TCreateBugError | null;
  updateBugErrors: TUpdateBugError | null;
  deleteBugErrors: TDeleteBugError | null;
};

const initialState: TInitialState = {
  isCreateBugLoading: false,
  isUpdateBugLoading: false,
  isDeleteBugLoading: false,
  bugs: null,
  hasCreateBugSucceeded: false,
  hasUpdateBugSucceeded: false,
  hasDeleteBugSucceeded: false,
  createBugErrors: null,
  updateBugErrors: null,
  deleteBugErrors: null,
};

export const createBug = createAsyncThunk(
  "bugs/create",
  async (
    bugInfo: {
      project_id: number;
      name: string;
      description: string;
      priority_id: number;
      status_id: number;
      due_date: string | null;
      complete_date: string | null;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post("/api/v1/bugs/create", bugInfo);
      return response.data;
    } catch (err: any) {
      if (err.hasRefreshFailed) {
        dispatch(logout());
      }
      return rejectWithValue(
        err.response.data.errors ? err.response.data.errors : null,
      );
    }
  },
);

export const updateBug = createAsyncThunk(
  "bugs/update",
  async (
    bugInfo: {
      bug_id: number;
      project_id: number;
      name: string;
      description: string;
      priority_id: number;
      status_id: number;
      due_date: string | null;
      complete_date: string | null;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put("/api/v1/bugs/update", bugInfo);
      return response.data;
    } catch (err: any) {
      if (err.hasRefreshFailed) {
        dispatch(logout());
      }
      return rejectWithValue(
        err.response.data.errors ? err.response.data.errors : null,
      );
    }
  },
);

export const deleteBug = createAsyncThunk(
  "bugs/delete",
  async (bugInfo: { bug_id: number }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/api/v1/bugs/delete", {
        data: bugInfo,
      });
      return response.data;
    } catch (err: any) {
      if (err.hasRefreshFailed) {
        dispatch(logout());
      }
      return rejectWithValue(
        err.response.data.errors ? err.response.data.errors : null,
      );
    }
  },
);

const bugSlice = createSlice({
  name: "bugs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login / Relogin
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.bugs = action.payload.bugs;
      },
    );
    builder.addCase(
      relogin.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.bugs = action.payload.bugs;
      },
    );
    // delete project
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.bugs = action.payload.bugs;
      },
    );
    // Create
    builder.addCase(createBug.pending, (state) => {
      state.isCreateBugLoading = true;
      state.hasCreateBugSucceeded = false;
    });
    builder.addCase(
      createBug.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.isCreateBugLoading = false;
        state.bugs = action.payload.bugs;
        state.hasCreateBugSucceeded = true;
        state.createBugErrors = null;
      },
    );
    builder.addCase(createBug.rejected, (state, action: any) => {
      state.isCreateBugLoading = false;
      state.hasCreateBugSucceeded = false;
      state.createBugErrors = action.payload;
    });
    // Update
    builder.addCase(updateBug.pending, (state) => {
      state.isUpdateBugLoading = true;
      state.hasUpdateBugSucceeded = false;
    });
    builder.addCase(
      updateBug.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.isUpdateBugLoading = false;
        state.bugs = action.payload.bugs;
        state.hasUpdateBugSucceeded = true;
        state.updateBugErrors = null;
      },
    );
    builder.addCase(updateBug.rejected, (state, action: any) => {
      state.isUpdateBugLoading = false;
      state.hasUpdateBugSucceeded = false;
      state.updateBugErrors = action.payload;
    });
    // delete
    builder.addCase(deleteBug.pending, (state) => {
      state.isDeleteBugLoading = true;
      state.hasDeleteBugSucceeded = false;
    });
    builder.addCase(
      deleteBug.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.isDeleteBugLoading = false;
        state.bugs = action.payload.bugs;
        state.hasDeleteBugSucceeded = true;
        state.deleteBugErrors = null;
      },
    );
    builder.addCase(deleteBug.rejected, (state, action: any) => {
      state.isDeleteBugLoading = false;
      state.hasDeleteBugSucceeded = false;
      state.deleteBugErrors = action.payload;
    });
  },
});

export default bugSlice.reducer;
