import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { toggleSearchBarModal } from "@/features/system/systemSlice";
import OutsideClickHandler from "react-outside-click-handler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import BlurredBackdrop from "./BlurredBackdrop";

type TCategory = "All" | "Projects" | "Bugs" | "Comments";

function SearchBarModal() {
  const dispatch = useAppDispatch();

  const categories: TCategory[] = ["All", "Projects", "Bugs", "Comments"];
  const [category, setCategory] = useState<TCategory>(categories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>("");

  const outsideModalOnClick = () => {
    dispatch(toggleSearchBarModal());
  };

  const outsideDropdownOnClick = (e: globalThis.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.id !== "dropdown-button") {
      setIsDropdownOpen(false);
    }
  };

  const dropdownOnClick = (ctgy: TCategory) => {
    setCategory(ctgy);
    setIsDropdownOpen(false);
  };

  // Shared classNames
  const searchBarShared = " h-10 ";

  return (
    <>
      <BlurredBackdrop />
      <OutsideClickHandler onOutsideClick={() => outsideModalOnClick()}>
        <div className="bg-color-foreground-dl absolute left-1/2 top-2 z-10 h-[400px] w-[60%] translate-x-[-50%] rounded-xl p-6">
          <div className="flex">
            <button
              id="dropdown-button"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className={
                searchBarShared +
                "w-[150px] rounded-l-lg bg-plain-light-300 hover:bg-plain-light-400 dark:bg-plain-dark-200 hover:dark:bg-plain-dark-300"
              }
            >
              {category}
              <FontAwesomeIcon
                icon={faAngleDown}
                className="pointer-events-none ml-2"
              />
            </button>
            <div className={searchBarShared + "flex flex-1 rounded-r-lg"}>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchText(e.target.value)
                }
                value={searchText}
                className="border-color-dl bg-color-input-dl text-color-input-dl flex-1 border-2 px-2 focus:border-blue-500 focus:outline-none dark:focus:border-secondary-200"
              />
              <button className="w-10 rounded-r-lg bg-primary-200 dark:bg-primary-200">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="lg"
                  className="text-white"
                />
              </button>
            </div>
          </div>
          {isDropdownOpen && (
            <OutsideClickHandler
              onOutsideClick={(e) => outsideDropdownOnClick(e)}
            >
              <div className="border-color-dl absolute mt-1 w-[150px] rounded-lg border bg-plain-light-200 py-2 dark:bg-plain-dark-100">
                <ul>
                  {categories.map((ctgy, idx) => {
                    return (
                      <li key={idx}>
                        <button
                          onClick={() => dropdownOnClick(ctgy)}
                          className="w-full py-1 pl-3 text-left hover:bg-plain-light-300 dark:hover:bg-plain-dark-200"
                        >
                          {ctgy}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </OutsideClickHandler>
    </>
  );
}

export default SearchBarModal;
