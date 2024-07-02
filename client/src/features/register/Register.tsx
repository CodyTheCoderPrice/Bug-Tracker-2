import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "./registerSlice";
import InputField from "@/components/form/InputField";
import ErrorMessage from "@/components/form/ErrorMessage";

type TRegisterInfo = {
  first_name: string;
  last_name: string;
  email: string;
  pwd: string;
};

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState<TRegisterInfo>({
    first_name: "",
    last_name: "",
    email: "",
    pwd: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(registerInfo));
  };

  const { hasSucceeded, errors } = useAppSelector((state) => state.register);

  useEffect(() => {
    if (hasSucceeded) {
      navigate("/login");
    }
  }, [hasSucceeded, navigate]);

  return (
    <>
      <h1 className="onboarding-header">Register</h1>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="pt-6"
      >
        <div className="float-left">
          <InputField
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={handleInput}
            value={registerInfo.first_name}
            hasError={!!errors?.first_name}
            className="onboarding-input"
          />
          <ErrorMessage message={errors?.first_name} />
        </div>
        <div className="float-right">
          <InputField
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={handleInput}
            value={registerInfo.last_name}
            hasError={!!errors?.last_name}
            className="onboarding-input"
          />
          <ErrorMessage message={errors?.last_name} />
        </div>
        <div className="clear-both" />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          autoComplete="off"
          value={registerInfo.email}
          hasError={!!errors?.email}
          className="onboarding-input"
        />
        <ErrorMessage message={errors?.email} />
        <InputField
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={registerInfo.pwd}
          hasError={!!errors?.pwd}
          className="onboarding-input"
        />
        <ErrorMessage message={errors?.pwd} />
        <button type="submit" className="onboarding-submit">
          SIGN UP
        </button>
      </form>
      <ErrorMessage message={errors?.server} />
    </>
  );
}

export default Register;
