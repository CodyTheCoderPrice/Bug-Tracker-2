import { MouseEventHandler } from "react";
import { useAppSelector } from "@/app/hooks";
import { getNumBugsByStatus } from "@/utils/filterUtils";
import openBugIcon from "@/assets/icons/icon_bug_open.svg";
import inProgressBugIcon from "@/assets/icons/icon_bug_progress.svg";
import inTestingBugIcon from "@/assets/icons/icon_bug_testing.svg";
import closedBugIcon from "@/assets/icons/icon_bug_closed.svg";

type TProps = {
  shouldExpand: boolean;
};

function BugStatusButtons(props: TProps) {
  const { bugs } = useAppSelector((state) => state.bugs);

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
    return (
      <button
        onClick={onClick}
        className={
          "bg-color-foreground-hover-dl mb-[20px] flex h-[65px] items-center rounded-lg shadow" +
          (statusCode !== 4 ? " mr-[30px]" : "") +
          " " +
          (props.shouldExpand
            ? " w-[210px] px-4"
            : "w-[160px] border-l-[16px] pl-1 pr-4" +
              getRibbonColor(statusCode))
        }
      >
        {props.shouldExpand && (
          <img
            src={icon}
            alt={"icon for " + title}
            className="h-[48px] rounded"
          />
        )}
        <div className="ml-3 flex flex-col text-left">
          <span className="text-xl">
            {getNumBugsByStatus(bugs, statusCode)}
          </span>
          <span className="text-sm">{title}</span>
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
