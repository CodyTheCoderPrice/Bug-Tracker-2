import { useAppDispatch, useAppSelector } from '@/app/hooks';

function CommentList() {
	const { bugs } = useAppSelector((state) => state.bugs);
	const { comments } = useAppSelector((state) => state.comments);

	return (
		<>
			<h1>Comments List</h1>
			{bugs?.length === 0 ? (
				<p>No bugs</p>
			) : comments?.length === 0 ? (
				<p>No comments</p>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>Comment id</th>
								<th>Bug id</th>
								<th>Description</th>
								<th>create time</th>
								<th>Update time</th>
							</tr>
						</thead>
						<tbody>
							{comments?.map((comment, idx) => {
								return (
									<tr key={idx}>
										<td style={{ padding: '5px 20px' }}>
											{comment.comment_id}
										</td>
										<td style={{ padding: '5px 20px' }}>{comment.bug_id}</td>
										<td style={{ padding: '0 20px' }}>{comment.description}</td>
										<td style={{ padding: '0 20px' }}>
											{comment.create_time.toString()}
										</td>
										<td style={{ padding: '0 20px' }}>
											{comment.update_time.toString()}
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

export default CommentList;
