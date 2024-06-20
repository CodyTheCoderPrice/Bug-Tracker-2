import { TBug } from "@/features/bugs/bugSlice";
import { TFilter } from "@/pages/HomePage";
import moment from "moment";

export const getNumBugsByStatus = (
  bugs: TBug[] | null,
  statusCode: 1 | 2 | 3 | 4,
) => {
  if (bugs === null) {
    return 0;
  }
  return bugs?.filter((bug) => bug.status_id === statusCode).length;
};

export const filterDueBugs = (bugs: TBug[] | null, approach: TFilter) => {
  if (bugs === null) {
    return null;
  }
  // Remove closed bugs
  bugs = bugs?.filter((bug) => bug.status_id !== 4);
  return bugs?.filter((bug) => {
    const isPresentOrFuture = moment(0, "HH").diff(bug.due_date, "days") <= 0;
    switch (approach) {
      case 1: {
        return (
          moment(bug.due_date).isSame(new Date(), "week") && isPresentOrFuture
        );
      }
      case 2: {
        return (
          moment(bug.due_date).isSame(new Date(), "month") && isPresentOrFuture
        );
      }
      default: {
        return isPresentOrFuture;
      }
    }
  });
};

export const filterOverdueBugs = (bugs: TBug[] | null, approach: TFilter) => {
  if (bugs === null) {
    return null;
  }
  // Remove closed bugs
  bugs = bugs?.filter((bug) => bug.status_id !== 4);
  return bugs?.filter((bug) => {
    const isPast = moment(0, "HH").diff(bug.due_date, "days") > 0;
    switch (approach) {
      case 1: {
        return moment(bug.due_date).isSame(new Date(), "week") && isPast;
      }
      case 2: {
        return moment(bug.due_date).isSame(new Date(), "month") && isPast;
      }
      default: {
        return isPast;
      }
    }
  });
};
