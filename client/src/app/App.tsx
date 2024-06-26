import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { relogin } from "@/features/auth/authSlice";
import { Route, Routes } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import HomePage from "@/pages/HomePage";
import AccountPage from "@/pages/AccountPage";
import ProjectsPage from "@/pages/ProjectsPage";
import CommentsPage from "@/pages/CommentsPage";
import BugsPage from "@/pages/BugsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedRoutes from "@/components/routes/ProtectedRoutes";
import UnprotectedRoutes from "@/components/routes/UnprotectedRoutes";

function App() {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(relogin());
    }
  }, []);

  const { isDarkModeOn } = useAppSelector((state) => state.system);

  return (
    <div className={"h-full w-full" + (isDarkModeOn ? " dark" : "")}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<UnprotectedRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/account/*" element={<AccountPage />} />
          <Route path="/projects/*" element={<ProjectsPage />} />
          <Route path="/bugs/*" element={<BugsPage />} />
          <Route path="/comments/*" element={<CommentsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
