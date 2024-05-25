import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

type Account = {
	account_id: number;
	email: string;
	first_name: string;
	last_name: string;
	join_date: Date;
	last_edited: Date;
};

type InitialState = {
	loading: boolean;
	account: Account | null;
	token: string | null;
	error: string | null;
};

const initialState: InitialState = {
	loading: false,
	account: null,
	token: null,
	error: null,
};

export const login = createAsyncThunk(
	'auth/login',
	async (loginInfo: { email: string; pwd: string }) => {
		return axios.post('/api/v1/auth/login', loginInfo).then((res) => {
			const { refreshToken } = res.data;

			console.log(refreshToken);
			return res.data;
		});
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			login.fulfilled,
			(
				state,
				action: PayloadAction<{ account: Account; accessToken: string }>
			) => {
				const { account, accessToken } = action.payload;
				state.loading = false;
				state.account = account;
				state.token = accessToken;
				state.error = null;
			}
		);
		builder.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.account = null;
			state.token = null;
			state.error = action.error.message || 'Something went wrong';
		});
	},
});

export default authSlice.reducer;
