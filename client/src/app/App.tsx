import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
import { relogin } from '@/features/auth/authSlice';
import { Route, Routes } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AccountPage from '@/pages/AccountPage';
import ProjectsPage from '@/pages/ProjectsPage';
import CommentsPage from '@/pages/CommentsPage';
import BugsPage from '@/pages/BugsPage';

function App() {
	const dispatch = useAppDispatch();

	const { isLoggedIn } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(relogin());
		}
	}, [dispatch, isLoggedIn]);

	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<AccountPage />} />
				<Route path='/Projects' element={<ProjectsPage />} />
				<Route path='/Bugs' element={<BugsPage />} />
				<Route path='/Comments' element={<CommentsPage />} />
			</Routes>
		</>
	);
}

export default App;
