import { MouseEventHandler, SetStateAction, useState, Dispatch } from "react";
import { TBug } from "@/features/bugs/bugSlice";
import openBugIcon from "@/assets/icons/icon_bug_open.svg";
import inProgressBugIcon from "@/assets/icons/icon_bug_progress.svg";
import inTestingBugIcon from "@/assets/icons/icon_bug_testing.svg";
import closedBugIcon from "@/assets/icons/icon_bug_closed.svg";
import { useAppSelector } from "@/app/hooks";
import moment from "moment";
import { filterDueBugs, filterOverdueBugs } from "@/utils/filterUtils";

export type TFilter = 0 | 1 | 2;

function HomePage() {
  const [dueFilterSelected, setDueFilterSelected] = useState<TFilter>(0);
  const [overdueFilterSelected, setOverdueFilterSelected] =
    useState<TFilter>(0);

  const bugStatusButton = (
    src: string,
    title: string,
    amount: number,
    onClick: MouseEventHandler<HTMLButtonElement>,
  ) => {
    return (
      <button
        onClick={onClick}
        className="bg-color-foreground-dl mr-[50px] flex w-[225px] items-center rounded-lg px-4 shadow hover:shadow-lg"
      >
        <img src={src} alt={`icon for ${title}`} className="h-[50px] rounded" />
        <div className="ml-3 flex flex-col text-left">
          <span>{title}</span>
          <span className="text-xl">{amount}</span>
        </div>
      </button>
    );
  };

  const titleHeader = (title: string) => {
    return <h2 className="text-xl font-semibold">{title}</h2>;
  };

  const filterButtons = (
    setFilterFunc: Dispatch<SetStateAction<TFilter>>,
    forDueSoon: boolean,
  ) => {
    const filterSelected = forDueSoon
      ? dueFilterSelected
      : overdueFilterSelected;
    return (
      <div className="dark:text-plain-light-100 mt-6 font-medium text-primary-2">
        <button
          onClick={() => {
            setFilterFunc(0);
          }}
          className={
            "border-color-dl rounded-l border px-4 py-[1px]" +
            (filterSelected === 0 ? " bg-primary-1 text-white" : "")
          }
        >
          All
        </button>
        <button
          onClick={() => {
            setFilterFunc(1);
          }}
          className={
            "border-color-dl border border-l-0 px-4 py-[1px]" +
            (filterSelected === 1 ? " bg-primary-1 text-white" : "")
          }
        >
          This Week
        </button>
        <button
          onClick={() => {
            setFilterFunc(2);
          }}
          className={
            "border-color-dl rounded-r border border-l-0 px-4 py-[1px]" +
            (filterSelected === 2 ? " bg-primary-1 text-white" : "")
          }
        >
          This Month
        </button>
      </div>
    );
  };

  const bugTable = (bugList: TBug[] | null, isDueSoon: boolean) => {
    bugList = isDueSoon
      ? filterDueBugs(bugList, dueFilterSelected)
      : filterOverdueBugs(bugList, overdueFilterSelected);
    return (
      <div className="mt-4 flex-grow">
        <table className="w-full">
          <thead>
            <tr className="bg-plain-light-500 dark:bg-plain-dark-500 text-left">
              <th className="w-[40%] px-4">BUG</th>
              <th className="w-[40%] px-4">PROJECT</th>
              <th className="w-[20%] px-4">DUE DATE</th>
            </tr>
          </thead>
          <tbody>
            {bugList?.map((bug, idx) => {
              return (
                <tr
                  key={idx}
                  className="hover:bg-plain-light-200 hover:dark:bg-plain-dark-300 border-plain-light-300 border-b"
                >
                  <td
                    onClick={() => {}}
                    className="dark:text-plain-light-100 cursor-pointer px-4 py-2 font-medium text-primary-2 hover:underline"
                  >
                    {bug.name}
                  </td>
                  <td className="px-4 py-2">{bug.project}</td>
                  <td className="px-4 py-2">
                    {bug.due_date !== null
                      ? moment.utc(bug.due_date).format("MM-DD-YYYY")
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const { bugs } = useAppSelector((state) => state.bugs);

  // Shared classNames
  const bugTableContainerShared =
    "bg-color-foreground-dl flex flex-1 flex-col rounded p-6 shadow";

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-10 mt-10 flex h-[70px]">
        {bugStatusButton(openBugIcon, "Open Bugs", -1, () => {})}
        {bugStatusButton(inProgressBugIcon, "Bugs in Progress", -1, () => {})}
        {bugStatusButton(inTestingBugIcon, "Bugs in Testing", -1, () => {})}
        {bugStatusButton(closedBugIcon, "Closed Bugs", -1, () => {})}
      </div>
      <div className="mx-10 mb-10 mt-6 flex grow">
        <div className={bugTableContainerShared + " mr-5"}>
          {titleHeader("Bugs Due Soon")}
          {filterButtons(setDueFilterSelected, true)}
          {bugTable(bugs, true)}
        </div>
        <div className={bugTableContainerShared + " ml-5"}>
          {titleHeader("Overdue Bugs")}
          {filterButtons(setOverdueFilterSelected, false)}
          {bugTable(bugs, false)}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
