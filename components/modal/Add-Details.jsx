import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { ChevronsRight, Loader } from "lucide-react";
import React from "react";

const AddDetails = ({
  isOpen,
  onOpenChange,
  personalDetails,
  handleNameChange,
  handleMobileChange,
  handleSubmit,
  nameError,
  mobileError,
  loading,
}) => {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Personal Information
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                isRequired
                type="text"
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={personalDetails.name}
                onChange={handleNameChange}
                errorMessage={nameError}
                isInvalid={nameError && true}
                maxLength={50}
              />
              <Input
                isRequired
                type="tel"
                label="Mobile Number"
                name="mobile"
                placeholder="Enter your mobile number"
                value={personalDetails.mobile}
                onChange={handleMobileChange}
                errorMessage={mobileError}
                isInvalid={mobileError && true}
                maxLength={10}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                spinner={<Loader size={20} className="animate-spin" />}
                isLoading={loading}
                endContent={<ChevronsRight size={18} />}
                fullWidth
                size="lg"
                color="primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Placed Order
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddDetails;
