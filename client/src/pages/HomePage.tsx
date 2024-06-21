import useWindowSize from "@/hooks/useWindowSize";
import BugStatusButtons from "@/components/home/BugStatusButtons";
import BugDueDatePanels from "@/components/home/BugDueDatePanels";

function HomePage() {
  const { width } = useWindowSize();
  const shouldExpand = width > 1270;

  return (
    <div className="flex flex-1 flex-col">
      <BugStatusButtons shouldExpand={shouldExpand} />
      <BugDueDatePanels />
    </div>
  );
}

export default HomePage;
