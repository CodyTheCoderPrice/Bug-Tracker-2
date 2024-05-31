import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/API';
import { login, relogin } from '../auth/authSlice';

type TProject = {
	project_id: number;
	account_id: number;
	name: string;
	description: string;
	create_time: Date;
	update_time: Date;
};

type TCreateProjectError = {
	name: string | undefined;
	description: string | undefined;
	server: string | undefined;
};

type TUpdateProjectError = {
	project_id: string | undefined;
	name: string | undefined;
	description: string | undefined;
	server: string | undefined;
};

type TInitialState = {
	createProjectLoading: boolean;
	updateProjectLoading: boolean;
	projects: TProject[] | null;
	createProjectSuccess: boolean;
	updateProjectSuccess: boolean;
	createProjectErrors: TCreateProjectError | null;
	updateProjectErrors: TUpdateProjectError | null;
};

const initialState: TInitialState = {
	createProjectLoading: false,
	updateProjectLoading: false,
	projects: null,
	createProjectSuccess: false,
	updateProjectSuccess: false,
	createProjectErrors: null,
	updateProjectErrors: null,
};

export const createProject = createAsyncThunk(
	'projects/create',
	async (
		projectInfo: { name: string; description: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				'/api/v1/projects/create',
				projectInfo
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

export const updateProject = createAsyncThunk(
	'projects/update',
	async (
		projectInfo: { project_id: number; name: string; description: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				'/api/v1/projects/update',
				projectInfo
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

const projectSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login / Relogin
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<{ projects: TProject[] }>) => {
				state.projects = action.payload.projects;
			}
		);
		builder.addCase(
			relogin.fulfilled,
			(state, action: PayloadAction<{ projects: TProject[] }>) => {
				state.projects = action.payload.projects;
			}
		);
		// Create
		builder.addCase(createProject.pending, (state) => {
			state.createProjectLoading = true;
			state.createProjectSuccess = false;
			state.createProjectErrors = null;
		});
		builder.addCase(
			createProject.fulfilled,
			(state, action: PayloadAction<{ projects: TProject[] }>) => {
				state.createProjectLoading = false;
				state.projects = action.payload.projects;
				state.createProjectSuccess = true;
				state.createProjectErrors = null;
			}
		);
		builder.addCase(createProject.rejected, (state, action: any) => {
			state.createProjectLoading = false;
			state.createProjectSuccess = false;
			state.createProjectErrors = action.payload;
		});
		// Update
		builder.addCase(updateProject.pending, (state) => {
			state.updateProjectLoading = true;
			state.updateProjectSuccess = false;
			state.updateProjectErrors = null;
		});
		builder.addCase(
			updateProject.fulfilled,
			(state, action: PayloadAction<{ projects: TProject[] }>) => {
				state.updateProjectLoading = false;
				state.projects = action.payload.projects;
				state.updateProjectSuccess = true;
				state.updateProjectErrors = null;
			}
		);
		builder.addCase(updateProject.rejected, (state, action: any) => {
			state.updateProjectLoading = false;
			state.updateProjectSuccess = false;
			state.updateProjectErrors = action.payload;
		});
	},
});

export default projectSlice.reducer;
