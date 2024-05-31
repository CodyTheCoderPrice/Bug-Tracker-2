import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useState } from 'react';
import { createProject } from './projectSlice';

function CreateProject() {
	const dispatch = useAppDispatch();

	const [projectInfo, setProjectInfo] = useState({
		name: '',
		description: '',
	});

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(createProject(projectInfo));
	};

	const { createProjectLoading, createProjectSuccess, createProjectErrors } =
		useAppSelector((state) => state.projects);

	return (
		<>
			<h1>Create Project</h1>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='Project name'
					onChange={handleInput}
					value={projectInfo.name}
					style={{ display: 'block' }}
				/>
				<textarea
					name='description'
					placeholder='Description'
					onChange={handleInput}
					value={projectInfo.description}
					rows={4}
					cols={50}
					style={{ display: 'block' }}
				/>
				<button type='submit'>Create</button>
				{createProjectLoading && <h3>Loading...</h3>}
				{createProjectSuccess && <p>Project Created</p>}
				{createProjectErrors?.name && (
					<p style={{ color: 'red' }}>{createProjectErrors.name}</p>
				)}
				{createProjectErrors?.description && (
					<p style={{ color: 'red' }}>{createProjectErrors.description}</p>
				)}
				{createProjectErrors?.server && (
					<p style={{ color: 'red' }}>{createProjectErrors.server}</p>
				)}
			</form>
		</>
	);
}

export default CreateProject;
