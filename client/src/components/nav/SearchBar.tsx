import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { toggleSearchBar } from "@/features/system/systemSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const dispatch = useAppDispatch();

  const categories = ["All", "Projects", "Bugs", "Comments"];
  const [category, setCategory] = useState(categories[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

  // CSS constants
  const barHeight = "h-10";

  return (
    <>
      {/* Blurred backdrop */}
      <div
        onClick={() => {
          dispatch(toggleSearchBar());
        }}
        className="absolute left-0 top-0 h-full w-full bg-black/60"
      />
      {/* Searchbar */}
      <div
        className="bg-color-foreground-dl dark:border-plain-dark-100 absolute left-1/2 top-2 h-[400px] w-[60%] translate-x-[-50%] rounded-xl border-2 border-black p-4"
        onClick={() => setDropdownOpen(false)}
      >
        <div className="flex">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
            className={`${barHeight} border-color-dl bg-plain-light-300 dark:bg-plain-dark-200 hover:bg-plain-light-400 hover:dark:bg-plain-dark-300 w-[150px] rounded-l-lg border`}
          >
            {category}
            <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
          </button>
          <div
            className={`${barHeight} border-color-dl flex flex-1 rounded-r-lg border border-l-0`}
          >
            <input
              type="text"
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchText(e.target.value)
              }
              value={searchText}
              className="bg-color-input-dl text-color-input-dl flex-1 px-2"
            />
            <button className="w-10 rounded-r-lg bg-primary-1 dark:bg-primary-2">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="lg"
                className="text-white"
              />
            </button>
          </div>
        </div>
        {dropdownOpen && (
          <div className="border-color-dl bg-plain-light-200 dark:bg-plain-dark-100 ml-[-10px] mt-2 w-[170px] rounded-lg border py-2">
            <ul>
              {categories.map((c, idx) => {
                return (
                  <li key={idx}>
                    <button
                      onClick={() => setCategory(c)}
                      className="w-full py-1 pl-3 text-left hover:bg-gray-200"
                    >
                      {c}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
