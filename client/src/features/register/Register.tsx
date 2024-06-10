import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import { register } from './registerSlice';

function Register() {
	const dispatch = useAppDispatch();

	const [registerInfo, setRegisterInfo] = useState({
		email: '',
		pwd: '',
		name: '',
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
					name='name'
					placeholder='Name'
					onChange={handleInput}
					value={registerInfo.name}
				/>
				<button type='submit'>REGISTER</button>
			</form>
			{loading && <h3>Loading...</h3>}
			{success && <p>Account Created</p>}
			{errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
			{errors?.pwd && <p style={{ color: 'red' }}>{errors.pwd}</p>}
			{errors?.name && <p style={{ color: 'red' }}>{errors.name}</p>}
			{errors?.server && <p style={{ color: 'red' }}>{errors.server}</p>}
		</>
	);
}

export default Register;
