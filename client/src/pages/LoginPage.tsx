import Login from '@/features/auth/Login';
import { Link } from 'react-router-dom';

function LoginPage() {
	return (
		<>
			<Login />
			<Link to='/register' style={{ display: 'block', padding: '20px 0px' }}>
				Create an account
			</Link>
		</>
	);
}

export default LoginPage;
