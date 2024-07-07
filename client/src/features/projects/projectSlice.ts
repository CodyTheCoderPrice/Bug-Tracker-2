import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/API";
import { login, logout, relogin } from "../auth/authSlice";

type TProject = {
  project_id: number;
  account_id: number;
  name: string;
  description: string;
  create_time: Date;
  update_time: Date;
};

type TCreateProjectError = {
  name: string | undefined;
  description: string | undefined;
  server: string | undefined;
};

type TUpdateProjectError = {
  project_id: string | undefined;
  name: string | undefined;
  description: string | undefined;
  server: string | undefined;
};

type TDeleteProjectError = {
  project_id: string | undefined;
  server: string | undefined;
};

type TInitialState = {
  isCreateProjectLoading: boolean;
  isUpdateProjectLoading: boolean;
  isDeleteProjectLoading: boolean;
  projects: TProject[] | null;
  hasCreateProjectSucceeded: boolean;
  hasUpdateProjectSucceeded: boolean;
  hasDeleteProjectSucceeded: boolean;
  createProjectErrors: TCreateProjectError | null;
  updateProjectErrors: TUpdateProjectError | null;
  deleteProjectErrors: TDeleteProjectError | null;
};

const initialState: TInitialState = {
  isCreateProjectLoading: false,
  isUpdateProjectLoading: false,
  isDeleteProjectLoading: false,
  projects: null,
  hasCreateProjectSucceeded: false,
  hasUpdateProjectSucceeded: false,
  hasDeleteProjectSucceeded: false,
  createProjectErrors: null,
  updateProjectErrors: null,
  deleteProjectErrors: null,
};

export const createProject = createAsyncThunk(
  "projects/create",
  async (
    projectInfo: { name: string; description: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/projects/create",
        projectInfo,
      );
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

export const updateProject = createAsyncThunk(
  "projects/update",
  async (
    projectInfo: { project_id: number; name: string; description: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(
        "/api/v1/projects/update",
        projectInfo,
      );
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

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (
    projectInfo: { project_id: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.delete("/api/v1/projects/delete", {
        data: projectInfo,
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

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login / Relogin
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ projects: TProject[] }>) => {
        state.projects = action.payload.projects;
      },
    );
    builder.addCase(
      relogin.fulfilled,
      (state, action: PayloadAction<{ projects: TProject[] }>) => {
        state.projects = action.payload.projects;
      },
    );
    // Create
    builder.addCase(createProject.pending, (state) => {
      state.isCreateProjectLoading = true;
      state.hasCreateProjectSucceeded = false;
    });
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<{ projects: TProject[] }>) => {
        state.isCreateProjectLoading = false;
        state.projects = action.payload.projects;
        state.hasCreateProjectSucceeded = true;
        state.createProjectErrors = null;
      },
    );
    builder.addCase(createProject.rejected, (state, action: any) => {
      state.isCreateProjectLoading = false;
      state.hasCreateProjectSucceeded = false;
      state.createProjectErrors = action.payload;
    });
    // Update
    builder.addCase(updateProject.pending, (state) => {
      state.isUpdateProjectLoading = true;
      state.hasUpdateProjectSucceeded = false;
    });
    builder.addCase(
      updateProject.fulfilled,
      (state, action: PayloadAction<{ projects: TProject[] }>) => {
        state.isUpdateProjectLoading = false;
        state.projects = action.payload.projects;
        state.hasUpdateProjectSucceeded = true;
        state.updateProjectErrors = null;
      },
    );
    builder.addCase(updateProject.rejected, (state, action: any) => {
      state.isUpdateProjectLoading = false;
      state.hasUpdateProjectSucceeded = false;
      state.updateProjectErrors = action.payload;
    });
    // Delete
    builder.addCase(deleteProject.pending, (state) => {
      state.isDeleteProjectLoading = true;
      state.hasDeleteProjectSucceeded = false;
    });
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<{ projects: TProject[] }>) => {
        state.isDeleteProjectLoading = false;
        state.projects = action.payload.projects;
        state.hasDeleteProjectSucceeded = true;
        state.deleteProjectErrors = null;
      },
    );
    builder.addCase(deleteProject.rejected, (state, action: any) => {
      state.isDeleteProjectLoading = false;
      state.hasDeleteProjectSucceeded = false;
      state.deleteProjectErrors = action.payload;
    });
  },
});

export default projectSlice.reducer;
