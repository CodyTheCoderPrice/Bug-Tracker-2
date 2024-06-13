import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { login } from "./authSlice";

function Login() {
  const dispatch = useAppDispatch();

  const [loginInfo, setLoginInfo] = useState({
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
      <h1 className="text-3xl font-bold">Login</h1>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          value={loginInfo.email}
        />
        <input
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={loginInfo.pwd}
        />
        <button type="submit">LOGIN</button>
      </form>
      {errors?.email && <p className="text-red-500">{errors.email}</p>}
      {errors?.pwd && <p className="text-red-500">{errors.pwd}</p>}
      {errors?.server && <p className="text-red-500">{errors.server}</p>}
    </>
  );
}

export default Login;
