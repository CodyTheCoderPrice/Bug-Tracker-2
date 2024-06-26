import { useAppSelector } from "@/app/hooks";

function AccountInfo() {
  const { isLoading } = useAppSelector((state) => state.auth);
  const { account } = useAppSelector((state) => state.account);

  return (
    <>
      <h1>Account Info</h1>
      {isLoading && <h3>Loading...</h3>}
      {account ? (
        <>
          <p>{account.email}</p>
          <p>{`${account.first_name} ${account.last_name}`}</p>
          <p>{account.create_time.toString()}</p>
          <p>{account.update_time.toString()}</p>
        </>
      ) : (
        <p>No account info</p>
      )}
    </>
  );
}

export default AccountInfo;
