import { useAppSelector } from "@/app/hooks";
import { Route, Routes } from "react-router-dom";
import CreateComment from "@/features/comments/CreateComment";
import CommentList from "@/features/comments/CommentList";
import UpdateComment from "@/features/comments/UpdateComment";

function CommentsPage() {
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
                <CreateComment />
                <CommentList />
              </>
            }
          />
          <Route path="new" element={<CreateComment />} />
          <Route path="list" element={<CommentList />} />
          <Route path=":id" element={<UpdateComment />} />
        </Routes>
      ) : isLoading ? (
        <h3>Loading</h3>
      ) : (
        <p>Must be logged in</p>
      )}
    </>
  );
}

export default CommentsPage;
