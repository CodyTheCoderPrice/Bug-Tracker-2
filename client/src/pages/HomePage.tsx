import useWindowSize from "@/hooks/useWindowSize";
import BugStatusButtons from "@/components/home/BugStatusButtons";
import BugDueDatePanels from "@/components/home/BugDueDatePanels";
import { useAppSelector } from "@/app/hooks";

function HomePage() {
  const { navbarExpanded } = useAppSelector((state) => state.system);
  const { width } = useWindowSize();
  const shouldExpand = width > (navbarExpanded ? 1275 : 1080);

  return (
    <div className="bg-light-mode-geo flex flex-1 flex-col overflow-auto">
      <BugStatusButtons shouldExpand={shouldExpand} />
      <BugDueDatePanels shouldExpand={shouldExpand} />
    </div>
  );
}

export default HomePage;
