import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { updateEmail } from "./accountSlice";

type TEmailInfo = {
  email: string;
  pwd: string;
};

function UpdateEmail() {
  const dispatch = useAppDispatch();

  const [emailInfo, setEmailInfo] = useState<TEmailInfo>({
    email: "",
    pwd: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInfo({ ...emailInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateEmail(emailInfo));
  };

  const { isUpdateEmailLoading, hasUpdateEmailSucceeded, updateEmailErrors } =
    useAppSelector((state) => state.account);

  return (
    <div className="account-feature-container-mt">
      <h2 className="account-header">Change Email</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          value={emailInfo.email}
          className="account-input"
        />
        <input
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={emailInfo.pwd}
          className="account-input"
        />
        <button type="submit" className="account-button-update">
          Update Email
        </button>
      </form>
      {isUpdateEmailLoading && <h3>Loading...</h3>}
      {hasUpdateEmailSucceeded && <p>Email Updated</p>}
      {updateEmailErrors?.email && (
        <p style={{ color: "red" }}>{updateEmailErrors.email}</p>
      )}
      {updateEmailErrors?.pwd && (
        <p style={{ color: "red" }}>{updateEmailErrors.pwd}</p>
      )}
      {updateEmailErrors?.server && (
        <p style={{ color: "red" }}>{updateEmailErrors.server}</p>
      )}
    </div>
  );
}

export default UpdateEmail;
