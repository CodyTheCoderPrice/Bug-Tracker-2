import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { updateName } from "./accountSlice";
import ErrorMessage from "@/components/form/ErrorMessage";

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInfo({ ...nameInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateName(nameInfo));
  };

  const { isUpdateNameLoading, hasUpdateNameSucceeded, updateNameErrors } =
    useAppSelector((state) => state.account);

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
          className="account-input account-mt"
        />
        <ErrorMessage message={updateNameErrors?.first_name} />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          onChange={handleInput}
          value={nameInfo.last_name}
          className="account-input account-mt"
        />
        <ErrorMessage message={updateNameErrors?.last_name} />
        <button type="submit" className="account-button-update">
          Update Name
        </button>
      </form>
      <ErrorMessage message={updateNameErrors?.server} />
      {isUpdateNameLoading && <h3>Loading...</h3>}
      {hasUpdateNameSucceeded && <p>Name Updated</p>}
    </div>
  );
}

export default UpdateName;
