import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/services/api';
import { login } from '../auth/authSlice';

type TAccount = {
	account_id: number;
	email: string;
	first_name: string;
	last_name: string;
	create_time: Date;
	update_time: Date;
};

type TUpdateAccountError = {
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
	first_name: string | undefined;
	last_name: string | undefined;
};

type TInitialState = {
	loading: boolean;
	account: TAccount | null;
	updateEmailSuccess: boolean;
	updatePasswordSuccess: boolean;
	errors: TUpdateAccountError | null;
};

const initialState: TInitialState = {
	loading: false,
	account: null,
	updateEmailSuccess: false,
	updatePasswordSuccess: false,
	errors: null,
};

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

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.account = action.payload.account;
			}
		);
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
	},
});

export default accountSlice.reducer;
