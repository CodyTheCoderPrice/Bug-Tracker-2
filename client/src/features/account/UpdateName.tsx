import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { setAccountNameUpdatedToFalse, updateName } from "./accountSlice";
import InputField from "@/components/form/InputField";
import ErrorMessage from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/form/SubmitButton";

type TNameInfo = {
  first_name: string;
  last_name: string;
};

function UpdateName() {
  const dispatch = useAppDispatch();

  const { account } = useAppSelector((state) => state.account);
  const { isUpdateNameLoading, hasUpdateNameSucceeded, updateNameErrors } =
    useAppSelector((state) => state.account);

  const [nameInfo, setNameInfo] = useState<TNameInfo>({
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    if (account !== null) {
      setNameInfo({
        first_name: account.first_name,
        last_name: account.last_name,
      });
    }
  }, [account]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hasUpdateNameSucceeded) {
      dispatch(setAccountNameUpdatedToFalse());
    }
    setNameInfo({ ...nameInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateName(nameInfo));
  };

  return (
    <div>
      <h2 className="account-header">Change Name</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="first_name"
          placeholder="First name"
          onChange={handleInput}
          value={nameInfo.first_name}
          hasError={!!updateNameErrors?.first_name}
          className="account-input account-mt"
        />
        <ErrorMessage message={updateNameErrors?.first_name} />
        <InputField
          type="text"
          name="last_name"
          placeholder="Last name"
          onChange={handleInput}
          value={nameInfo.last_name}
          hasError={!!updateNameErrors?.last_name}
          className="account-input account-mt"
        />
        <ErrorMessage message={updateNameErrors?.last_name} />
        <SubmitButton
          message="Update Name"
          isLoading={isUpdateNameLoading}
          hasSucceeded={hasUpdateNameSucceeded}
          hasErrors={updateNameErrors !== null}
          className="account-button-update account-mt"
        />
      </form>
      <ErrorMessage message={updateNameErrors?.server} />
    </div>
  );
}

export default UpdateName;
