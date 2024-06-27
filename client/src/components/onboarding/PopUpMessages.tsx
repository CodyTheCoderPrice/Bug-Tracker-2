import { useAppSelector } from "@/app/hooks";
import { Dispatch, useEffect, useState } from "react";

function PopUpMessages() {
  const [isCreatedMsgInDom, setIsCreatedMsgInDom] = useState<boolean>(false);
  const [isCreatedMsgCentered, setIsCreatedMsgCentered] =
    useState<boolean>(false);
  const [isDeletedMsgInDom, setIsDeletedMsgInDom] = useState<boolean>(false);
  const [isDeletedMsgCentered, setIsDeletedMsgCentered] =
    useState<boolean>(false);

  const { hasSucceeded } = useAppSelector((state) => state.register);
  const { hasDeleteAccountSucceeded } = useAppSelector(
    (state) => state.account,
  );

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const displayMessage = async (
    setExists: Dispatch<React.SetStateAction<boolean>>,
    setIsCentered: Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setExists(true);
    await timeout(100);
    setIsCentered(true);
    await timeout(5000);
    setIsCentered(false);
    await timeout(1000);
    setExists(false);
  };

  useEffect(() => {
    if (hasSucceeded) {
      displayMessage(setIsCreatedMsgInDom, setIsCreatedMsgCentered);
    }
  }, [hasSucceeded]);

  useEffect(() => {
    if (hasDeleteAccountSucceeded) {
      displayMessage(setIsDeletedMsgInDom, setIsDeletedMsgCentered);
    }
  }, [hasDeleteAccountSucceeded]);

  const displayCreated = () => {
    displayMessage(setIsCreatedMsgInDom, setIsCreatedMsgCentered);
  };

  const displayDeleted = () => {
    displayMessage(setIsDeletedMsgInDom, setIsDeletedMsgCentered);
  };

  // Shared ClassNames
  const messageContainerShared =
    " absolute top-0 h-[50px] w-[300px] rounded text-center align-middle text-lg font-medium leading-[50px] text-white shadow-lg transition-right duration-300 ";

  return (
    <>
      {isCreatedMsgInDom && (
        <div
          className={
            messageContainerShared +
            " bg-green-700" +
            (isCreatedMsgCentered ? " right-[150px]" : " right-[-300px]")
          }
        >
          Account created
        </div>
      )}
      {isDeletedMsgInDom && (
        <div
          className={
            messageContainerShared +
            " bg-red-700" +
            (isDeletedMsgCentered ? " right-[150px]" : " right-[-300px]")
          }
        >
          Account deleted
        </div>
      )}

      <button onClick={() => displayCreated()} className="absolute bottom-0">
        Display Created
      </button>

      <button
        onClick={() => displayDeleted()}
        className="absolute bottom-0 right-10"
      >
        Display Deleted
      </button>
    </>
  );
}

export default PopUpMessages;
