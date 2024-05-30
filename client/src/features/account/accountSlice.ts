import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/services/api';
import { login, relogin, reset } from '../auth/authSlice';

type TAccount = {
	account_id: number;
	email: string;
	first_name: string;
	last_name: string;
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
	updateNameLoading: boolean;
	updateEmailLoading: boolean;
	updatePasswordLoading: boolean;
	deleteAccountLoading: boolean;
	account: TAccount | null;
	updateNameSuccess: boolean;
	updateEmailSuccess: boolean;
	updatePasswordSuccess: boolean;
	updateNameErrors: TUpdateNameError | null;
	updateEmailErrors: TUpdateEmailError | null;
	updatePasswordErrors: TUpdatePasswordError | null;
	deleteAccountErrors: TDeleteAccountError | null;
};

const initialState: TInitialState = {
	updateNameLoading: false,
	updateEmailLoading: false,
	updatePasswordLoading: false,
	deleteAccountLoading: false,
	account: null,
	updateNameSuccess: false,
	updateEmailSuccess: false,
	updatePasswordSuccess: false,
	updateNameErrors: null,
	updateEmailErrors: null,
	updatePasswordErrors: null,
	deleteAccountErrors: null,
};

export const updateName = createAsyncThunk(
	'account/update-name',
	async (
		nameInfo: { first_name: string; last_name: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				'/api/v1/accounts/update-name',
				nameInfo
			);
			return response.data;
		} catch (err: any) {
			if (!err.response.data.errors) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data.errors);
		}
	}
);

export const updateEmail = createAsyncThunk(
	'account/update-email',
	async (emailInfo: { email: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(
				'/api/v1/accounts/update-email',
				emailInfo
			);
			return response.data;
		} catch (err: any) {
			if (!err.response.data.errors) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data.errors);
		}
	}
);

export const updatePassword = createAsyncThunk(
	'account/update-password',
	async (
		pwdInfo: { pwd: string; newPwd: string; confirmPwd: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				'/api/v1/accounts/update-password',
				pwdInfo
			);
			return response.data;
		} catch (err: any) {
			if (!err.response.data.errors) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data.errors);
		}
	}
);

export const deleteAccount = createAsyncThunk(
	'account/delete',
	async (deleteInfo: { pwd: string }, { dispatch, rejectWithValue }) => {
		let accountDeleted = false;
		try {
			await axiosInstance.delete('/api/v1/accounts/delete', {
				data: deleteInfo,
			});
			accountDeleted = true;
			console.log('Account deleted');
			await axiosInstance.delete('/api/v1/auth/logout');
		} catch (err: any) {
			if (!err.response.data.errors) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data.errors);
		}

		if (accountDeleted) {
			dispatch(reset());
		}
	}
);

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login / Relogin
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.account = action.payload.account;
			}
		);
		builder.addCase(
			relogin.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.account = action.payload.account;
			}
		);
		// Update name
		builder.addCase(updateName.pending, (state) => {
			state.updateNameLoading = true;
			state.updateNameSuccess = false;
			state.updateNameErrors = null;
		});
		builder.addCase(
			updateName.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.updateNameLoading = false;
				state.account = action.payload.account;
				state.updateNameSuccess = true;
				state.updateNameErrors = null;
			}
		);
		builder.addCase(updateName.rejected, (state, action: any) => {
			state.updateNameLoading = false;
			state.updateNameSuccess = false;
			state.updateNameErrors = action.payload;
		});
		// Update email
		builder.addCase(updateEmail.pending, (state) => {
			state.updateEmailLoading = true;
			state.updateEmailSuccess = false;
			state.updateEmailErrors = null;
		});
		builder.addCase(
			updateEmail.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.updateEmailLoading = false;
				state.account = action.payload.account;
				state.updateEmailSuccess = true;
				state.updateEmailErrors = null;
			}
		);
		builder.addCase(updateEmail.rejected, (state, action: any) => {
			state.updateEmailLoading = false;
			state.updateEmailSuccess = false;
			state.updateEmailErrors = action.payload;
		});
		// Update password
		builder.addCase(updatePassword.pending, (state) => {
			state.updatePasswordLoading = true;
			state.updatePasswordSuccess = false;
			state.updatePasswordErrors = null;
		});
		builder.addCase(
			updatePassword.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.updatePasswordLoading = false;
				state.account = action.payload.account;
				state.updatePasswordSuccess = true;
				state.updatePasswordErrors = null;
			}
		);
		builder.addCase(updatePassword.rejected, (state, action: any) => {
			state.updatePasswordLoading = false;
			state.updatePasswordSuccess = false;
			state.updatePasswordErrors = action.payload;
		});
		// Delete account
		builder.addCase(deleteAccount.pending, (state) => {
			state.deleteAccountLoading = true;
			state.deleteAccountErrors = null;
		});
		builder.addCase(deleteAccount.fulfilled, (state) => {
			state.deleteAccountLoading = false;
			state.account = null;
			state.deleteAccountErrors = null;
		});
		builder.addCase(deleteAccount.rejected, (state, action: any) => {
			state.deleteAccountLoading = false;
			state.deleteAccountErrors = action.payload;
		});
	},
});

export default accountSlice.reducer;
