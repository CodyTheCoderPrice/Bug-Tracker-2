import Register from '@/features/register/Register';
import { Link } from 'react-router-dom';

function RegisterPage() {
	return (
		<>
			<Register />
			<Link to='/login' style={{ display: 'block', padding: '20px 0px' }}>
				Already have an account? Log in
			</Link>
		</>
	);
}

export default RegisterPage;
