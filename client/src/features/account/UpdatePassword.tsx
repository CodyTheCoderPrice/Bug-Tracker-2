import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { updatePassword } from "./accountSlice";
import InputField from "@/components/form/InputField";
import ErrorMessage from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/form/SubmitButton";

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
        <InputField
          type="password"
          name="pwd"
          placeholder="Current password"
          onChange={handleInput}
          value={pwdInfo.pwd}
          hasError={!!updatePasswordErrors?.pwd}
          className="account-input account-mt"
        />
        <ErrorMessage message={updatePasswordErrors?.pwd} />
        <InputField
          type="password"
          name="newPwd"
          placeholder="New password"
          onChange={handleInput}
          value={pwdInfo.newPwd}
          hasError={!!updatePasswordErrors?.newPwd}
          className="account-input account-mt"
        />
        <ErrorMessage message={updatePasswordErrors?.newPwd} />
        <InputField
          type="password"
          name="confirmPwd"
          placeholder="Confirm new password"
          onChange={handleInput}
          value={pwdInfo.confirmPwd}
          hasError={!!updatePasswordErrors?.confirmPwd}
          className="account-input account-mt"
        />
        <ErrorMessage message={updatePasswordErrors?.confirmPwd} />
        <SubmitButton
          message="Update Password"
          isLoading={isUpdatePasswordLoading}
          hasSucceeded={hasUpdatePasswordSucceeded}
          hasErrors={updatePasswordErrors !== null}
          className="account-button-update account-mt"
        />
      </form>
      <ErrorMessage message={updatePasswordErrors?.server} />
    </div>
  );
}

export default UpdatePassword;
