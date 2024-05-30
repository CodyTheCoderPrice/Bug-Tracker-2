import Login from '@/features/auth/Login';
import Register from '@/features/register/Register';
import Test from '@/features/test/Test';
import Account from '@/features/account/Account';

const AccountPage = () => {
	return (
		<>
			<Register />
			<Login />
			<Account />
			<Test />
		</>
	);
};

export default AccountPage;
