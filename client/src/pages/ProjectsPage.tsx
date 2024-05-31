import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import CreateProject from '@/features/projects/CreateProject';
import ProjectList from '@/features/projects/ProjectList';

function ProjectsPage() {
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
								<CreateProject />
								<ProjectList />
							</>
						}
					/>
					<Route path='new' element={<CreateProject />} />
					<Route path='list' element={<ProjectList />} />
				</Routes>
			) : loading ? (
				<h3>Loading</h3>
			) : (
				<p>Must be logged in</p>
			)}
		</>
	);
}

export default ProjectsPage;
