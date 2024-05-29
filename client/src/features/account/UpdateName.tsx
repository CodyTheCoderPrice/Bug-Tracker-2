import { useState } from 'react';
import { updateName } from './accountSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

function UpdateName() {
	const dispatch = useAppDispatch();

	const [nameInfo, setNameInfo] = useState({ first_name: '', last_name: '' });

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNameInfo({ ...nameInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateName(nameInfo));
	};

	const { loading, updateNameSuccess, errors } = useAppSelector(
		(state) => state.account
	);

	return (
		<>
			<h2>Change Name</h2>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<input
					type='text'
					name='first_name'
					placeholder='First Name'
					onChange={handleInput}
					value={nameInfo.first_name}
				/>
				<input
					type='text'
					name='last_name'
					placeholder='Last Name'
					onChange={handleInput}
					value={nameInfo.last_name}
				/>
				<button type='submit'>Update Name</button>
			</form>
			{loading && <h3>Loading...</h3>}
			{updateNameSuccess && <p>Name Updated</p>}
			{errors?.updateName?.first_name && (
				<p style={{ color: 'red' }}>{errors.updateName.first_name}</p>
			)}
			{errors?.updateName?.last_name && (
				<p style={{ color: 'red' }}>{errors.updateName.last_name}</p>
			)}
			{errors?.updateName?.server && (
				<p style={{ color: 'red' }}>{errors.updateName.server}</p>
			)}
		</>
	);
}

export default UpdateName;
