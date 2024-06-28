import { useAppSelector } from "@/app/hooks";
import useWindowSize from "@/hooks/useWindowSize";
import UpdateName from "../features/account/UpdateName";
import UpdateEmail from "../features/account/UpdateEmail";
import UpdatePassword from "../features/account/UpdatePassword";
import DeleteAccount from "../features/account/DeleteAccount";
import CreateTestData from "@/features/account/CreateTestData";

function AccountPage() {
  const { isNavbarExpanded } = useAppSelector((state) => state.system);
  const { width } = useWindowSize();
  const isWideScreen = width > (isNavbarExpanded ? 1275 : 1080);

  return (
    <div className="bg-protected flex flex-1 flex-col overflow-auto">
      <div className="bg-color-foreground-dl m-10 flex flex-1 rounded p-6">
        <div className="flex flex-1 flex-col">
          <UpdateName />
          <UpdateEmail />
          <UpdatePassword />
          {!isWideScreen && (
            <div className="account-feature-container-mt">
              <DeleteAccount />
              <CreateTestData />
            </div>
          )}
        </div>
        {isWideScreen && (
          <div className="flex-1">
            <DeleteAccount />
            <CreateTestData />
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
