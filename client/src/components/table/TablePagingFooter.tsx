import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import OutsideClickHandler from "react-outside-click-handler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

type TProps = {
  rowsPerPage: number;
  setRowsPerPage: ActionCreatorWithPayload<
    10 | 25,
    "system/setHomeDueSoonRowsPerPage" | "system/setHomeOverdueRowsPerPage"
  >;
};

function TablePagingFooter(props: TProps) {
  const dispatch = useAppDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownOnClick = (rpp: 10 | 25) => {
    dispatch(props.setRowsPerPage(rpp));
    setDropdownOpen(false);
  };

  return (
    <div className="mt-auto flex h-[50px] bg-primary-200 text-xs text-white dark:bg-primary-300">
      <div className="ml-auto flex items-center">
        <span className="flex items-center">Rows per page</span>
        <OutsideClickHandler onOutsideClick={() => setDropdownOpen(false)}>
          <div className="relative">
            <button
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
              }}
              className="ml-2 h-[30px] w-[50px] rounded bg-primary-100 dark:bg-primary-200"
            >
              {props.rowsPerPage}
              <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
            </button>
            {dropdownOpen && (
              <div className="absolute top-0 ml-2 w-[50px] rounded bg-primary-100 py-2 text-sm dark:bg-primary-200">
                <ul>
                  <li>
                    <button
                      onClick={() => dropdownOnClick(10)}
                      className="w-full py-1 text-center hover:bg-primary-300 dark:hover:bg-primary-400"
                    >
                      10
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => dropdownOnClick(25)}
                      className="w-full py-1 text-center hover:bg-primary-300 dark:hover:bg-primary-400"
                    >
                      25
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </OutsideClickHandler>
      </div>
      <div className="ml-8 flex items-center">
        <span className="flex items-center">1-10 of 10</span>
      </div>
      <div className="ml-8 flex items-center text-sm">
        <button>
          <FontAwesomeIcon icon={faAngleLeft} className="mr-4" />
        </button>
        <button>
          <FontAwesomeIcon icon={faAngleRight} className="mr-4" />
        </button>
      </div>
    </div>
  );
}

export default TablePagingFooter;
