import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { updatePassword } from "./accountSlice";

type TPwdInfo = {
  pwd: string;
  newPwd: string;
  confirmPwd: string;
};

function UpdatePassword() {
  const dispatch = useAppDispatch();

  const [pwdInfo, setPwdInfo] = useState<TPwdInfo>({
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
    <div className="account-feature-container-mt">
      <h2 className="account-header">Change Password</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="password"
          name="pwd"
          placeholder="Current password"
          onChange={handleInput}
          value={pwdInfo.pwd}
          className="account-input"
        />
        <input
          type="password"
          name="newPwd"
          placeholder="New password"
          onChange={handleInput}
          value={pwdInfo.newPwd}
          className="account-input"
        />
        <input
          type="password"
          name="confirmPwd"
          placeholder="Confirm new password"
          onChange={handleInput}
          value={pwdInfo.confirmPwd}
          className="account-input"
        />
        <button type="submit" className="account-button-update">
          Update Password
        </button>
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
    </div>
  );
}

export default UpdatePassword;
