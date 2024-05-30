import { useAppSelector } from '@/app/hooks';
import UpdateName from './UpdateName';
import UpdateEmail from './UpdateEmail';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

function Account() {
	const { loading, errors } = useAppSelector((state) => state.auth);
	const { account } = useAppSelector((state) => state.account);

	return (
		<>
			{loading && <h3>Loading...</h3>}
			{account && (
				<>
					<p>{account.email}</p>
					<p>{account.first_name}</p>
					<p>{account.last_name}</p>
					<p>{account.create_time.toString()}</p>
					<p>{account.update_time.toString()}</p>
				</>
			)}
			{errors?.email && <p style={{ color: 'red' }}>{errors.email}</p>}
			{errors?.pwd && <p style={{ color: 'red' }}>{errors.pwd}</p>}
			{errors?.server && <p style={{ color: 'red' }}>{errors.server}</p>}

			{account && <UpdateName />}
			{account && <UpdateEmail />}
			{account && <UpdatePassword />}
			{account && <DeleteAccount />}
		</>
	);
}

export default Account;
