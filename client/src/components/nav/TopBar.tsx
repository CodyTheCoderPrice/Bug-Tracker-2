import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { toggleSearchBar, toggleDarkMode } from "@/features/system/systemSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";

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
      <nav className="h-top-bar flex items-center bg-plain-1 shadow">
        <h1 className="ml-4 font-semibold">{getPageName()}</h1>
        <div className="ml-auto">
          <span
            onClick={() => {
              dispatch(toggleSearchBar());
            }}
            className="ml-5 mr-6 h-full w-[100px] cursor-pointer rounded border border-black bg-plain-2 px-10 py-1"
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
              <FontAwesomeIcon icon={faSun} size="lg" />
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
