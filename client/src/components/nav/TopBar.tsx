import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { toggleSearchBar, toggleDarkMode } from "@/features/system/systemSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser } from "@fortawesome/free-regular-svg-icons";

function TopBar() {
  const dispatch = useAppDispatch();

  const { searchBar } = useAppSelector((state) => state.system);
  return (
    <>
      {searchBar && <SearchBar />}
      <nav className="flex h-[40px] items-center bg-gray-100">
        <div>
          <span
            onClick={() => {
              dispatch(toggleSearchBar());
            }}
            className="ml-5 h-full w-[100px] cursor-pointer rounded-xl border border-black px-10 py-1"
          >
            Search Bar
          </span>
        </div>
        <div className="ml-auto">
          <span
            onClick={() => {
              dispatch(toggleDarkMode());
            }}
            className="mr-6 cursor-pointer"
          >
            <FontAwesomeIcon icon={faMoon} size="lg" />
          </span>
          <Link to="/account" className="mr-6">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default TopBar;
