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

	const { updateNameLoading, updateNameSuccess, updateNameErrors } =
		useAppSelector((state) => state.account);

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
			{updateNameLoading && <h3>Loading...</h3>}
			{updateNameSuccess && <p>Name Updated</p>}
			{updateNameErrors?.first_name && (
				<p style={{ color: 'red' }}>{updateNameErrors.first_name}</p>
			)}
			{updateNameErrors?.last_name && (
				<p style={{ color: 'red' }}>{updateNameErrors.last_name}</p>
			)}
			{updateNameErrors?.server && (
				<p style={{ color: 'red' }}>{updateNameErrors.server}</p>
			)}
		</>
	);
}

export default UpdateName;