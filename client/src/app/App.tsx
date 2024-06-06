import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { relogin } from '@/features/auth/authSlice';
import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import AccountPage from '@/pages/AccountPage';
import ProjectsPage from '@/pages/ProjectsPage';
import CommentsPage from '@/pages/CommentsPage';
import BugsPage from '@/pages/BugsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import UnprotectedRoutes from '@/components/UnprotectedRoutes';

function App() {
	const dispatch = useAppDispatch();

	const { isLoggedIn } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(relogin());
		}
	}, []);

	return (
		<>
			{isLoggedIn && <Navbar />}
			<Routes>
				<Route element={<UnprotectedRoutes />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Route>
				<Route element={<ProtectedRoutes />}>
					<Route path='/account/*' element={<AccountPage />} />
					<Route path='/projects/*' element={<ProjectsPage />} />
					<Route path='/bugs/*' element={<BugsPage />} />
					<Route path='/comments/*' element={<CommentsPage />} />
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
