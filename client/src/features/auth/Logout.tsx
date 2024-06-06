import { useAppDispatch } from '@/app/hooks';
import { logout } from './authSlice';

function Logout() {
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<>
			<h2>Logout</h2>
			<button type='button' onClick={handleLogout}>
				LOGOUT
			</button>
		</>
	);
}

export default Logout;
