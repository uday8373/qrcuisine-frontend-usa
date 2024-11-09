import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import React from "react";
import { WaitingIcon } from "../icons/waiting";

const CallWaiter = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      backdrop="blur"
      size="xs"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="w-full flex flex-col justify-center items-center gap-3 py-5">
                <WaitingIcon />
                <p className="text-center text-small text-default-700">
                  Wait some minutes, your waiter on the way!
                </p>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CallWaiter;
