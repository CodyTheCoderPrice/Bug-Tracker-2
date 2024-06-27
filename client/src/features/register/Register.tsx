import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { register } from "./registerSlice";
import Header from "@/components/onboarding/Header";
import InputField from "@/components/onboarding/InputField";
import ErrorMessage from "@/components/onboarding/ErrorMessage";
import SubmitButton from "@/components/onboarding/SubmitButton";

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
  }, [hasSucceeded]);

  return (
    <>
      <Header text="Register" />
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
          />
          <ErrorMessage message={errors?.last_name} />
        </div>
        <div className="clear-both" />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          value={registerInfo.email}
          autoComplete="off"
          hasError={!!errors?.email}
        />
        <ErrorMessage message={errors?.email} />
        <InputField
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={registerInfo.pwd}
          hasError={!!errors?.pwd}
        />
        <ErrorMessage message={errors?.pwd} />
        <SubmitButton text="SIGN UP" />
      </form>
      <ErrorMessage message={errors?.server} />
    </>
  );
}

export default Register;
