import Login from "@/features/auth/Login";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="h-full bg-blueGeoBg">
      <Login />
      <Link to="/register" className="block py-[20px]">
        Create an account
      </Link>
    </div>
  );
}

export default LoginPage;
