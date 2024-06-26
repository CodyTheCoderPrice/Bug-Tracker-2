import { useAppSelector } from "@/app/hooks";
import { Route, Routes } from "react-router-dom";
import CreateBug from "@/features/bugs/CreateBug";
import BugList from "@/features/bugs/BugList";
import UpdateBug from "@/features/bugs/UpdateBug";

function BugPage() {
  const { account } = useAppSelector((state) => state.account);
  const { isLoading } = useAppSelector((state) => state.auth);
  return (
    <div>
      {account ? (
        <Routes>
          <Route
            index
            element={
              <>
                <CreateBug />
                <BugList />
              </>
            }
          />
          <Route path="new" element={<CreateBug />} />
          <Route path="list" element={<BugList />} />
          <Route path=":id" element={<UpdateBug />} />
        </Routes>
      ) : isLoading ? (
        <h3>Loading</h3>
      ) : (
        <p>Must be logged in</p>
      )}
    </div>
  );
}

export default BugPage;
