import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateComment } from './commentSlice';

function UpdateComment() {
	const dispatch = useAppDispatch();

	const { comments } = useAppSelector((state) => state.comments);
	const { id } = useParams();

	const comment = comments?.find((c) => {
		return c.comment_id === Number(id);
	});

	const [commentInfo, setCommentInfo] = useState({
		comment_id: comment?.comment_id ? comment.comment_id : -1,
		bug_id: comment?.bug_id ? comment.bug_id : -1,
		description: comment?.description ? comment.description : '',
	});

	const handleInput = (
		e: React.ChangeEvent<
			HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
		>
	) => {
		setCommentInfo({ ...commentInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateComment(commentInfo));
	};

	const { bugs } = useAppSelector((state) => state.bugs);
	const { updateCommentLoading, updateCommentSuccess, updateCommentErrors } =
		useAppSelector((state) => state.comments);

	return (
		<>
			{comment ? (
				<>
					<h1>Update Comment</h1>
					<form noValidate autoComplete='off' onSubmit={handleSubmit}>
						<select
							name='bug_id'
							onChange={handleInput}
							defaultValue={commentInfo.bug_id}
							style={{ display: 'block' }}
						>
							{bugs?.map((bug, idx) => {
								return (
									<option key={idx} value={bug.bug_id}>
										{bug.name}
									</option>
								);
							})}
						</select>
						<textarea
							name='description'
							placeholder='Description'
							onChange={handleInput}
							value={commentInfo.description}
							rows={4}
							cols={30}
							style={{ display: 'block' }}
						/>
						<button type='submit'>Update</button>
					</form>
					{updateCommentLoading && <h3>Loading...</h3>}
					{updateCommentSuccess && <p>Comment Updated</p>}
					{updateCommentErrors?.comment_id && (
						<p style={{ color: 'red' }}>{updateCommentErrors.comment_id}</p>
					)}
					{updateCommentErrors?.bug_id && (
						<p style={{ color: 'red' }}>{updateCommentErrors.bug_id}</p>
					)}
					{updateCommentErrors?.description && (
						<p style={{ color: 'red' }}>{updateCommentErrors.description}</p>
					)}
					{updateCommentErrors?.server && (
						<p style={{ color: 'red' }}>{updateCommentErrors.server}</p>
					)}
				</>
			) : (
				<p>Comment not found</p>
			)}
		</>
	);
}

export default UpdateComment;
