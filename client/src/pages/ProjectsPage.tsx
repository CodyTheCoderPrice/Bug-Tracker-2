import { useAppSelector } from "@/app/hooks";
import { Route, Routes } from "react-router-dom";
import CreateProject from "@/features/projects/CreateProject";
import ProjectList from "@/features/projects/ProjectList";
import UpdateProject from "@/features/projects/UpdateProject";

function ProjectsPage() {
  const { account } = useAppSelector((state) => state.account);
  const { isLoading } = useAppSelector((state) => state.auth);
  return (
    <>
      {account ? (
        <Routes>
          <Route
            index
            element={
              <>
                <CreateProject />
                <ProjectList />
              </>
            }
          />
          <Route path="new" element={<CreateProject />} />
          <Route path="list" element={<ProjectList />} />
          <Route path=":id" element={<UpdateProject />} />
        </Routes>
      ) : isLoading ? (
        <h3>Loading</h3>
      ) : (
        <p>Must be logged in</p>
      )}
    </>
  );
}

export default ProjectsPage;
