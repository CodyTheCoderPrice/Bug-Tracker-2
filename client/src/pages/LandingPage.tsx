import { useAppSelector } from "@/app/hooks";
import { Navigate } from "react-router-dom";

function LandingPage() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return isLoggedIn ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default LandingPage;
