import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/API';
import { login, relogin } from '../auth/authSlice';

type TBug = {
	bug_id: number;
	project_id: number;
	account_id: number;
	name: string;
	description: string;
	location: string;
	priority_id: number;
	priority_name: string;
	status_id: number;
	status_name: string;
	create_time: Date;
	due_date: Date | null;
	complete_date: Date | null;
	update_time: Date;
};

type TCreateBugError = {
	project_id: string | undefined;
	name: string | undefined;
	description: string | undefined;
	location: string | undefined;
	priority_id: string | undefined;
	status_id: string | undefined;
	due_date: string | undefined;
	complete_date: string | undefined;
	server: string | undefined;
};

type TInitialState = {
	createBugLoading: boolean;
	bugs: TBug[] | null;
	createBugSuccess: boolean;
	createBugErrors: TCreateBugError | null;
};

const initialState: TInitialState = {
	createBugLoading: false,
	bugs: null,
	createBugSuccess: false,
	createBugErrors: null,
};

export const createBug = createAsyncThunk(
	'bugs/create',
	async (
		bugInfo: {
			project_id: number;
			name: string;
			description: string;
			location: string;
			priority_id: number;
			status_id: number;
			due_date: string | null;
			complete_date: string | null;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post('/api/v1/bugs/create', bugInfo);
			return response.data;
		} catch (err: any) {
			if (!err.response.data.errors) {
				return rejectWithValue(null);
			}
			return rejectWithValue(err.response.data.errors);
		}
	}
);

const bugSlice = createSlice({
	name: 'bugs',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login / Relogin
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<{ bugs: TBug[] }>) => {
				state.bugs = action.payload.bugs;
			}
		);
		builder.addCase(
			relogin.fulfilled,
			(state, action: PayloadAction<{ bugs: TBug[] }>) => {
				state.bugs = action.payload.bugs;
			}
		);
		// Create
		builder.addCase(createBug.pending, (state) => {
			state.createBugLoading = true;
			state.createBugSuccess = false;
			state.createBugErrors = null;
		});
		builder.addCase(
			createBug.fulfilled,
			(state, action: PayloadAction<{ bugs: TBug[] }>) => {
				state.createBugLoading = false;
				state.bugs = action.payload.bugs;
				state.createBugSuccess = true;
				state.createBugErrors = null;
			}
		);
		builder.addCase(createBug.rejected, (state, action: any) => {
			state.createBugLoading = false;
			state.createBugSuccess = false;
			state.createBugErrors = action.payload;
		});
	},
});

export default bugSlice.reducer;
