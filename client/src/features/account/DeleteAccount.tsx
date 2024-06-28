import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { deleteAccount } from "./accountSlice";

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
          className="account-input"
        />
        <input
          type="text"
          name="confirmDelete"
          placeholder="DELETE"
          onChange={handleInput}
          value={deleteInfo.confirmDelete}
          className="account-input"
        />
        <button
          type="submit"
          disabled={deleteInfo.confirmDelete !== "DELETE"}
          className="account-button-delete"
        >
          Delete
        </button>
      </form>
      {isDeleteAccountLoading && <h3>Loading...</h3>}
      {deleteAccountErrors?.pwd && (
        <p style={{ color: "red" }}>{deleteAccountErrors.pwd}</p>
      )}
      {deleteAccountErrors?.server && (
        <p style={{ color: "red" }}>{deleteAccountErrors.server}</p>
      )}
    </div>
  );
}

export default DeleteAccount;
