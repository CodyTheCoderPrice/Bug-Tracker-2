import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { updateName } from "./accountSlice";

function UpdateName() {
  const dispatch = useAppDispatch();

  const [nameInfo, setNameInfo] = useState({ first_name: "", last_name: "" });

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
    <>
      <h2>Change Name</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="First name"
          onChange={handleInput}
          value={nameInfo.first_name}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last name"
          onChange={handleInput}
          value={nameInfo.last_name}
        />
        <button type="submit">Update Name</button>
      </form>
      {isUpdateNameLoading && <h3>Loading...</h3>}
      {hasUpdateNameSucceeded && <p>Name Updated</p>}
      {updateNameErrors?.first_name && (
        <p style={{ color: "red" }}>{updateNameErrors.first_name}</p>
      )}
      {updateNameErrors?.last_name && (
        <p style={{ color: "red" }}>{updateNameErrors.last_name}</p>
      )}
      {updateNameErrors?.server && (
        <p style={{ color: "red" }}>{updateNameErrors.server}</p>
      )}
    </>
  );
}

export default UpdateName;
