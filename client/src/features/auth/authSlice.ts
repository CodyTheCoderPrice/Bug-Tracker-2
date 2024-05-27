import { AppDispatch } from '@/app/store';
import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
	createAction,
} from '@reduxjs/toolkit';
import axiosInstance from '@/services/api';

type Account = {
	account_id: number;
	email: string;
	first_name: string;
	last_name: string;
	join_date: Date;
	last_edited: Date;
};

type LoginError = {
	email: string | undefined;
	pwd: string | undefined;
	server: string | undefined;
};

type InitialState = {
	loading: boolean;
	account: Account | null;
	errors: LoginError | null;
};

const initialState: InitialState = {
	loading: false,
	account: null,
	errors: null,
};

export const login = createAsyncThunk(
	'auth/login',
	async (loginInfo: { email: string; pwd: string }, { rejectWithValue }) => {
		try {
			const response = axiosInstance.post('/api/v1/auth/login', loginInfo);
			return (await response).data;
		} catch (err: any) {
			if (!err.response.data) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data);
		}
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
			(state, action: PayloadAction<{ account: Account }>) => {
				state.loading = false;
				state.account = action.payload.account;
				state.errors = null;
			}
		);
		builder.addCase(login.rejected, (state, action: any) => {
			state.loading = false;
			state.account = null;
			state.errors = action.payload.errors;
		});
	},
});

export default authSlice.reducer;

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
