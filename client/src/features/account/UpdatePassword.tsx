import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { updatePassword } from "./accountSlice";
import ErrorMessage from "@/components/form/ErrorMessage";

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
          className="account-input account-mt"
        />
        <ErrorMessage message={updatePasswordErrors?.pwd} />
        <input
          type="password"
          name="newPwd"
          placeholder="New password"
          onChange={handleInput}
          value={pwdInfo.newPwd}
          className="account-input account-mt"
        />
        <ErrorMessage message={updatePasswordErrors?.newPwd} />
        <input
          type="password"
          name="confirmPwd"
          placeholder="Confirm new password"
          onChange={handleInput}
          value={pwdInfo.confirmPwd}
          className="account-input account-mt"
        />
        <ErrorMessage message={updatePasswordErrors?.confirmPwd} />
        <button type="submit" className="account-button-update">
          Update Password
        </button>
      </form>
      <ErrorMessage message={updatePasswordErrors?.server} />
      {isUpdatePasswordLoading && <h3>Loading...</h3>}
      {hasUpdatePasswordSucceeded && <p>Password Updated</p>}
    </div>
  );
}

export default UpdatePassword;
