import { useAppSelector } from '@/app/hooks';

function AccountInfo() {
	const { loading, errors } = useAppSelector((state) => state.auth);
	const { account } = useAppSelector((state) => state.account);

	return (
		<>
			<h1>Account Info</h1>
			{loading && <h3>Loading...</h3>}
			{account ? (
				<>
					<p>{account.email}</p>
					<p>{account.first_name}</p>
					<p>{account.last_name}</p>
					<p>{account.create_time.toString()}</p>
					<p>{account.update_time.toString()}</p>
				</>
			) : (
				<p>No account info</p>
			)}
			{errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
			{errors?.pwd && <p style={{ color: 'red' }}>{errors.pwd}</p>}
			{errors?.server && <p style={{ color: 'red' }}>{errors.server}</p>}
		</>
	);
}

export default AccountInfo;
