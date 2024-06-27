import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { login } from "./authSlice";
import Header from "@/components/onboarding/Header";
import InputField from "@/components/onboarding/InputField";
import ErrorMessage from "@/components/onboarding/ErrorMessage";
import SubmitButton from "@/components/onboarding/SubmitButton";

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

  const { errors } = useAppSelector((state) => state.auth);

  return (
    <>
      <Header text="Sign In" />
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
        />
        <ErrorMessage message={errors?.email} />
        <InputField
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={loginInfo.pwd}
          hasError={!!errors?.pwd}
        />
        <ErrorMessage message={errors?.pwd} />
        <SubmitButton text="LOGIN" />
      </form>
      <ErrorMessage message={errors?.server} />
    </>
  );
}

export default Login;
