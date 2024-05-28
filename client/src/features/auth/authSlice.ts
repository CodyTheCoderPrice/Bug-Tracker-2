import { AppDispatch } from '@/app/store';
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axiosInstance from '@/services/api';

type LoginError = {
	email: string | undefined;
	pwd: string | undefined;
	server: string | undefined;
};

type InitialState = {
	loading: boolean;
	loggedIn: boolean;
	errors: LoginError | null;
};

const initialState: InitialState = {
	loading: false,
	loggedIn: false,
	errors: null,
};

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

const reset = createAction('reset');

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
		builder.addCase(login.pending, (state) => {
			state.loading = true;
			state.errors = null;
		});
		builder.addCase(login.fulfilled, (state) => {
			state.loading = false;
			state.loggedIn = true;
			state.errors = null;
		});
		builder.addCase(login.rejected, (state, action: any) => {
			state.loading = false;
			state.loggedIn = false;
			state.errors = action.payload;
		});
	},
});

export default authSlice.reducer;
