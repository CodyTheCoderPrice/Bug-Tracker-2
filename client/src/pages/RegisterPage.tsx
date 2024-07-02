import { useAppDispatch } from "@/app/hooks";
import { clearRegisterErrors } from "@/features/register/registerSlice";
import { useEffect } from "react";
import Intro from "@/components/onboarding/Intro";
import Register from "@/features/register/Register";
import Divider from "@/components/onboarding/Divider";
import { Link } from "react-router-dom";

function RegisterPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearRegisterErrors());
    };
  }, []);

  return (
    <div className="flex h-full">
      <Intro />
      <div className="w-[600px] bg-plain-light-100 p-12 shadow-md">
        <Register />
        <Divider />
        <Link to="/login" className="onboarding-link">
          Already a member? LOGIN
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
