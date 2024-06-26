import { TBug } from "@/features/bugs/bugSlice";

export const sortBugsByDueDate = (bugs: TBug[] | null) => {
  if (bugs === null) {
    return null;
  }
  return bugs.sort((a, b) => {
    const aDate = a.due_date
      ? new Date(a.due_date).getTime()
      : Number.MIN_VALUE;
    const bDate = b.due_date
      ? new Date(b.due_date).getTime()
      : Number.MIN_VALUE;
    return aDate - bDate;
  });
};
