import { useAppSelector } from "@/app/hooks";
import { Route, Routes } from "react-router-dom";
import ProjectList from "@/features/projects/ProjectList";
import UpdateProject from "@/features/projects/UpdateProject";
import CreateProjectModal from "@/features/projects/CreateProjectModal";

function ProjectsPage() {
  const { isCreateProjectModalOpen } = useAppSelector((state) => state.system);

  return (
    <>
      <Routes>
        <Route index element={<ProjectList />} />
        <Route path=":id" element={<UpdateProject />} />
      </Routes>
      {isCreateProjectModalOpen && <CreateProjectModal />}
    </>
  );
}

export default ProjectsPage;
