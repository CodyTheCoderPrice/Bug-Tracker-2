import UpdateName from "../features/account/UpdateName";
import UpdateEmail from "../features/account/UpdateEmail";
import UpdatePassword from "../features/account/UpdatePassword";
import DeleteAccount from "../features/account/DeleteAccount";
import CreateTestData from "@/features/account/CreateTestData";

function AccountPage() {
  return (
    <div className="bg-protected flex flex-1 flex-col overflow-auto">
      <div className="bg-color-foreground-dl m-10 flex-1 rounded">
        <UpdateName />
        <UpdateEmail />
        <UpdatePassword />
        <DeleteAccount />
        <CreateTestData />
      </div>
    </div>
  );
}

export default AccountPage;
