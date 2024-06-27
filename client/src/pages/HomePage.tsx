import useWindowSize from "@/hooks/useWindowSize";
import BugStatusButtons from "@/components/home/BugStatusButtons";
import BugDueDatePanels from "@/components/home/BugDueDatePanels";
import { useAppSelector } from "@/app/hooks";

function HomePage() {
  const { isNavbarExpanded } = useAppSelector((state) => state.system);
  const { width } = useWindowSize();
  const isWideScreen = width > (isNavbarExpanded ? 1275 : 1080);

  return (
    <div className="bg-protected flex flex-1 flex-col overflow-auto">
      <BugStatusButtons isWideScreen={isWideScreen} />
      <BugDueDatePanels isWideScreen={isWideScreen} />
    </div>
  );
}

export default HomePage;
