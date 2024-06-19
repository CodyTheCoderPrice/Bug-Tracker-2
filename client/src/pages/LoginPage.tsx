import { useAppDispatch } from "@/app/hooks";
import { clearAuthErrors } from "@/features/auth/authSlice";
import { useEffect } from "react";
import Intro from "@/components/onboarding/Intro";
import Login from "@/features/auth/Login";
import Divider from "@/components/onboarding/Divider";
import LinkButton from "@/components/onboarding/LinkButton";

function LoginPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearAuthErrors());
    };
  }, []);

  return (
    <div className="flex h-full">
      <Intro />
      <div className="bg-plain-100 w-[600px] p-12 shadow-md">
        <Login />
        <Divider text="OR" />
        <LinkButton to="/register" text="SIGN UP" />
      </div>
    </div>
  );
}

export default LoginPage;
