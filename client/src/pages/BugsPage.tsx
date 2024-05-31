import { useAppSelector } from '@/app/hooks';
import { Route, Routes } from 'react-router-dom';
import CreateBug from '@/features/bugs/CreateBug';
import BugList from '@/features/bugs/BugList';

function BugPage() {
	const { account } = useAppSelector((state) => state.account);
	const { loading } = useAppSelector((state) => state.auth);
	return (
		<>
			{account ? (
				<Routes>
					<Route
						index
						element={
							<>
								<CreateBug />
								<BugList />
							</>
						}
					/>
					<Route path='new' element={<CreateBug />} />
					<Route path='list' element={<BugList />} />
				</Routes>
			) : loading ? (
				<h3>Loading</h3>
			) : (
				<p>Must be logged in</p>
			)}
		</>
	);
}

export default BugPage;
