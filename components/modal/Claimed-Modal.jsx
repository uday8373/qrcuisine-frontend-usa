import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import LottieAnimation from "../lottie/LottieAnimation";
import QRLoader from "@/components/lottie/claimed.json";

const ClaimedModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      backdrop="blur"
      size="sm"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center"></ModalHeader>
            <ModalBody className="text-center">
              <LottieAnimation
                width={175}
                height={95}
                animationData={QRLoader}
              />
              <h3 className="text-2xl font-bold pt-3">Great, all set!</h3>
              <p className="text-muted-foreground pb-3">
                Congratulations! You have successfully claimed the points.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="solid"
                color="primary"
                fullWidth
                onClick={onClose}
                className="font-semibold text-medium"
              >
                Sweet
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ClaimedModal;
