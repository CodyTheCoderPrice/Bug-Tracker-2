import { useAppSelector } from "@/app/hooks";
import SideNavbar from "./nav/SideNavbar";
import TopBar from "@/components/nav/TopBar";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return isLoggedIn ? (
    <div className="bg-plain-light-400 dark:bg-plain-dark-500 dark:text-plain-light-100 flex h-full w-full text-black">
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
