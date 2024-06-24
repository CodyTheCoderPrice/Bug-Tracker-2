import { useAppSelector } from "@/app/hooks";
import { Dispatch, useEffect, useState } from "react";

function PopUpMessages() {
  const [createdMsgExists, setCreatedMsgExists] = useState(false);
  const [createdMsgCentered, setCreatedMsgCentered] = useState(false);
  const [deletedMsgExists, setDeletedMsgExists] = useState(false);
  const [deletedMsgCentered, setDeletedMsgCentered] = useState(false);

  const { success } = useAppSelector((state) => state.register);
  const { deleteAccountSuccess } = useAppSelector((state) => state.account);

  const displayMessage = (
    setExists: Dispatch<React.SetStateAction<boolean>>,
    setIsCentered: Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setExists(true);
    setTimeout(() => {
      setIsCentered(true);
    }, 100);

    setTimeout(() => {
      setIsCentered(false);
    }, 5000);
    setExists(true);
  };

  useEffect(() => {
    if (success) {
      displayMessage(setCreatedMsgExists, setCreatedMsgCentered);
    }
  }, [success]);

  useEffect(() => {
    if (deleteAccountSuccess) {
      displayMessage(setDeletedMsgExists, setDeletedMsgCentered);
    }
  }, [deleteAccountSuccess]);

  const displayCreated = () => {
    displayMessage(setCreatedMsgExists, setCreatedMsgCentered);
  };

  const displayDeleted = () => {
    displayMessage(setDeletedMsgExists, setDeletedMsgCentered);
  };

  // Shared ClassNames
  const messageContainerShared =
    " absolute top-0 h-[50px] w-[300px] rounded text-center align-middle text-lg font-medium leading-[50px] text-white shadow-lg transition-right duration-300 ";

  return (
    <>
      {createdMsgExists && (
        <div
          className={
            messageContainerShared +
            " bg-green-700" +
            (createdMsgCentered ? " right-[150px]" : " right-[-300px]")
          }
        >
          Account created
        </div>
      )}
      {deletedMsgExists && (
        <div
          className={
            messageContainerShared +
            " bg-red-700" +
            (deletedMsgCentered ? " right-[150px]" : " right-[-300px]")
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
