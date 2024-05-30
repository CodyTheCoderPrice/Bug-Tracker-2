import { useState } from 'react';
import { deleteAccount } from './accountSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

function DeleteAccount() {
	const dispatch = useAppDispatch();

	const [deleteInfo, setDeleteInfo] = useState({ pwd: '', confirmDelete: '' });

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDeleteInfo({ ...deleteInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(deleteAccount(deleteInfo));
	};

	const { loading, errors } = useAppSelector((state) => state.account);

	return (
		<>
			<h2>Delete Account</h2>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<input
					type='password'
					name='pwd'
					placeholder='Password'
					onChange={handleInput}
					value={deleteInfo.pwd}
				/>
				<input
					type='text'
					name='confirmDelete'
					placeholder='DELETE'
					onChange={handleInput}
					value={deleteInfo.confirmDelete}
				/>
				<button type='submit' disabled={deleteInfo.confirmDelete !== 'DELETE'}>
					Delete
				</button>
			</form>
			{loading && <h3>Loading...</h3>}
			{errors?.deleteAccount?.pwd && (
				<p style={{ color: 'red' }}>{errors.deleteAccount.pwd}</p>
			)}
			{errors?.deleteAccount?.server && (
				<p style={{ color: 'red' }}>{errors.deleteAccount.server}</p>
			)}
		</>
	);
}

export default DeleteAccount;
