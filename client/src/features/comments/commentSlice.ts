import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/API";
import { login, logout, relogin } from "../auth/authSlice";
import { deleteProject } from "../projects/projectSlice";
import { deleteBug } from "../bugs/bugSlice";

type TComment = {
  comment_id: number;
  bug_id: number;
  description: string;
  create_time: string;
  update_time: string;
};

type TCreateCommentError = {
  bug_id: string | undefined;
  description: string | undefined;
  server: string | undefined;
};

type TUpdateCommentError = {
  comment_id: string | undefined;
  bug_id: string | undefined;
  description: string | undefined;
  server: string | undefined;
};

type TDeleteCommentError = {
  comment_id: string | undefined;
  server: string | undefined;
};

type TInitialState = {
  isCreateCommentLoading: boolean;
  isUpdateCommentLoading: boolean;
  isDeleteCommentLoading: boolean;
  comments: TComment[] | null;
  hasCreateCommentSucceeded: boolean;
  hasUpdateCommentSucceeded: boolean;
  isDeleteCommentSucceeded: boolean;
  createCommentErrors: TCreateCommentError | null;
  updateCommentErrors: TUpdateCommentError | null;
  deleteCommentErrors: TDeleteCommentError | null;
};

const initialState: TInitialState = {
  isCreateCommentLoading: false,
  isUpdateCommentLoading: false,
  isDeleteCommentLoading: false,
  comments: null,
  hasCreateCommentSucceeded: false,
  hasUpdateCommentSucceeded: false,
  isDeleteCommentSucceeded: false,
  createCommentErrors: null,
  updateCommentErrors: null,
  deleteCommentErrors: null,
};

export const createComment = createAsyncThunk(
  "comments/create",
  async (
    commentInfo: {
      bug_id: number;
      description: string;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/comments/create",
        commentInfo,
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

export const updateComment = createAsyncThunk(
  "comments/update",
  async (
    commentInfo: {
      comment_id: number;
      bug_id: number;
      description: string;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(
        "/api/v1/comments/update",
        commentInfo,
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

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (
    commentInfo: { comment_id: number },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.delete("/api/v1/comments/delete", {
        data: commentInfo,
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

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login / Relogin
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ comments: TComment[] }>) => {
        state.comments = action.payload.comments;
      },
    );
    builder.addCase(
      relogin.fulfilled,
      (state, action: PayloadAction<{ comments: TComment[] }>) => {
        state.comments = action.payload.comments;
      },
    );
    // delete project / bug
    builder.addCase(
      deleteProject.fulfilled,
      (state, action: PayloadAction<{ comments: TComment[] }>) => {
        state.comments = action.payload.comments;
      },
    );
    builder.addCase(
      deleteBug.fulfilled,
      (state, action: PayloadAction<{ comments: TComment[] }>) => {
        state.comments = action.payload.comments;
      },
    );
    // Create
    builder.addCase(createComment.pending, (state) => {
      state.isCreateCommentLoading = true;
      state.hasCreateCommentSucceeded = false;
    });
    builder.addCase(
      createComment.fulfilled,
      (state, action: PayloadAction<{ comments: TComment[] }>) => {
        state.isCreateCommentLoading = false;
        state.comments = action.payload.comments;
        state.hasCreateCommentSucceeded = true;
        state.createCommentErrors = null;
      },
    );
    builder.addCase(createComment.rejected, (state, action: any) => {
      state.isCreateCommentLoading = false;
      state.hasCreateCommentSucceeded = false;
      state.createCommentErrors = action.payload;
    });
    // update
    builder.addCase(updateComment.pending, (state) => {
      state.isUpdateCommentLoading = true;
      state.hasUpdateCommentSucceeded = false;
    });
    builder.addCase(
      updateComment.fulfilled,
      (state, action: PayloadAction<{ comments: TComment[] }>) => {
        state.isUpdateCommentLoading = false;
        state.comments = action.payload.comments;
        state.hasUpdateCommentSucceeded = true;
        state.updateCommentErrors = null;
      },
    );
    builder.addCase(updateComment.rejected, (state, action: any) => {
      state.isUpdateCommentLoading = false;
      state.hasUpdateCommentSucceeded = false;
      state.updateCommentErrors = action.payload;
    });
    // delete
    builder.addCase(deleteComment.pending, (state) => {
      state.isDeleteCommentLoading = true;
      state.isDeleteCommentSucceeded = false;
    });
    builder.addCase(
      deleteComment.fulfilled,
      (state, action: PayloadAction<{ comments: TComment[] }>) => {
        state.isDeleteCommentLoading = false;
        state.comments = action.payload.comments;
        state.isDeleteCommentSucceeded = true;
        state.deleteCommentErrors = null;
      },
    );
    builder.addCase(deleteComment.rejected, (state, action: any) => {
      state.isDeleteCommentLoading = false;
      state.isDeleteCommentSucceeded = false;
      state.deleteCommentErrors = action.payload;
    });
  },
});

export default commentSlice.reducer;
