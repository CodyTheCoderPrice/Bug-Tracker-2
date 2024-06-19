import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { updateBug } from "./bugSlice";
import moment from "moment";

function UpdateBug() {
  const dispatch = useAppDispatch();

  const { bugs } = useAppSelector((state) => state.bugs);
  const { id } = useParams();

  const bug = bugs?.find((b) => {
    return b.bug_id === Number(id);
  });

  const [bugInfo, setBugInfo] = useState({
    bug_id: bug?.bug_id ? bug.bug_id : -1,
    project_id: bug?.project_id ? bug.project_id : -1,
    name: bug?.name ? bug.name : "",
    description: bug?.description ? bug.description : "",
    priority_id: bug?.priority_id ? bug.priority_id : 1,
    status_id: bug?.status_id ? bug.status_id : 1,
    due_date: bug?.due_date
      ? moment.utc(bug.due_date).format("YYYY-MM-DD")
      : "",
    complete_date: bug?.complete_date
      ? moment.utc(bug.complete_date).format("YYYY-MM-DD")
      : "",
  });

  const handleInput = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setBugInfo({ ...bugInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateBug(bugInfo));
  };

  const { projects } = useAppSelector((state) => state.projects);
  const { updateBugLoading, updateBugSuccess, updateBugErrors } =
    useAppSelector((state) => state.bugs);

  return (
    <>
      {bug ? (
        <>
          <h1>Update Bug</h1>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <select
              name="project_id"
              onChange={handleInput}
              defaultValue={bugInfo.project_id}
              style={{ display: "block" }}
            >
              {projects?.map((project, idx) => {
                return (
                  <option key={idx} value={project.project_id}>
                    {project.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Bug name"
              onChange={handleInput}
              value={bugInfo.name}
              style={{ display: "block", width: "227px" }}
            />
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleInput}
              value={bugInfo.description}
              rows={4}
              cols={30}
              style={{ display: "block" }}
            />
            <select
              name="priority_id"
              onChange={handleInput}
              defaultValue={bugInfo.priority_id}
              style={{ display: "block" }}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
            <select
              name="status_id"
              onChange={handleInput}
              defaultValue={bugInfo.status_id}
              style={{ display: "block" }}
            >
              <option value={1}>Open</option>
              <option value={2}>In Progress</option>
              <option value={3}>Testing</option>
              <option value={4}>Closed</option>
            </select>
            <input
              type="date"
              name="due_date"
              onChange={handleInput}
              value={bugInfo.due_date !== null ? bugInfo.due_date : ""}
              style={{ display: "block" }}
            />
            <input
              type="date"
              name="complete_date"
              onChange={handleInput}
              value={
                bugInfo.complete_date !== null ? bugInfo.complete_date : ""
              }
              style={{ display: "block" }}
            />
            <button type="submit">Update</button>
          </form>
          {updateBugLoading && <h3>Loading...</h3>}
          {updateBugSuccess && <p>Bug Updated</p>}
          {updateBugErrors?.bug_id && (
            <p style={{ color: "red" }}>{updateBugErrors.bug_id}</p>
          )}
          {updateBugErrors?.project_id && (
            <p style={{ color: "red" }}>{updateBugErrors.project_id}</p>
          )}
          {updateBugErrors?.name && (
            <p style={{ color: "red" }}>{updateBugErrors.name}</p>
          )}
          {updateBugErrors?.description && (
            <p style={{ color: "red" }}>{updateBugErrors.description}</p>
          )}
          {updateBugErrors?.priority_id && (
            <p style={{ color: "red" }}>{updateBugErrors.priority_id}</p>
          )}
          {updateBugErrors?.status_id && (
            <p style={{ color: "red" }}>{updateBugErrors.status_id}</p>
          )}
          {updateBugErrors?.due_date && (
            <p style={{ color: "red" }}>{updateBugErrors.due_date}</p>
          )}
          {updateBugErrors?.complete_date && (
            <p style={{ color: "red" }}>{updateBugErrors.complete_date}</p>
          )}
          {updateBugErrors?.server && (
            <p style={{ color: "red" }}>{updateBugErrors.server}</p>
          )}
        </>
      ) : (
        <p>Bug not found</p>
      )}
    </>
  );
}

export default UpdateBug;
