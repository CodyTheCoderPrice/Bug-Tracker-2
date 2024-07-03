import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { createProject } from "./projectSlice";

type TProjectInfo = {
  name: string;
  description: string;
};

function CreateProject() {
  const dispatch = useAppDispatch();

  const {
    isCreateProjectLoading,
    hasCreateProjectSucceeded,
    createProjectErrors,
  } = useAppSelector((state) => state.projects);

  const [projectInfo, setProjectInfo] = useState<TProjectInfo>({
    name: "",
    description: "",
  });

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createProject(projectInfo));
  };

  return (
    <>
      <h1>Create Project</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Project name"
          onChange={handleInput}
          value={projectInfo.name}
          style={{ display: "block", width: "227px" }}
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleInput}
          value={projectInfo.description}
          rows={4}
          cols={30}
          style={{ display: "block" }}
        />
        <button type="submit">Create</button>
      </form>
      {isCreateProjectLoading && <h3>Loading...</h3>}
      {hasCreateProjectSucceeded && <p>Project Created</p>}
      {createProjectErrors?.name && (
        <p style={{ color: "red" }}>{createProjectErrors.name}</p>
      )}
      {createProjectErrors?.description && (
        <p style={{ color: "red" }}>{createProjectErrors.description}</p>
      )}
      {createProjectErrors?.server && (
        <p style={{ color: "red" }}>{createProjectErrors.server}</p>
      )}
    </>
  );
}

export default CreateProject;
