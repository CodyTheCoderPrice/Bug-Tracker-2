import useWindowSize from "@/hooks/useWindowSize";
import BugStatusButtons from "@/components/home/BugStatusButtons";
import BugDueDatePanels from "@/components/home/BugDueDatePanels";

function HomePage() {
  const { width } = useWindowSize();
  const shouldExpand = width > 1275;

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <BugStatusButtons shouldExpand={shouldExpand} />
      <BugDueDatePanels shouldExpand={shouldExpand} />
    </div>
  );
}

export default HomePage;
