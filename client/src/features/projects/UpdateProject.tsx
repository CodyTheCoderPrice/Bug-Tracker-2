import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { updateProject } from './projectSlice';

function UpdateProject() {
	const dispatch = useAppDispatch();

	const { projects } = useAppSelector((state) => state.projects);
	const { id } = useParams();

	const project = projects?.find((p) => {
		return p.project_id === Number(id);
	});

	const [projectInfo, setProjectInfo] = useState({
		project_id: Number(id),
		name: project?.name ? project.name : '',
		description: project?.description ? project.description : '',
	});

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateProject(projectInfo));
	};

	const { updateProjectLoading, updateProjectSuccess, updateProjectErrors } =
		useAppSelector((state) => state.projects);

	return (
		<>
			{project ? (
				<>
					<h1>Update Project</h1>
					<form noValidate autoComplete='off' onSubmit={handleSubmit}>
						<input
							type='text'
							name='name'
							placeholder='Project name'
							onChange={handleInput}
							value={projectInfo.name}
							style={{ display: 'block', width: '227px' }}
						/>
						<textarea
							name='description'
							placeholder='Description'
							onChange={handleInput}
							value={projectInfo.description}
							rows={4}
							cols={30}
							style={{ display: 'block' }}
						/>
						<button type='submit'>Update</button>
					</form>
					{updateProjectLoading && <h3>Loading...</h3>}
					{updateProjectSuccess && <p>Project Updated</p>}
					{updateProjectErrors?.project_id && (
						<p style={{ color: 'red' }}>{updateProjectErrors.project_id}</p>
					)}
					{updateProjectErrors?.name && (
						<p style={{ color: 'red' }}>{updateProjectErrors.name}</p>
					)}
					{updateProjectErrors?.description && (
						<p style={{ color: 'red' }}>{updateProjectErrors.description}</p>
					)}
					{updateProjectErrors?.server && (
						<p style={{ color: 'red' }}>{updateProjectErrors.server}</p>
					)}
				</>
			) : (
				<p>Project not found</p>
			)}
		</>
	);
}

export default UpdateProject;
