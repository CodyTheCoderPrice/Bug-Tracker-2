import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { login } from "./authSlice";
import InputField from "@/components/form/InputField";
import ErrorMessage from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/form/SubmitButton";

type TLoginInfo = {
  email: string;
  pwd: string;
};

function Login() {
  const dispatch = useAppDispatch();

  const [loginInfo, setLoginInfo] = useState<TLoginInfo>({
    email: "",
    pwd: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(loginInfo));
  };

  const { isLoading, isLoggedIn, errors } = useAppSelector(
    (state) => state.auth,
  );

  return (
    <>
      <h1 className="onboarding-header">Sign In</h1>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="pt-6"
      >
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          value={loginInfo.email}
          autoComplete="off"
          hasError={!!errors?.email}
          className="onboarding-input"
        />
        <ErrorMessage message={errors?.email} />
        <InputField
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={loginInfo.pwd}
          hasError={!!errors?.pwd}
          className="onboarding-input"
        />
        <ErrorMessage message={errors?.pwd} />
        <SubmitButton
          message="LOGIN"
          isLoading={isLoading}
          hasSucceeded={isLoggedIn}
          hasErrors={errors !== null}
          className="onboarding-submit"
        />
      </form>
      <ErrorMessage message={errors?.server} />
    </>
  );
}

export default Login;
