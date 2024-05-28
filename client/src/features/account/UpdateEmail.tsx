import { useState } from 'react';
import { updateEmail } from './accountSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

function UpdateEmail() {
	const dispatch = useAppDispatch();

	const [emailInfo, setEmailInfo] = useState({ email: '', pwd: '' });

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailInfo({ ...emailInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateEmail(emailInfo));
	};

	const { loading, updateEmailSuccess, errors } = useAppSelector(
		(state) => state.account
	);

	return (
		<>
			<h2>Change Email</h2>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					placeholder='Email'
					onChange={handleInput}
					value={emailInfo.email}
				/>
				<input
					type='password'
					name='pwd'
					placeholder='Password'
					onChange={handleInput}
					value={emailInfo.pwd}
				/>
				<button type='submit'>Update Email</button>
			</form>
			{loading && <h3>Loading...</h3>}
			{updateEmailSuccess && <p>Email Updated</p>}
			{errors?.updateEmail?.email && (
				<p style={{ color: 'red' }}>{errors.updateEmail.email}</p>
			)}
			{errors?.updateEmail?.pwd && (
				<p style={{ color: 'red' }}>{errors.updateEmail.pwd}</p>
			)}
			{errors?.updateEmail?.server && (
				<p style={{ color: 'red' }}>{errors.updateEmail.server}</p>
			)}
		</>
	);
}

export default UpdateEmail;
