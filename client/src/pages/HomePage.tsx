import { MouseEventHandler } from "react";
import openBugIcon from "@/assets/icons/icon_bug_open.svg";
import inProgressBugIcon from "@/assets/icons/icon_bug_progress.svg";
import inTestingBugIcon from "@/assets/icons/icon_bug_testing.svg";
import closedBugIcon from "@/assets/icons/icon_bug_closed.svg";

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

function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mx-10 mt-10 flex h-[70px]">
        {bugStatusButton(openBugIcon, "Open Bugs", -1, () => {})}
        {bugStatusButton(inProgressBugIcon, "Bugs in Progress", -1, () => {})}
        {bugStatusButton(inTestingBugIcon, "Bugs in Testing", -1, () => {})}
        {bugStatusButton(closedBugIcon, "Closed Bugs", -1, () => {})}
      </div>
      <div className="mx-10 mb-10 mt-6 flex grow">
        <div className="mr-5 flex-1 rounded bg-plain-1 shadow"></div>
        <div className="ml-5 flex-1 rounded bg-plain-1 shadow"></div>
      </div>
    </div>
  );
}

export default HomePage;
