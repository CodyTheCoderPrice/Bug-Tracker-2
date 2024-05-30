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

type TUpdateAccountError = {
	updateName:
		| {
				first_name: string | undefined;
				last_name: string | undefined;
				server: string | undefined;
		  }
		| undefined;
	updateEmail:
		| {
				email: string | undefined;
				pwd: string | undefined;
				server: string | undefined;
		  }
		| undefined;
	updatePassword:
		| {
				pwd: string | undefined;
				newPwd: string | undefined;
				confirmPwd: string | undefined;
				server: string | undefined;
		  }
		| undefined;
	deleteAccount:
		| {
				pwd: string | undefined;
				server: string | undefined;
		  }
		| undefined;
};

type TInitialState = {
	loading: boolean;
	account: TAccount | null;
	updateNameSuccess: boolean;
	updateEmailSuccess: boolean;
	updatePasswordSuccess: boolean;
	errors: TUpdateAccountError | null;
};

const initialState: TInitialState = {
	loading: false,
	account: null,
	updateNameSuccess: false,
	updateEmailSuccess: false,
	updatePasswordSuccess: false,
	errors: null,
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
			return rejectWithValue({ updateName: err.response.data.errors });
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
			return rejectWithValue({ updateEmail: err.response.data.errors });
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
			return rejectWithValue({ updatePassword: err.response.data.errors });
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
			return rejectWithValue({ deleteAccount: err.response.data.errors });
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
			state.loading = true;
			state.updateNameSuccess = false;
			state.errors = null;
		});
		builder.addCase(
			updateName.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.loading = false;
				state.account = action.payload.account;
				state.updateNameSuccess = true;
				state.errors = null;
			}
		);
		builder.addCase(updateName.rejected, (state, action: any) => {
			state.loading = false;
			state.updateNameSuccess = false;
			state.errors = action.payload;
		});
		// Update email
		builder.addCase(updateEmail.pending, (state) => {
			state.loading = true;
			state.updateEmailSuccess = false;
			state.errors = null;
		});
		builder.addCase(
			updateEmail.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.loading = false;
				state.account = action.payload.account;
				state.updateEmailSuccess = true;
				state.errors = null;
			}
		);
		builder.addCase(updateEmail.rejected, (state, action: any) => {
			state.loading = false;
			state.updateEmailSuccess = false;
			state.errors = action.payload;
		});
		// Update password
		builder.addCase(updatePassword.pending, (state) => {
			state.loading = true;
			state.updatePasswordSuccess = false;
			state.errors = null;
		});
		builder.addCase(
			updatePassword.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.loading = false;
				state.account = action.payload.account;
				state.updatePasswordSuccess = true;
				state.errors = null;
			}
		);
		builder.addCase(updatePassword.rejected, (state, action: any) => {
			state.loading = false;
			state.updatePasswordSuccess = false;
			state.errors = action.payload;
		});
		// Delete account
		builder.addCase(deleteAccount.pending, (state) => {
			state.loading = true;
			state.errors = null;
		});
		builder.addCase(deleteAccount.fulfilled, (state) => {
			state.loading = false;
			state.account = null;
			state.errors = null;
		});
		builder.addCase(deleteAccount.rejected, (state, action: any) => {
			state.loading = false;
			state.errors = action.payload;
		});
	},
});

export default accountSlice.reducer;
