import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearAuthErrors } from "@/features/auth/authSlice";
import { setAccountDeletedToFalse } from "@/features/account/accountSlice";
import { useEffect } from "react";
import Intro from "@/components/onboarding/Intro";
import Login from "@/features/auth/Login";
import Divider from "@/components/onboarding/Divider";
import PopUpMessages from "@/components/onboarding/PopUpMessages";
import { Link } from "react-router-dom";

function LoginPage() {
  const dispatch = useAppDispatch();

  const { hasDeleteAccountSucceeded } = useAppSelector(
    (state) => state.account,
  );

  useEffect(() => {
    return () => {
      dispatch(clearAuthErrors());

      if (hasDeleteAccountSucceeded) {
        // Keeps account deleted popup from showing more than once
        dispatch(setAccountDeletedToFalse());
      }
    };
  }, [hasDeleteAccountSucceeded]);

  return (
    <div className="flex h-full">
      <Intro />
      <div className="w-[600px] bg-plain-light-100 p-12 shadow-md">
        <PopUpMessages />
        <Login />
        <Divider />
        <Link to="/register" className="onboarding-link">
          SIGN UP
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
