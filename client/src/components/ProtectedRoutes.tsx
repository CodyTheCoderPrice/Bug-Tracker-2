import { useAppSelector } from "@/app/hooks";
import SideNavbar from "./nav/SideNavbar";
import TopBar from "@/components/nav/TopBar";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return isLoggedIn ? (
    <div className="flex h-full w-full">
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
