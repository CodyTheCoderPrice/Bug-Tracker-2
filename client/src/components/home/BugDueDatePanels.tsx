import { SetStateAction, useState, Dispatch, useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import { TBug } from "@/features/bugs/bugSlice";
import {
  filterDueSoonBugsByDate,
  filterBugsByPage,
  filterOverdueBugsByDate,
} from "@/utils/filterUtils";
import moment from "moment";
import TablePagingFooter from "../table/TablePagingFooter";

export type TFilter = 0 | 1 | 2;

type TProps = {
  shouldExpand: boolean;
};

function BugDueDatePanels(props: TProps) {
  const [dueSoonFilter, setDueSoonFilter] = useState<TFilter>(0);
  const [overdueFilter, setOverdueFilter] = useState<TFilter>(0);

  const [dueSoonBugs, setDueSoonBugs] = useState<TBug[] | null>(null);
  const [overdueBugs, setOverdueBugs] = useState<TBug[] | null>(null);

  const { bugs } = useAppSelector((state) => state.bugs);

  useEffect(() => {
    setDueSoonBugs(filterDueSoonBugsByDate(bugs, dueSoonFilter));
  }, [bugs, dueSoonFilter]);

  useEffect(() => {
    setOverdueBugs(filterOverdueBugsByDate(bugs, overdueFilter));
  }, [bugs, overdueFilter]);

  const titleHeader = (title: string) => {
    return <h2 className="text-xl font-semibold">{title}</h2>;
  };

  const filterButtons = (
    setFilterFunc: Dispatch<SetStateAction<TFilter>>,
    forDueSoon: boolean,
  ) => {
    const filterSelected = forDueSoon ? dueSoonFilter : overdueFilter;
    // Shared classNames
    const buttonShared = " border-color-dl border px-4 py-[1px] ";
    const selectedShared = " bg-primary-200 dark:bg-primary-300 text-white ";
    return (
      <div className="mt-6 font-medium text-primary-300 dark:text-plain-light-100">
        <button
          onClick={() => {
            setFilterFunc(0);
          }}
          className={
            buttonShared +
            "rounded-l" +
            (filterSelected === 0 ? selectedShared : "")
          }
        >
          All
        </button>
        <button
          onClick={() => {
            setFilterFunc(1);
          }}
          className={
            buttonShared +
            "border-l-0" +
            (filterSelected === 1 ? selectedShared : "")
          }
        >
          This Week
        </button>
        <button
          onClick={() => {
            setFilterFunc(2);
          }}
          className={
            buttonShared +
            "rounded-r border-l-0" +
            (filterSelected === 2 ? selectedShared : "")
          }
        >
          This Month
        </button>
      </div>
    );
  };

  const bugTable = (isDueSoon: boolean) => {
    const bugList = isDueSoon
      ? filterBugsByPage(dueSoonBugs, homeDueSoonPage)
      : filterBugsByPage(overdueBugs, homeOverduePage);
    return (
      <div className="mb-4 mt-4 min-h-[450px]">
        <table className="w-full">
          <thead>
            <tr className="bg-plain-light-500 text-left dark:bg-plain-dark-500">
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
                  className="border-color-table-row-dl border-b hover:bg-plain-light-200 hover:dark:bg-plain-dark-300"
                >
                  <td
                    onClick={() => {}}
                    className="text-color-primary-dl cursor-pointer px-4 py-2 font-medium hover:underline"
                  >
                    {bug.name}
                  </td>
                  <td className="px-4 py-2">{bug.project}</td>
                  <td className={"px-4 py-2"}>
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

  const { homeDueSoonPage, homeOverduePage } = useAppSelector(
    (state) => state.system,
  );

  // Shared classNames
  const bugTableContainerShared =
    " bg-color-foreground-dl flex flex-1 flex-col rounded p-6 shadow ";

  return (
    <div
      className={
        "mx-10 mb-10 mt-1 flex" +
        (props.shouldExpand ? " flex-grow" : " flex-col")
      }
    >
      <div
        className={
          bugTableContainerShared + (props.shouldExpand ? " mr-5" : "")
        }
      >
        {titleHeader("Bugs Due Soon")}
        {filterButtons(setDueSoonFilter, true)}
        {bugTable(true)}
        <TablePagingFooter
          isDueSoon={true}
          pageNum={homeDueSoonPage}
          numBugs={dueSoonBugs ? dueSoonBugs.length : 0}
        />
      </div>
      <div
        className={
          bugTableContainerShared + (props.shouldExpand ? " ml-5" : " mt-5")
        }
      >
        {titleHeader("Overdue Bugs")}
        {filterButtons(setOverdueFilter, false)}
        {bugTable(false)}
        <TablePagingFooter
          isDueSoon={false}
          pageNum={homeOverduePage}
          numBugs={overdueBugs ? overdueBugs.length : 0}
        />
      </div>
    </div>
  );
}

export default BugDueDatePanels;
