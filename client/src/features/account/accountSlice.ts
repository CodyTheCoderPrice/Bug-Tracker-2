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
	email: string | undefined;
	pwd: string | undefined;
	first_name: string | undefined;
	last_name: string | undefined;
	server: string | undefined;
};

type TInitialState = {
	loading: boolean;
	account: TAccount | null;
	errors: TUpdateAccountError | null;
};

const initialState: TInitialState = {
	loading: false,
	account: null,
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
			if (!err.response.data) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data);
		}
	}
);

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.account = action.payload.account;
			}
		);
		builder.addCase(updateEmail.pending, (state) => {
			state.loading = true;
			state.errors = null;
		});
		builder.addCase(
			updateEmail.fulfilled,
			(state, action: PayloadAction<{ account: TAccount }>) => {
				state.loading = false;
				state.account = action.payload.account;
				state.errors = null;
			}
		);
		builder.addCase(updateEmail.rejected, (state, action: any) => {
			state.loading = false;
			state.errors = action.payload.errors;
		});
	},
});

export default accountSlice.reducer;
