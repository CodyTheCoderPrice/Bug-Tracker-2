import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { deleteAccount } from "./accountSlice";
import InputField from "@/components/form/InputField";
import ErrorMessage from "@/components/form/ErrorMessage";
import SubmitButton from "@/components/form/SubmitButton";

type TDeleteInfo = {
  pwd: string;
  confirmDelete: string;
};

function DeleteAccount() {
  const dispatch = useAppDispatch();

  const { hasTransition } = useAppSelector((state) => state.system);
  const {
    isDeleteAccountLoading,
    deleteAccountErrors,
    hasDeleteAccountSucceeded,
  } = useAppSelector((state) => state.account);

  const [deleteInfo, setDeleteInfo] = useState<TDeleteInfo>({
    pwd: "",
    confirmDelete: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteInfo({ ...deleteInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteAccount(deleteInfo));
  };

  const isDisabled = deleteInfo.confirmDelete !== "DELETE";

  return (
    <div>
      <h2 className="account-header">Delete Account</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <InputField
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={deleteInfo.pwd}
          hasError={!!deleteAccountErrors?.pwd}
          className="account-input account-mt"
        />
        <ErrorMessage message={deleteAccountErrors?.pwd} />
        <p className="account-mt text-sm">To confirm this, type "DELETE"</p>
        <InputField
          type="text"
          name="confirmDelete"
          placeholder="DELETE"
          onChange={handleInput}
          value={deleteInfo.confirmDelete}
          hasError={false}
          className="account-input mt-1"
        />
        <SubmitButton
          message="Delete Account"
          isLoading={isDeleteAccountLoading}
          hasSucceeded={hasDeleteAccountSucceeded}
          hasErrors={deleteAccountErrors !== null}
          isDisable={isDisabled}
          className={
            "account-mt" +
            (hasTransition ? " transition-colors" : "") +
            (isDisabled ? " account-button-disabled" : " account-button-delete")
          }
        />
      </form>
      <ErrorMessage message={deleteAccountErrors?.server} />
    </div>
  );
}

export default DeleteAccount;
