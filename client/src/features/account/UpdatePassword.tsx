import { useState } from 'react';
import { updatePassword } from './accountSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';

function UpdatePassword() {
	const dispatch = useAppDispatch();

	const [pwdInfo, setPwdInfo] = useState({
		pwd: '',
		newPwd: '',
		confirmPwd: '',
	});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPwdInfo({ ...pwdInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updatePassword(pwdInfo));
	};

	const { loading, updatePasswordSuccess, errors } = useAppSelector(
		(state) => state.account
	);

	return (
		<>
			<h2>Change Password</h2>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<input
					type='password'
					name='pwd'
					placeholder='Current password'
					onChange={handleInput}
					value={pwdInfo.pwd}
				/>
				<input
					type='password'
					name='newPwd'
					placeholder='New password'
					onChange={handleInput}
					value={pwdInfo.newPwd}
				/>
				<input
					type='password'
					name='confirmPwd'
					placeholder='Confirm new password'
					onChange={handleInput}
					value={pwdInfo.confirmPwd}
				/>
				<button type='submit'>Update Password</button>
			</form>
			{loading && <h3>Loading...</h3>}
			{updatePasswordSuccess && <p>Password Updated</p>}
			{errors?.updatePassword?.pwd && (
				<p style={{ color: 'red' }}>{errors.updatePassword.pwd}</p>
			)}
			{errors?.updatePassword?.newPwd && (
				<p style={{ color: 'red' }}>{errors.updatePassword.newPwd}</p>
			)}
			{errors?.updatePassword?.confirmPwd && (
				<p style={{ color: 'red' }}>{errors.updatePassword.confirmPwd}</p>
			)}
			{errors?.updatePassword?.server && (
				<p style={{ color: 'red' }}>{errors.updatePassword.server}</p>
			)}
		</>
	);
}

export default UpdatePassword;
