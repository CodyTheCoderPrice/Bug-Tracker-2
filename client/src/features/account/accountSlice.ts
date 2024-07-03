import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/API";
import { login, relogin, reset } from "../auth/authSlice";

type TAccount = {
  account_id: number;
  first_name: string;
  last_name: string;
  email: string;
  create_time: Date;
  update_time: Date;
};

type TUpdateNameError = {
  first_name: string | undefined;
  last_name: string | undefined;
  server: string | undefined;
};

type TUpdateEmailError = {
  email: string | undefined;
  pwd: string | undefined;
  server: string | undefined;
};

type TUpdatePasswordError = {
  pwd: string | undefined;
  newPwd: string | undefined;
  confirmPwd: string | undefined;
  server: string | undefined;
};

type TDeleteAccountError = {
  pwd: string | undefined;
  server: string | undefined;
};

type TInitialState = {
  isUpdateNameLoading: boolean;
  isUpdateEmailLoading: boolean;
  isUpdatePasswordLoading: boolean;
  isDeleteAccountLoading: boolean;
  account: TAccount | null;
  hasUpdateNameSucceeded: boolean;
  hasUpdateEmailSucceeded: boolean;
  hasUpdatePasswordSucceeded: boolean;
  hasDeleteAccountSucceeded: boolean;
  updateNameErrors: TUpdateNameError | null;
  updateEmailErrors: TUpdateEmailError | null;
  updatePasswordErrors: TUpdatePasswordError | null;
  deleteAccountErrors: TDeleteAccountError | null;
};

const initialState: TInitialState = {
  isUpdateNameLoading: false,
  isUpdateEmailLoading: false,
  isUpdatePasswordLoading: false,
  isDeleteAccountLoading: false,
  account: null,
  hasUpdateNameSucceeded: false,
  hasUpdateEmailSucceeded: false,
  hasUpdatePasswordSucceeded: false,
  hasDeleteAccountSucceeded: false,
  updateNameErrors: null,
  updateEmailErrors: null,
  updatePasswordErrors: null,
  deleteAccountErrors: null,
};

export const updateName = createAsyncThunk(
  "account/update-name",
  async (
    nameInfo: { first_name: string; last_name: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(
        "/api/v1/accounts/update-name",
        nameInfo,
      );
      return response.data;
    } catch (err: any) {
      if (!err.response.data.errors) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const updateEmail = createAsyncThunk(
  "account/update-email",
  async (emailInfo: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/api/v1/accounts/update-email",
        emailInfo,
      );
      return response.data;
    } catch (err: any) {
      if (!err.response.data.errors) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "account/update-password",
  async (
    pwdInfo: { pwd: string; newPwd: string; confirmPwd: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(
        "/api/v1/accounts/update-password",
        pwdInfo,
      );
      return response.data;
    } catch (err: any) {
      if (!err.response.data.errors) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err.response.data.errors);
    }
  },
);

export const deleteAccount = createAsyncThunk(
  "account/delete",
  async (deleteInfo: { pwd: string }, { dispatch, rejectWithValue }) => {
    let accountDeleted = false;
    try {
      await axiosInstance.delete("/api/v1/accounts/delete", {
        data: deleteInfo,
      });
      accountDeleted = true;
      console.log("Account deleted");
      await axiosInstance.delete("/api/v1/auth/logout");
    } catch (err: any) {
      if (!err.response.data.errors) {
        return rejectWithValue(null);
      }
      return rejectWithValue(err.response.data.errors);
    }

    if (accountDeleted) {
      dispatch(reset());
    }
  },
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccountErrors: (state) => {
      state.updateNameErrors = null;
      state.hasUpdateNameSucceeded = false;
      state.updateEmailErrors = null;
      state.hasUpdateEmailSucceeded = false;
      state.updatePasswordErrors = null;
      state.hasUpdatePasswordSucceeded = false;
      state.deleteAccountErrors = null;
      state.hasDeleteAccountSucceeded = false;
    },
    setAccountDeletedToFalse: (state) => {
      state.hasDeleteAccountSucceeded = false;
    },
  },
  extraReducers: (builder) => {
    // Login / Relogin
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ account: TAccount }>) => {
        state.account = action.payload.account;
      },
    );
    builder.addCase(
      relogin.fulfilled,
      (state, action: PayloadAction<{ account: TAccount }>) => {
        state.account = action.payload.account;
      },
    );
    // Update name
    builder.addCase(updateName.pending, (state) => {
      state.isUpdateNameLoading = true;
      state.hasUpdateNameSucceeded = false;
    });
    builder.addCase(
      updateName.fulfilled,
      (state, action: PayloadAction<{ account: TAccount }>) => {
        state.isUpdateNameLoading = false;
        state.account = action.payload.account;
        state.hasUpdateNameSucceeded = true;
        state.updateNameErrors = null;
      },
    );
    builder.addCase(updateName.rejected, (state, action: any) => {
      state.isUpdateNameLoading = false;
      state.hasUpdateNameSucceeded = false;
      state.updateNameErrors = action.payload;
    });
    // Update email
    builder.addCase(updateEmail.pending, (state) => {
      state.isUpdateEmailLoading = true;
      state.hasUpdateEmailSucceeded = false;
    });
    builder.addCase(
      updateEmail.fulfilled,
      (state, action: PayloadAction<{ account: TAccount }>) => {
        state.isUpdateEmailLoading = false;
        state.account = action.payload.account;
        state.hasUpdateEmailSucceeded = true;
        state.updateEmailErrors = null;
      },
    );
    builder.addCase(updateEmail.rejected, (state, action: any) => {
      state.isUpdateEmailLoading = false;
      state.hasUpdateEmailSucceeded = false;
      state.updateEmailErrors = action.payload;
    });
    // Update password
    builder.addCase(updatePassword.pending, (state) => {
      state.isUpdatePasswordLoading = true;
      state.hasUpdatePasswordSucceeded = false;
    });
    builder.addCase(
      updatePassword.fulfilled,
      (state, action: PayloadAction<{ account: TAccount }>) => {
        state.isUpdatePasswordLoading = false;
        state.account = action.payload.account;
        state.hasUpdatePasswordSucceeded = true;
        state.updatePasswordErrors = null;
      },
    );
    builder.addCase(updatePassword.rejected, (state, action: any) => {
      state.isUpdatePasswordLoading = false;
      state.hasUpdatePasswordSucceeded = false;
      state.updatePasswordErrors = action.payload;
    });
    // Delete account
    builder.addCase(deleteAccount.pending, (state) => {
      state.isDeleteAccountLoading = true;
      state.hasDeleteAccountSucceeded = false;
    });
    builder.addCase(deleteAccount.fulfilled, (state) => {
      state.isDeleteAccountLoading = false;
      state.account = null;
      state.hasDeleteAccountSucceeded = true;
      state.deleteAccountErrors = null;
    });
    builder.addCase(deleteAccount.rejected, (state, action: any) => {
      state.isDeleteAccountLoading = false;
      state.hasDeleteAccountSucceeded = false;
      state.deleteAccountErrors = action.payload;
    });
  },
});

export default accountSlice.reducer;
export const { clearAccountErrors, setAccountDeletedToFalse } =
  accountSlice.actions;
