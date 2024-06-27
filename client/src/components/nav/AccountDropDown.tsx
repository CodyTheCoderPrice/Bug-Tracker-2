import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";
import moment from "moment";
import { Dispatch } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";

type TProps = {
  setIsDropdownOpen: Dispatch<React.SetStateAction<boolean>>;
};

function AccountDropDown(props: TProps) {
  const dispatch = useAppDispatch();

  const { account } = useAppSelector((state) => state.account);

  const outsideOnClick = (e: globalThis.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id !== "account-dropdown-button") {
      props.setIsDropdownOpen(false);
    }
  };

  // Shared classNames
  const spanShared = " pr-20 ";
  const smallSpanShared = spanShared + " mt-[1px] text-sm ";
  const buttonShared =
    " hover:text-blue-700 dark:hover:text-secondary-200 text-sm ";

  return (
    <OutsideClickHandler onOutsideClick={(e) => outsideOnClick(e)}>
      <div className="absolute right-[10px] top-[65px] flex h-[200px] flex-col rounded-lg bg-plain-light-100 p-5 shadow dark:bg-plain-dark-300">
        <span
          className={spanShared + "text-xl"}
        >{`${account?.first_name} ${account?.last_name}`}</span>
        <span className={smallSpanShared}>{account?.email}</span>
        <span
          className={
            smallSpanShared + "text-gray-500 dark:text-plain-light-500"
          }
        >{`Joined ${moment(account?.create_time).format("MM-DD-YYYY")}`}</span>
        <div className="mt-auto">
          <Link
            to="/account"
            onClick={() => props.setIsDropdownOpen(false)}
            className={buttonShared}
          >
            Edit Account
          </Link>
          <div className="my-2 border-t-[1px] border-gray-400 dark:border-gray-500" />
          <button onClick={() => dispatch(logout())} className={buttonShared}>
            Logout
          </button>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default AccountDropDown;
