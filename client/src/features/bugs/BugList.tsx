import { useAppDispatch, useAppSelector } from '@/app/hooks';

function BugList() {
	const { projects } = useAppSelector((state) => state.projects);
	const { bugs } = useAppSelector((state) => state.bugs);

	return (
		<>
			<h1>Bugs List</h1>
			{projects?.length === 0 ? (
				<p>No projects</p>
			) : bugs?.length === 0 ? (
				<p>No bugs</p>
			) : (
				<>
					{' '}
					<table>
						<thead>
							<tr>
								<th>Bug id</th>
								<th>Project id</th>
								<th>Name</th>
								<th>Description</th>
								<th>Location</th>
								<th>Priority</th>
								<th>Status</th>
								<th>create time</th>
								<th>Due Date</th>
								<th>Completion Date</th>
								<th>Update time</th>
							</tr>
						</thead>
						<tbody>
							{bugs?.map((bug, idx) => {
								return (
									<tr key={idx}>
										<td style={{ padding: '5px 20px' }}>{bug.bug_id}</td>
										<td style={{ padding: '5px 20px' }}>{bug.project_id}</td>
										<td style={{ padding: '0 20px' }}>{bug.name}</td>
										<td style={{ padding: '0 20px' }}>{bug.description}</td>
										<td style={{ padding: '0 20px' }}>{bug.location}</td>
										<td style={{ padding: '0 20px' }}>{bug.priority_name}</td>
										<td style={{ padding: '0 20px' }}>{bug.status_name}</td>
										<td style={{ padding: '0 20px' }}>
											{bug.create_time.toString()}
										</td>
										<td style={{ padding: '0 20px' }}>
											{bug.due_date !== null ? bug.due_date.toString() : ''}
										</td>
										<td style={{ padding: '0 20px' }}>
											{bug.complete_date !== null
												? bug.complete_date.toString()
												: ''}
										</td>
										<td style={{ padding: '0 20px' }}>
											{bug.update_time.toString()}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</>
			)}
		</>
	);
}

export default BugList;
