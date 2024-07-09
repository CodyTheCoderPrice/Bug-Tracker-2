import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBarModal from "../modal/SearchBarModal";
import {
  toggleSearchBarModal,
  toggleDarkMode,
  setHasTransition,
} from "@/features/system/systemSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SunIcon from "@/components/svg/SunIcon";
import AccountDropDown from "./AccountDropDown";

function TopBar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const getPageName = () => {
    switch (location.pathname) {
      case "/home":
        return "Home Dashboard";
      case "/projects":
        return "Projects";
      case "/bugs":
        return "Bugs";
      case "/account":
        return "Edit Account";
      default:
        return "Unknown";
    }
  };

  const { isSearchBarModalOpen, isDarkModeOn } = useAppSelector(
    (state) => state.system,
  );

  const [isAccountDropdownOpen, setIsAccountDropdownOpen] =
    useState<boolean>(false);

  const darkModeOnClick = () => {
    // Prevents transition when turning darkmode on/off
    dispatch(setHasTransition(false));
    dispatch(toggleDarkMode());
  };

  // Shared classNames
  const buttonShared = "mr-6 inline-block cursor-pointer";

  return (
    <>
      <nav className="bg-color-foreground-dl h-top-bar flex shrink-0 items-center shadow">
        <h1 className="ml-4 font-semibold">{getPageName()}</h1>
        <div className="ml-auto">
          <button
            onClick={() => dispatch(toggleSearchBarModal())}
            className={buttonShared + " w-[20px]"}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </button>
          <button
            onClick={darkModeOnClick}
            className={buttonShared + " w-[22px]"}
          >
            {isDarkModeOn ? (
              <SunIcon className="box-content inline-block align-[-5px]" />
            ) : (
              <FontAwesomeIcon icon={faMoon} size="lg" />
            )}
          </button>
          <button
            id="account-dropdown-button"
            onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
            className={buttonShared + " w-[20px]"}
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              size="lg"
              className="pointer-events-none"
            />
          </button>
        </div>
      </nav>
      {isAccountDropdownOpen && (
        <AccountDropDown setIsDropdownOpen={setIsAccountDropdownOpen} />
      )}
      {isSearchBarModalOpen && <SearchBarModal />}
    </>
  );
}

export default TopBar;
