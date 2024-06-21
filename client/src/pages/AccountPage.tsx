import { useAppSelector } from "@/app/hooks";
import AccountInfo from "@/features/account/AccountInfo";
import UpdateName from "../features/account/UpdateName";
import UpdateEmail from "../features/account/UpdateEmail";
import UpdatePassword from "../features/account/UpdatePassword";
import DeleteAccount from "../features/account/DeleteAccount";
import Logout from "@/features/auth/Logout";
import CreateTestData from "@/features/account/CreateTestData";

function AccountPage() {
  const { account } = useAppSelector((state) => state.account);

  return (
    <>
      {account && (
        <>
          <AccountInfo />
          <UpdateName />
          <UpdateEmail />
          <UpdatePassword />
          <DeleteAccount />
          <CreateTestData />
          <Logout />
        </>
      )}
    </>
  );
}

export default AccountPage;
