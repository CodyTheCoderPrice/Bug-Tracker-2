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

  // Shared className
  const containerShared = " flex flex-1 flex-col my-8 px-6 ";

  return (
    <div className="bg-protected flex flex-1 flex-col overflow-auto">
      <div className="bg-color-foreground-dl m-10 flex min-w-[300px] flex-1 rounded">
        <div className={containerShared}>
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
          <div
            className={
              containerShared +
              " border-l-2 border-gray-300 dark:border-gray-700"
            }
          >
            <DeleteAccount />
            <CreateTestData />
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
