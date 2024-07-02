import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";
import { updateName } from "./accountSlice";
import ErrorMessage from "@/components/form/ErrorMessage";
import LoadingButton from "@/components/form/LoadingButton";

type TNameInfo = {
  first_name: string;
  last_name: string;
};

function UpdateName() {
  const dispatch = useAppDispatch();

  const [nameInfo, setNameInfo] = useState<TNameInfo>({
    first_name: "",
    last_name: "",
  });

  const { account } = useAppSelector((state) => state.account);

  useEffect(() => {
    if (account !== null) {
      setNameInfo({
        first_name: account.first_name,
        last_name: account.last_name,
      });
    }
  }, [account]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInfo({ ...nameInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateName(nameInfo));
  };

  const { isUpdateNameLoading, hasUpdateNameSucceeded, updateNameErrors } =
    useAppSelector((state) => state.account);

  const inputErrorClassname = (hasError: boolean) => {
    return hasError
      ? " border-color-input-error-dl "
      : " border-color-input-dl ";
  };

  return (
    <div>
      <h2 className="account-header">Change Name</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          onChange={handleInput}
          value={nameInfo.first_name}
          className={
            "account-input account-mt" +
            inputErrorClassname(!!updateNameErrors?.first_name)
          }
        />
        <ErrorMessage message={updateNameErrors?.first_name} />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          onChange={handleInput}
          value={nameInfo.last_name}
          className={
            "account-input account-mt" +
            inputErrorClassname(!!updateNameErrors?.last_name)
          }
        />
        <ErrorMessage message={updateNameErrors?.last_name} />
        <LoadingButton
          message="Update Name"
          isLoading={isUpdateNameLoading}
          hasSucceeded={hasUpdateNameSucceeded}
          hasErrors={updateNameErrors !== null}
        />
      </form>
      <ErrorMessage message={updateNameErrors?.server} />
    </div>
  );
}

export default UpdateName;
