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

type TInitialState = {
	createCommentLoading: boolean;
	comments: TComment[] | null;
	createCommentSuccess: boolean;
	createCommentErrors: TCreateCommentError | null;
};

const initialState: TInitialState = {
	createCommentLoading: false,
	comments: null,
	createCommentSuccess: false,
	createCommentErrors: null,
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
	},
});

export default commentSlice.reducer;
