import { AppDispatch } from '@/app/store';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axiosInstance from '@/API';

type TLoginError = {
	email: string | undefined;
	pwd: string | undefined;
	server: string | undefined;
};

type TInitialState = {
	loading: boolean;
	isLoggedIn: boolean;
	errors: TLoginError | null;
};

const initialState: TInitialState = {
	loading: false,
	isLoggedIn: false,
	errors: null,
};

// Uses password
export const login = createAsyncThunk(
	'auth/login',
	async (loginInfo: { email: string; pwd: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.post(
				'/api/v1/auth/login',
				loginInfo
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

// Uses accessToken
export const relogin = createAsyncThunk(
	'auth/relogin',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get('/api/v1/auth/relogin');
			console.log('Re-login succesful');
			return response.data;
		} catch (err: any) {
			if (!err.response.data.errors) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data.errors);
		}
	}
);

export const reset = createAction('reset');

export const logout = () => {
	return async (dispatch: AppDispatch) => {
		try {
			await axiosInstance.delete('/api/v1/auth/logout');
		} catch (err: any) {
			if (err.response && err.response.data) {
				console.log(err.response.data);
			}
			console.log(err.message);
		}
		dispatch(reset());
	};
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login
		builder.addCase(login.pending, (state) => {
			state.loading = true;
			state.errors = null;
		});
		builder.addCase(login.fulfilled, (state) => {
			state.loading = false;
			state.isLoggedIn = true;
			state.errors = null;
		});
		builder.addCase(login.rejected, (state, action: any) => {
			state.loading = false;
			state.isLoggedIn = false;
			state.errors = action.payload;
		});
		// Relogin
		builder.addCase(relogin.pending, (state) => {
			state.loading = true;
			state.errors = null;
		});
		builder.addCase(relogin.fulfilled, (state) => {
			state.loading = false;
			state.isLoggedIn = true;
			state.errors = null;
		});
		builder.addCase(relogin.rejected, (state, action: any) => {
			state.loading = false;
			state.isLoggedIn = false;
			state.errors = action.payload;
		});
	},
});

export default authSlice.reducer;
