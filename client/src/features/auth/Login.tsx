import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login } from './authSlice';

export const Login = () => {
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

	const { loading, account, token, error } = useAppSelector(
		(state) => state.auth
	);

	return (
		<>
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
					autoFocus
					type='password'
					name='pwd'
					placeholder='Password'
					onChange={handleInput}
					value={loginInfo.pwd}
				/>
				<button type='submit'>LOGIN</button>
			</form>
			{loading && <h1>Loading...</h1>}
			{account !== null
				? Object.keys(account).map(function (key, index) {
						return (
							<p key={index}>
								{account[key as keyof typeof account].toString()}
							</p>
						);
				  })
				: null}
			{token && <p>{token}</p>}
			{error && <p>{error}</p>}
		</>
	);
};
