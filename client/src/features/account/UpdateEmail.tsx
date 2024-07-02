import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { updateEmail } from "./accountSlice";
import InputField from "@/components/form/InputField";
import ErrorMessage from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/form/SubmitButton";

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

  const { account } = useAppSelector((state) => state.account);

  useEffect(() => {
    if (account !== null) {
      setEmailInfo({
        email: account.email,
        pwd: "",
      });
    }
  }, [account]);

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
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
          value={emailInfo.email}
          hasError={!!updateEmailErrors?.email}
          className="account-input account-mt"
        />
        <ErrorMessage message={updateEmailErrors?.email} />
        <InputField
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={emailInfo.pwd}
          hasError={!!updateEmailErrors?.pwd}
          className="account-input account-mt"
        />
        <ErrorMessage message={updateEmailErrors?.pwd} />
        <SubmitButton
          message="Update Email"
          isLoading={isUpdateEmailLoading}
          hasSucceeded={hasUpdateEmailSucceeded}
          hasErrors={updateEmailErrors !== null}
          className="account-button-update account-mt"
        />
      </form>
      <ErrorMessage message={updateEmailErrors?.server} />
    </div>
  );
}

export default UpdateEmail;
