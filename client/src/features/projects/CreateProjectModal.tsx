import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { clearProjectErrors, createProject } from "./projectSlice";
import BlurredBackdrop from "@/components/modal/BlurredBackdrop";
import SidePanelModal from "@/components/modal/SidePanelModal";
import { toggleCreateProjectModal } from "../system/systemSlice";
import ProjectIcon from "@/components/svg/ProjectIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "@/components/form/ErrorMessage";
import InputField from "@/components/form/InputField";
import TextAreaField from "@/components/form/TextAreaField";
import SubmitButton from "@/components/form/SubmitButton";

type TProjectInfo = {
  name: string;
  description: string;
};

function CreateProjectModal() {
  const dispatch = useAppDispatch();

  const {
    isCreateProjectLoading,
    hasCreateProjectSucceeded,
    createProjectErrors,
  } = useAppSelector((state) => state.projects);
  const { hasTransition } = useAppSelector((state) => state.system);

  const [projectInfo, setProjectInfo] = useState<TProjectInfo>({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(clearProjectErrors());
  }, []);

  const closeModalOnClick = () => {
    dispatch(toggleCreateProjectModal());
  };

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
      <BlurredBackdrop />
      <SidePanelModal>
        <button onClick={closeModalOnClick} className="modal-close-button">
          <FontAwesomeIcon icon={faX} />
        </button>
        <ProjectIcon className="modal-icon" />
        <h2 className="modal-header">New Project</h2>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="modal-form"
        >
          <InputField
            type="text"
            name="name"
            placeholder="Project name"
            onChange={handleInput}
            value={projectInfo.name}
            hasError={!!createProjectErrors?.name}
            className="modal-input modal-mt"
          />
          <ErrorMessage message={createProjectErrors?.name} />
          <TextAreaField
            name="description"
            placeholder="Description"
            onChange={handleInput}
            value={projectInfo.description}
            rows={4}
            cols={30}
            hasError={!!createProjectErrors?.description}
            className="modal-text-area modal-mt"
          />
          <ErrorMessage message={createProjectErrors?.description} />
          <div className="modal-mt flex">
            <button onClick={closeModalOnClick} className="modal-button-cancel">
              Cancel
            </button>
            <SubmitButton
              message="Create"
              isLoading={isCreateProjectLoading}
              hasSucceeded={hasCreateProjectSucceeded}
              hasErrors={createProjectErrors !== null}
              className={
                "modal-button-submit" +
                (hasTransition ? " transition-colors" : "")
              }
            />
          </div>
        </form>
        <ErrorMessage message={createProjectErrors?.server} />
      </SidePanelModal>
    </>
  );
}

export default CreateProjectModal;
