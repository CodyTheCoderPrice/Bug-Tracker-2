import { Route, Routes } from 'react-router-dom';
import Login from '@/features/auth/Login';
import Register from '@/features/register/Register';
import Test from '@/features/test/Test';
import Account from '@/features/account/Account';

const AccountPage = () => {
	return (
		<Routes>
			<Route
				index
				element={
					<>
						<Register />
						<Login />
						<Account />
						<Test />
					</>
				}
			/>
			<Route path='register' element={<Register />} />
			<Route path='login' element={<Login />} />
			<Route path='info' element={<Account />} />
			<Route path='test' element={<Test />} />
		</Routes>
	);
};

export default AccountPage;
