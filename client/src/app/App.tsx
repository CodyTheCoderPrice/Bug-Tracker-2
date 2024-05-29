import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { relogin } from '@/features/auth/authSlice';
import Login from '@/features/auth/Login';
import Register from '@/features/register/Register';
import Test from '@/features/test/Test';
import Account from '@/features/account/Account';

function App() {
	const dispatch = useAppDispatch();

	const { isLoggedIn } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(relogin());
		}
	}, [dispatch, isLoggedIn]);

	return (
		<>
			<Register />
			<Login />
			<Account />
			<Test />
		</>
	);
}

export default App;
