import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
  isOnScreen: boolean;
};

function SidePanelModal(props: TProps) {
  return (
    <div
      className={
        "bg-color-foreground-dl absolute top-0 z-10 h-full w-[500px] p-6 shadow transition-right duration-300" +
        (props.isOnScreen ? " right-0" : " right-[-500px]")
      }
    >
      {props.children}
    </div>
  );
}

export default SidePanelModal;
