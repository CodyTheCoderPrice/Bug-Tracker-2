import { useState } from 'react';
import { updateEmail } from './accountSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

function UpdateEmail() {
	const dispatch = useAppDispatch();

	const [emailInfo, setEmailInfo] = useState({ email: '' });

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailInfo({ email: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateEmail(emailInfo));
	};

	const { loading, errors } = useAppSelector((state) => state.account);

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
				<button type='submit'>Update Email</button>
			</form>
			{loading && <h3>Loading...</h3>}
			{errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
			{errors?.server && <p style={{ color: 'red' }}>{errors.server}</p>}
		</>
	);
}

export default UpdateEmail;
