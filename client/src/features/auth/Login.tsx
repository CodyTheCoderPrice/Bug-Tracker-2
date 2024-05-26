import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, logout } from './authSlice';

function Login() {
	const dispatch = useAppDispatch();

	const loginInfoInitialState = {
		email: '',
		pwd: '',
	};
	const [loginInfo, setLoginInfo] = useState(loginInfoInitialState);

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
	};

	const handleLogout = () => {
		setLoginInfo(loginInfoInitialState);
		dispatch(logout());
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(login(loginInfo));
	};

	const { loading, account, errors } = useAppSelector((state) => state.auth);

	return (
		<>
			<h1>Login</h1>
			<form noValidate onSubmit={handleSubmit}>
				<input
					autoFocus
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleInput}
					value={loginInfo.email}
					autoComplete='off'
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
			{loading && <h2>Loading...</h2>}
			{account !== null
				? Object.keys(account).map(function (key, index) {
						return (
							<p key={index}>
								{account[key as keyof typeof account].toString()}
							</p>
						);
				  })
				: null}
			{errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
			{errors?.pwd && <p style={{ color: 'red' }}>{errors.pwd}</p>}
			{errors?.server && <p style={{ color: 'red' }}>{errors.server}</p>}
		</>
	);
}

export default Login;
