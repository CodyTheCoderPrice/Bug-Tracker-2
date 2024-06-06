import { useAppSelector } from '@/app/hooks';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes() {
	const { isLoggedIn } = useAppSelector((state) => state.auth);

	return isLoggedIn ? <Outlet /> : <Navigate to='/login' replace />;
}

export default ProtectedRoutes;
