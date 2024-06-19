import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/API";
import { login, relogin } from "../auth/authSlice";
import { deleteProject } from "../projects/projectSlice";

export type TBug = {
  bug_id: number;
  project_id: number;
  account_id: number;
  name: string;
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
  createBugLoading: boolean;
  updateBugLoading: boolean;
  deleteBugLoading: boolean;
  bugs: TBug[] | null;
  createBugSuccess: boolean;
  updateBugSuccess: boolean;
  deleteBugSuccess: boolean;
  createBugErrors: TCreateBugError | null;
  updateBugErrors: TUpdateBugError | null;
  deleteBugErrors: TDeleteBugError | null;
};

const initialState: TInitialState = {
  createBugLoading: false,
  updateBugLoading: false,
  deleteBugLoading: false,
  bugs: null,
  createBugSuccess: false,
  updateBugSuccess: false,
  deleteBugSuccess: false,
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
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post("/api/v1/bugs/create", bugInfo);
      return response.data;
    } catch (err: any) {
      if (!err.response.data.errors) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err.response.data.errors);
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
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put("/api/v1/bugs/update", bugInfo);
      return response.data;
    } catch (err: any) {
      if (!err.response.data.errors) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteBug = createAsyncThunk(
  "bugs/delete",
  async (bugInfo: { bug_id: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/api/v1/bugs/delete", {
        data: bugInfo,
      });
      return response.data;
    } catch (err: any) {
      if (!err.response.data.errors) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err.response.data.errors);
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
      state.createBugLoading = true;
      state.createBugSuccess = false;
      state.createBugErrors = null;
    });
    builder.addCase(
      createBug.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.createBugLoading = false;
        state.bugs = action.payload.bugs;
        state.createBugSuccess = true;
        state.createBugErrors = null;
      },
    );
    builder.addCase(createBug.rejected, (state, action: any) => {
      state.createBugLoading = false;
      state.createBugSuccess = false;
      state.createBugErrors = action.payload;
    });
    // Update
    builder.addCase(updateBug.pending, (state) => {
      state.updateBugLoading = true;
      state.updateBugSuccess = false;
      state.updateBugErrors = null;
    });
    builder.addCase(
      updateBug.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.updateBugLoading = false;
        state.bugs = action.payload.bugs;
        state.updateBugSuccess = true;
        state.updateBugErrors = null;
      },
    );
    builder.addCase(updateBug.rejected, (state, action: any) => {
      state.updateBugLoading = false;
      state.updateBugSuccess = false;
      state.updateBugErrors = action.payload;
    });
    // delete
    builder.addCase(deleteBug.pending, (state) => {
      state.deleteBugLoading = true;
      state.deleteBugSuccess = false;
      state.deleteBugErrors = null;
    });
    builder.addCase(
      deleteBug.fulfilled,
      (state, action: PayloadAction<{ bugs: TBug[] }>) => {
        state.deleteBugLoading = false;
        state.bugs = action.payload.bugs;
        state.deleteBugSuccess = true;
        state.deleteBugErrors = null;
      },
    );
    builder.addCase(deleteBug.rejected, (state, action: any) => {
      state.deleteBugLoading = false;
      state.deleteBugSuccess = false;
      state.deleteBugErrors = action.payload;
    });
  },
});

export default bugSlice.reducer;
