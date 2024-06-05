import { useAppSelector } from '@/app/hooks';
import { Route, Routes } from 'react-router-dom';
import CreateComment from '@/features/comments/CreateComment';
import CommentList from '@/features/comments/CommentList';

function CommentsPage() {
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
								<CreateComment />
								<CommentList />
							</>
						}
					/>
					<Route path='new' element={<CreateComment />} />
					<Route path='list' element={<CommentList />} />
				</Routes>
			) : loading ? (
				<h3>Loading</h3>
			) : (
				<p>Must be logged in</p>
			)}
		</>
	);
}

export default CommentsPage;
