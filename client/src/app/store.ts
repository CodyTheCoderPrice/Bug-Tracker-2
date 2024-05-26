import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';

const appReducer = combineReducers({
	auth: authReducer,
	// Will add more reducers later
});

const rootReducer = (state: any, action: any) => {
	if (action.type === 'reset') {
		state = undefined;
	}
	return appReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
