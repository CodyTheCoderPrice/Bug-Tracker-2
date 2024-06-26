import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { createComment } from "./commentSlice";

function CreateComment() {
  const dispatch = useAppDispatch();

  const { bugs } = useAppSelector((state) => state.bugs);

  const [commentInfo, setCommentInfo] = useState({
    bug_id: bugs && bugs.length > 0 ? bugs[0].bug_id : -1,
    description: "",
  });

  const handleInput = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setCommentInfo({ ...commentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createComment(commentInfo));
  };

  const {
    isCreateCommentLoading,
    hasCreateCommentSucceeded,
    createCommentErrors,
  } = useAppSelector((state) => state.comments);

  return (
    <>
      <h1>Create Comment</h1>
      {bugs?.length === 0 ? (
        <p>No bugs</p>
      ) : (
        <>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <select
              name="bug_id"
              onChange={handleInput}
              defaultValue={commentInfo.bug_id}
              style={{ display: "block" }}
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
              name="description"
              placeholder="Description"
              onChange={handleInput}
              value={commentInfo.description}
              rows={4}
              cols={30}
              style={{ display: "block" }}
            />
            <button type="submit">Create</button>
          </form>
          {isCreateCommentLoading && <h3>Loading...</h3>}
          {hasCreateCommentSucceeded && <p>Comment Created</p>}
          {createCommentErrors?.bug_id && (
            <p style={{ color: "red" }}>{createCommentErrors.bug_id}</p>
          )}
          {createCommentErrors?.description && (
            <p style={{ color: "red" }}>{createCommentErrors.description}</p>
          )}
          {createCommentErrors?.server && (
            <p style={{ color: "red" }}>{createCommentErrors.server}</p>
          )}
        </>
      )}
    </>
  );
}

export default CreateComment;
