import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { updatePassword } from "./accountSlice";

function UpdatePassword() {
  const dispatch = useAppDispatch();

  const [pwdInfo, setPwdInfo] = useState({
    pwd: "",
    newPwd: "",
    confirmPwd: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdInfo({ ...pwdInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePassword(pwdInfo));
  };

  const {
    isUpdatePasswordLoading,
    hasUpdatePasswordSucceeded,
    updatePasswordErrors,
  } = useAppSelector((state) => state.account);

  return (
    <>
      <h2>Change Password</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="password"
          name="pwd"
          placeholder="Current password"
          onChange={handleInput}
          value={pwdInfo.pwd}
        />
        <input
          type="password"
          name="newPwd"
          placeholder="New password"
          onChange={handleInput}
          value={pwdInfo.newPwd}
        />
        <input
          type="password"
          name="confirmPwd"
          placeholder="Confirm new password"
          onChange={handleInput}
          value={pwdInfo.confirmPwd}
        />
        <button type="submit">Update Password</button>
      </form>
      {isUpdatePasswordLoading && <h3>Loading...</h3>}
      {hasUpdatePasswordSucceeded && <p>Password Updated</p>}
      {updatePasswordErrors?.pwd && (
        <p style={{ color: "red" }}>{updatePasswordErrors.pwd}</p>
      )}
      {updatePasswordErrors?.newPwd && (
        <p style={{ color: "red" }}>{updatePasswordErrors.newPwd}</p>
      )}
      {updatePasswordErrors?.confirmPwd && (
        <p style={{ color: "red" }}>{updatePasswordErrors.confirmPwd}</p>
      )}
      {updatePasswordErrors?.server && (
        <p style={{ color: "red" }}>{updatePasswordErrors.server}</p>
      )}
    </>
  );
}

export default UpdatePassword;
