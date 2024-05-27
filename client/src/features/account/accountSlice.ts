import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../auth/authSlice';

type TAccount = {
	account_id: number;
	email: string;
	first_name: string;
	last_name: string;
	join_date: Date;
	last_edited: Date;
};

type TInitialState = {
	loading: boolean;
	account: TAccount | null;
	errors: null;
};

const initialState: TInitialState = {
	loading: false,
	account: null,
	errors: null,
};

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
	},
});

export default accountSlice.reducer;
