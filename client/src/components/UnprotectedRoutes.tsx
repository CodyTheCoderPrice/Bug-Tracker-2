import { useAppSelector } from '@/app/hooks';
import { Outlet, Navigate } from 'react-router-dom';

function UnprotectedRoutes() {
	const { isLoggedIn } = useAppSelector((state) => state.auth);

	return !isLoggedIn ? <Outlet /> : <Navigate to='/account' replace />;
}

export default UnprotectedRoutes;
