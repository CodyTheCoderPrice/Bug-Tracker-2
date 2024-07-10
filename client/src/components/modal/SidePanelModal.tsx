import { ReactNode } from "react";

function SidePanelModal({ children }: { children: ReactNode }) {
  return (
    <div className="bg-color-foreground-dl absolute right-0 top-0 z-10 h-full w-[500px] p-6">
      {children}
    </div>
  );
}

export default SidePanelModal;
