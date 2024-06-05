import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '@/API';
import { login, relogin } from '../auth/authSlice';
import { deleteProject } from '../projects/projectSlice';
import { deleteBug } from '../bugs/bugSlice';

type TComment = {
	comment_id: number;
	bug_id: number;
	description: string;
	create_time: string;
	update_time: string;
};

type TCreateCommentError = {
	bug_id: string | undefined;
	description: string | undefined;
	server: string | undefined;
};

type TUpdateCommentError = {
	comment_id: string | undefined;
	bug_id: string | undefined;
	description: string | undefined;
	server: string | undefined;
};

type TInitialState = {
	createCommentLoading: boolean;
	updateCommentLoading: boolean;
	comments: TComment[] | null;
	createCommentSuccess: boolean;
	updateCommentSuccess: boolean;
	createCommentErrors: TCreateCommentError | null;
	updateCommentErrors: TUpdateCommentError | null;
};

const initialState: TInitialState = {
	createCommentLoading: false,
	updateCommentLoading: false,
	comments: null,
	createCommentSuccess: false,
	updateCommentSuccess: false,
	createCommentErrors: null,
	updateCommentErrors: null,
};

export const createComment = createAsyncThunk(
	'comments/create',
	async (
		commentInfo: {
			bug_id: number;
			description: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				'/api/v1/comments/create',
				commentInfo
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

export const updateComment = createAsyncThunk(
	'comments/update',
	async (
		commentInfo: {
			comment_id: number;
			bug_id: number;
			description: string;
		},
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.put(
				'/api/v1/comments/update',
				commentInfo
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

const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login / Relogin
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<{ comments: TComment[] }>) => {
				state.comments = action.payload.comments;
			}
		);
		builder.addCase(
			relogin.fulfilled,
			(state, action: PayloadAction<{ comments: TComment[] }>) => {
				state.comments = action.payload.comments;
			}
		);
		// delete project / bug
		builder.addCase(
			deleteProject.fulfilled,
			(state, action: PayloadAction<{ comments: TComment[] }>) => {
				state.comments = action.payload.comments;
			}
		);
		builder.addCase(
			deleteBug.fulfilled,
			(state, action: PayloadAction<{ comments: TComment[] }>) => {
				state.comments = action.payload.comments;
			}
		);
		// Create
		builder.addCase(createComment.pending, (state) => {
			state.createCommentLoading = true;
			state.createCommentSuccess = false;
			state.createCommentErrors = null;
		});
		builder.addCase(
			createComment.fulfilled,
			(state, action: PayloadAction<{ comments: TComment[] }>) => {
				state.createCommentLoading = false;
				state.comments = action.payload.comments;
				state.createCommentSuccess = true;
				state.createCommentErrors = null;
			}
		);
		builder.addCase(createComment.rejected, (state, action: any) => {
			state.createCommentLoading = false;
			state.createCommentSuccess = false;
			state.createCommentErrors = action.payload;
		});
		// update
		builder.addCase(updateComment.pending, (state) => {
			state.updateCommentLoading = true;
			state.updateCommentSuccess = false;
			state.updateCommentErrors = null;
		});
		builder.addCase(
			updateComment.fulfilled,
			(state, action: PayloadAction<{ comments: TComment[] }>) => {
				state.updateCommentLoading = false;
				state.comments = action.payload.comments;
				state.updateCommentSuccess = true;
				state.updateCommentErrors = null;
			}
		);
		builder.addCase(updateComment.rejected, (state, action: any) => {
			state.updateCommentLoading = false;
			state.updateCommentSuccess = false;
			state.updateCommentErrors = action.payload;
		});
	},
});

export default commentSlice.reducer;
