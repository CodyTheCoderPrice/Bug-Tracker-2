import { MouseEventHandler, useState } from "react";
import { TBug } from "@/features/bugs/bugSlice";
import openBugIcon from "@/assets/icons/icon_bug_open.svg";
import inProgressBugIcon from "@/assets/icons/icon_bug_progress.svg";
import inTestingBugIcon from "@/assets/icons/icon_bug_testing.svg";
import closedBugIcon from "@/assets/icons/icon_bug_closed.svg";
import { useAppSelector } from "@/app/hooks";

function HomePage() {
  type TFilter = 0 | 1 | 2;
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
        className="mr-[50px] flex w-[225px] items-center rounded-lg bg-plain-1 px-4 shadow hover:shadow-lg"
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
    btn1Text: string,
    btn1OnClick: MouseEventHandler<HTMLButtonElement>,
    btn2Text: string,
    btn2OnClick: MouseEventHandler<HTMLButtonElement>,
    btn3Text: string,
    btn3OnClick: MouseEventHandler<HTMLButtonElement>,
    forDueSoon: boolean,
  ) => {
    const filterSelected = forDueSoon
      ? dueFilterSelected
      : overdueFilterSelected;

    return (
      <div className="mt-6 font-medium text-primary-2">
        <button
          onClick={btn1OnClick}
          className={
            "rounded-l border border-plain-3 px-4 py-[1px]" +
            (filterSelected === 0 ? " bg-primary-1 text-white" : "")
          }
        >
          {btn1Text}
        </button>
        <button
          onClick={btn2OnClick}
          className={
            "border border-l-0 border-plain-3 px-4 py-[1px]" +
            (filterSelected === 1 ? " bg-primary-1 text-white" : "")
          }
        >
          {btn2Text}
        </button>
        <button
          onClick={btn3OnClick}
          className={
            "rounded-r border border-l-0 border-plain-3 px-4 py-[1px]" +
            (filterSelected === 2 ? " bg-primary-1 text-white" : "")
          }
        >
          {btn3Text}
        </button>
      </div>
    );
  };

  const bugTable = (bugList: TBug[] | null) => {
    return (
      <table className="mt-4 flex-grow">
        <thead>
          <tr className="bg-plain-3">
            <th>BUG</th>
            <th>PROJECT</th>
            <th>DUE DATE</th>
          </tr>
        </thead>
      </table>
    );
  };

  const { bugs } = useAppSelector((state) => state.bugs);

  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-10 mt-10 flex h-[70px]">
        {bugStatusButton(openBugIcon, "Open Bugs", -1, () => {})}
        {bugStatusButton(inProgressBugIcon, "Bugs in Progress", -1, () => {})}
        {bugStatusButton(inTestingBugIcon, "Bugs in Testing", -1, () => {})}
        {bugStatusButton(closedBugIcon, "Closed Bugs", -1, () => {})}
      </div>
      <div className="mx-10 mb-10 mt-6 flex grow">
        <div className="mr-5 flex flex-1 flex-col rounded bg-plain-1 p-6 shadow">
          {titleHeader("Bugs Due Soon")}
          {filterButtons(
            "All",
            () => {
              setDueFilterSelected(0);
            },
            "This Week",
            () => {
              setDueFilterSelected(1);
            },
            "This Month",
            () => {
              setDueFilterSelected(2);
            },
            true,
          )}
          {bugTable(bugs)}
        </div>
        <div className="ml-5 flex flex-1 flex-col rounded bg-plain-1 p-6 shadow">
          {titleHeader("Overdue Bugs")}
          {filterButtons(
            "All",
            () => {
              setOverdueFilterSelected(0);
            },
            "Past Week",
            () => {
              setOverdueFilterSelected(1);
            },
            "Past Month",
            () => {
              setOverdueFilterSelected(2);
            },
            false,
          )}
          {bugTable(bugs)}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
