import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { toggleSearchBar, toggleDarkMode } from "@/features/system/systemSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faCircleUser } from "@fortawesome/free-regular-svg-icons";
import sunIcon from "@/assets/icons/sun-custom.svg";

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

  const { searchBar, darkMode } = useAppSelector((state) => state.system);
  return (
    <>
      {searchBar && <SearchBar />}
      <nav className="bg-color-foreground-dl h-top-bar flex shrink-0 items-center shadow">
        <h1 className="ml-4 font-semibold">{getPageName()}</h1>
        <div className="ml-auto">
          <span
            onClick={() => {
              dispatch(toggleSearchBar());
            }}
            className="bg-plain-light-200 dark:bg-plain-dark-300 ml-5 mr-6 h-full w-[100px] cursor-pointer rounded border border-black px-10 py-1"
          >
            Search...
          </span>
          <span
            onClick={() => {
              dispatch(toggleDarkMode());
            }}
            className="mr-6 cursor-pointer"
          >
            {darkMode ? (
              <img src={sunIcon} alt="Sun Icon" className="inline-block w-5" />
            ) : (
              <FontAwesomeIcon icon={faMoon} size="lg" />
            )}
          </span>
          <Link to="/account" className="mr-6">
            <FontAwesomeIcon icon={faCircleUser} size="lg" />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default TopBar;
