import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import { updateName } from './accountSlice';

function UpdateName() {
	const dispatch = useAppDispatch();

	const [nameInfo, setNameInfo] = useState({ name: '' });

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
					name='name'
					placeholder='Name'
					onChange={handleInput}
					value={nameInfo.name}
				/>
				<button type='submit'>Update Name</button>
			</form>
			{updateNameLoading && <h3>Loading...</h3>}
			{updateNameSuccess && <p>Name Updated</p>}
			{updateNameErrors?.name && (
				<p style={{ color: 'red' }}>{updateNameErrors.name}</p>
			)}
			{updateNameErrors?.server && (
				<p style={{ color: 'red' }}>{updateNameErrors.server}</p>
			)}
		</>
	);
}

export default UpdateName;
