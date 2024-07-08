import { useAppDispatch } from "@/app/hooks";
import { useEffect, useState } from "react";
import { homeRowsPerPage } from "@/utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  setHomeDueSoonPage,
  setHomeOverduePage,
} from "@/features/system/systemSlice";

type TProps = {
  isDueSoon: boolean;
  pageNum: number;
  numBugs: number;
};

function TablePagingFooter(props: TProps) {
  const dispatch = useAppDispatch();

  const [pageRangeText, setPageRangeText] = useState<string>("");

  useEffect(() => {
    const lowerBound = (props.pageNum - 1) * homeRowsPerPage + 1;
    const upperBound = Math.min(props.pageNum * homeRowsPerPage, props.numBugs);
    setPageRangeText(`${lowerBound}-${upperBound} of ${props.numBugs}`);
  }, [props.pageNum, props.numBugs]);

  const isAbleToPageDown = props.pageNum > 1;
  const isAbleToPageUp = props.pageNum * homeRowsPerPage < props.numBugs;

  const pageDownOnClick = () => {
    if (isAbleToPageDown) {
      const newPageNum = props.pageNum - 1;
      props.isDueSoon
        ? dispatch(setHomeDueSoonPage(newPageNum))
        : dispatch(setHomeOverduePage(newPageNum));
    }
  };

  const pageUpOnClick = () => {
    if (isAbleToPageUp) {
      const newPageNum = props.pageNum + 1;
      props.isDueSoon
        ? dispatch(setHomeDueSoonPage(newPageNum))
        : dispatch(setHomeOverduePage(newPageNum));
    }
  };

  // Shared classNames
  const buttonDisabledShared =
    "pointer-events-none text-gray-400 dark:text-gray-500";

  return (
    <div className="mt-auto flex h-[50px] bg-plain-light-300 text-xs dark:bg-plain-dark-300">
      <div className="ml-auto flex items-center">
        <span className="flex items-center">{pageRangeText}</span>
      </div>
      <div className="ml-8 flex items-center text-sm">
        <button
          onClick={pageDownOnClick}
          className={isAbleToPageDown ? "" : buttonDisabledShared}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="mr-4" />
        </button>
        <button
          onClick={pageUpOnClick}
          className={isAbleToPageUp ? "" : buttonDisabledShared}
        >
          <FontAwesomeIcon icon={faAngleRight} className="mr-4" />
        </button>
      </div>
    </div>
  );
}

export default TablePagingFooter;
