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
import { CheckCircle } from "lucide-react";

const RegisterSuccess = ({ isOpen, onOpenChange }) => {
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
              <CheckCircle size={48} className="text-primary-500 self-center" />
              <h3 className="text-2xl font-bold pt-3">
                Registration Successful
              </h3>
              <p className="text-muted-foreground pb-3">
                Congratulations! You have successfully completed the
                registration process.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="solid"
                color="primary"
                fullWidth
                as={Link}
                href="/"
              >
                Okay
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RegisterSuccess;
