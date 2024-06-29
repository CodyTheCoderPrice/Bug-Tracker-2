import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { deleteAccount } from "./accountSlice";
import ErrorMessage from "@/components/form/ErrorMessage";

type TDeleteInfo = {
  pwd: string;
  confirmDelete: string;
};

function DeleteAccount() {
  const dispatch = useAppDispatch();

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

  const { isDeleteAccountLoading, deleteAccountErrors } = useAppSelector(
    (state) => state.account,
  );

  const isDisabled = deleteInfo.confirmDelete !== "DELETE";

  return (
    <div>
      <h2 className="account-header">Delete Account</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="password"
          name="pwd"
          placeholder="Password"
          onChange={handleInput}
          value={deleteInfo.pwd}
          className="account-input account-mt"
        />
        <ErrorMessage message={deleteAccountErrors?.pwd} />
        <p className="account-mt text-sm">To confirm this, type "DELETE"</p>
        <input
          type="text"
          name="confirmDelete"
          placeholder="DELETE"
          onChange={handleInput}
          value={deleteInfo.confirmDelete}
          className="account-input mt-1"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className={
            "account-button" +
            (isDisabled
              ? " bg-gray-400 opacity-50 dark:bg-gray-700"
              : " bg-red-700")
          }
        >
          Delete Account
        </button>
      </form>
      <ErrorMessage message={deleteAccountErrors?.server} />
      {isDeleteAccountLoading && <h3>Loading...</h3>}
    </div>
  );
}

export default DeleteAccount;
