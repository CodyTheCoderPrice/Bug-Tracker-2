import { useAppSelector } from "@/app/hooks";
import { useEffect, useState } from "react";

function CreationMessage() {
  const [exists, setExists] = useState(false);
  const [isCentered, setIsCentered] = useState(false);

  const { success } = useAppSelector((state) => state.register);

  useEffect(() => {
    if (success) {
      setExists(true);
      setTimeout(() => {
        setIsCentered(true);
      }, 100);

      setTimeout(() => {
        setIsCentered(false);
      }, 5000);
      setExists(true);
    }
  }, [success]);

  const mimicUseEffect = () => {
    setExists(true);
    setTimeout(() => {
      setIsCentered(true);
    }, 100);

    setTimeout(() => {
      setIsCentered(false);
    }, 5000);
    setExists(true);
  };

  return (
    <>
      {exists && (
        <div
          className={
            "transition-right absolute top-0 h-[60px] w-[300px] rounded-b bg-green-700 text-center align-middle text-lg font-medium leading-[60px] text-white shadow-lg duration-300" +
            (isCentered ? " right-[150px]" : " right-[-300px]")
          }
        >
          Account created
        </div>
      )}

      <button
        onClick={() => mimicUseEffect()}
        className="absolute bottom-0 right-0"
      >
        Toggle Visible
      </button>
    </>
  );
}

export default CreationMessage;
