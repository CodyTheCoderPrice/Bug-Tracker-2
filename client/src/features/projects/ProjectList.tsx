import { useAppSelector } from '@/app/hooks';

function ProjectList() {
	const { projects } = useAppSelector((state) => state.projects);

	return (
		<>
			<h1>Projects List</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>create time</th>
						<th>Update time</th>
					</tr>
				</thead>
				<tbody>
					{projects?.map((project, idx) => {
						return (
							<tr key={idx}>
								<td style={{ padding: '0 20px' }}>{project.name}</td>
								<td style={{ padding: '0 20px' }}>{project.description}</td>
								<td style={{ padding: '0 20px' }}>
									{project.create_time.toString()}
								</td>
								<td style={{ padding: '0 20px' }}>
									{project.update_time.toString()}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}

export default ProjectList;
