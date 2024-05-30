import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/API';

type TRegisterError = {
	email: string | undefined;
	pwd: string | undefined;
	first_name: string | undefined;
	last_name: string | undefined;
	server: string | undefined;
};

type TInitialState = {
	loading: boolean;
	success: boolean;
	errors: TRegisterError | null;
};

const initialState: TInitialState = {
	loading: false,
	success: false,
	errors: null,
};

export const register = createAsyncThunk(
	'register/register',
	async (
		registerInfo: {
			email: string;
			pwd: string;
			first_name: string;
			last_name: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = axiosInstance.post(
				'/api/v1/accounts/register',
				registerInfo
			);
			return (await response).data;
		} catch (err: any) {
			if (!err.response.data.errors) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data.errors);
		}
	}
);

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(register.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(register.fulfilled, (state) => {
			state.loading = false;
			state.success = true;
			state.errors = null;
		});
		builder.addCase(register.rejected, (state, action: any) => {
			state.loading = false;
			state.success = false;
			state.errors = action.payload;
		});
	},
});

export default registerSlice.reducer;
