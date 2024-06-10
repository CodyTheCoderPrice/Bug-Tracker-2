import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import { login } from './authSlice';

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

	const { errors } = useAppSelector((state) => state.auth);

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
			</form>
			{errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
			{errors?.pwd && <p style={{ color: 'red' }}>{errors.pwd}</p>}
			{errors?.server && <p style={{ color: 'red' }}>{errors.server}</p>}
		</>
	);
}

export default Login;
