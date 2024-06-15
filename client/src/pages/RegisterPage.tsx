import { useAppDispatch } from "@/app/hooks";
import { clearRegisterErrors } from "@/features/register/registerSlice";
import { useEffect } from "react";
import Intro from "@/components/onboarding/Intro";
import Register from "@/features/register/Register";
import Divider from "@/components/onboarding/Divider";
import LinkButton from "@/components/onboarding/LinkButton";

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
      <div className="w-[600px] p-12 shadow-md">
        <Register />
        <Divider text="OR" />
        <LinkButton to="/login" text="Already a member? LOGIN" />
      </div>
    </div>
  );
}

export default RegisterPage;
