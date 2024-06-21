import { MouseEventHandler } from "react";
import { useAppSelector } from "@/app/hooks";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { getNumBugsByStatus } from "@/utils/filterUtils";
import openBugIcon from "@/assets/icons/icon_bug_open.svg";
import inProgressBugIcon from "@/assets/icons/icon_bug_progress.svg";
import inTestingBugIcon from "@/assets/icons/icon_bug_testing.svg";
import closedBugIcon from "@/assets/icons/icon_bug_closed.svg";

function BugStatusButtons() {
  const { bugs } = useAppSelector((state) => state.bugs);
  const { width } = useWindowDimensions();

  // Shared classNames
  const statusButtonShared =
    " mb-[20px] bg-color-foreground-hover-dl flex items-center rounded-lg shadow  h-[65px] ";
  const statusButtonsExpandedShared = statusButtonShared + " px-4 w-[210px] ";
  const statusButtonMiniShared =
    statusButtonShared + " pr-4 pl-1 w-[160px] border-l-[16px] ";
  const statusButtonMarginR = " mr-[30px] ";
  const statusImgShared = " h-[48px] rounded ";
  const statusDivShared = " ml-3 flex flex-col text-left ";
  const statusAmountShared = " text-xl ";
  const statusTitleShared = " text-sm ";

  const getRibbonColor = (statusCode: 1 | 2 | 3 | 4) => {
    switch (statusCode) {
      case 1:
        return " border-open-icon-red ";
      case 2:
        return " border-progress-icon-orange ";
      case 3:
        return " border-testing-icon-teal ";
      case 4:
        return " border-closed-icon-green ";
      default:
        return "";
    }
  };

  const statusButton = (
    onClick: MouseEventHandler<HTMLButtonElement>,
    icon: string,
    title: string,
    statusCode: 1 | 2 | 3 | 4,
  ) => {
    const shouldExpand = width > 1270;
    return (
      <button
        onClick={onClick}
        className={
          (statusCode !== 4 ? statusButtonMarginR : "") +
          (shouldExpand
            ? statusButtonsExpandedShared
            : statusButtonMiniShared + getRibbonColor(statusCode))
        }
      >
        {shouldExpand && (
          <img
            src={icon}
            alt={"icon for " + title}
            className={statusImgShared}
          />
        )}
        <div className={statusDivShared}>
          <span className={statusAmountShared}>
            {getNumBugsByStatus(bugs, statusCode)}
          </span>
          <span className={statusTitleShared}>{title}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="mx-10 mt-10 flex flex-wrap">
      <div className="flex">
        {statusButton(() => {}, openBugIcon, "Open Bugs", 1)}
        {statusButton(() => {}, inProgressBugIcon, "Bugs in Progress", 2)}
      </div>
      <div className="flex">
        {statusButton(() => {}, inTestingBugIcon, "Bugs in Testing", 3)}
        {statusButton(() => {}, closedBugIcon, "Closed Bugs", 4)}
      </div>
    </div>
  );
}

export default BugStatusButtons;
