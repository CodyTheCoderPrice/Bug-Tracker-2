import { useAppDispatch } from '@/app/hooks';
import { useState } from 'react';
import { login, logout } from './authSlice';

function Login() {
	const dispatch = useAppDispatch();

	const [loginInfo, setLoginInfo] = useState({
		email: '',
		pwd: '',
	});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login(loginInfo));
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<>
			<h1>Login</h1>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleInput}
					value={loginInfo.email}
				/>
				<input
					type='password'
					name='pwd'
					placeholder='Password'
					onChange={handleInput}
					value={loginInfo.pwd}
				/>
				<button type='submit'>LOGIN</button>
				<button type='button' onClick={handleLogout}>
					LOGOUT
				</button>
			</form>
		</>
	);
}

export default Login;
