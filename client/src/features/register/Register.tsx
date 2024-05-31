import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import { register } from './registerSlice';

function Register() {
	const dispatch = useAppDispatch();

	const [registerInfo, setRegisterInfo] = useState({
		email: '',
		pwd: '',
		first_name: '',
		last_name: '',
	});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(register(registerInfo));
	};

	const { loading, success, errors } = useAppSelector(
		(state) => state.register
	);

	return (
		<>
			<h1>Register</h1>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleInput}
					value={registerInfo.email}
					autoComplete='off'
				/>
				<input
					type='password'
					name='pwd'
					placeholder='Password'
					onChange={handleInput}
					value={registerInfo.pwd}
				/>
				<input
					type='text'
					name='first_name'
					placeholder='First Name'
					onChange={handleInput}
					value={registerInfo.first_name}
				/>
				<input
					type='text'
					name='last_name'
					placeholder='Last Name'
					onChange={handleInput}
					value={registerInfo.last_name}
				/>
				<button type='submit'>REGISTER</button>
			</form>
			{loading && <h3>Loading...</h3>}
			{success && <p>Account Created</p>}
			{errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
			{errors?.pwd && <p style={{ color: 'red' }}>{errors.pwd}</p>}
			{errors?.first_name && (
				<p style={{ color: 'red' }}>{errors.first_name}</p>
			)}
			{errors?.last_name && <p style={{ color: 'red' }}>{errors.last_name}</p>}
			{errors?.server && <p style={{ color: 'red' }}>{errors.server}</p>}
		</>
	);
}

export default Register;
