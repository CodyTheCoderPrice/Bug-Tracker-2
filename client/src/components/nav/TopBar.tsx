import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faUser } from "@fortawesome/free-solid-svg-icons";

function TopBar() {
  return (
    <nav className="flex h-[40px] items-center bg-gray-100">
      <div>
        <SearchBar />
      </div>
      <div className="ml-auto">
        <span className="mr-4 rounded-full border-2 border-black p-1">
          <FontAwesomeIcon icon={faMoon} size="lg" />
        </span>
        <Link
          to="/account"
          className="mr-4 rounded-full border-2 border-black p-1"
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Link>
      </div>
    </nav>
  );
}

export default TopBar;
