import { useAppDispatch, useAppSelector } from "@/app/hooks";
import SideNavbar from "@/components/nav/SideNavbar";
import TopBar from "@/components/nav/TopBar";
import { setHasTransition } from "@/features/system/systemSlice";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { hasTransition } = useAppSelector((state) => state.system);

  const [count, setCount] = useState<number>(0);

  // Re-enables transitions after waiting one cycle so they won't activate when
  // ...tuning darkmode on/off
  useEffect(() => {
    if (!hasTransition) {
      setCount(1);
    }
  }, [hasTransition]);
  useEffect(() => {
    if (count > 0 && count < 2) {
      setCount(count + 1);
    } else if (count > 0 && !hasTransition) {
      dispatch(setHasTransition(true));
    }
  }, [count]);

  return isLoggedIn ? (
    <div className="flex h-full w-full bg-plain-light-400 text-black dark:bg-plain-dark-500 dark:text-plain-light-100">
      <SideNavbar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoutes;
