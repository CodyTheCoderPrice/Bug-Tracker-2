import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import regiisterReducer from '@/features/register/registerSlice';
import accountReducer from '@/features/account/accountSlice';

const appReducer = combineReducers({
	auth: authReducer,
	register: regiisterReducer,
	account: accountReducer,
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
