import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";

const Instructions = ({
  isOpen,
  onOpenChange,
  mainInstructions,
  setMainInstructions,
}) => {
  const [error, setError] = useState("");
  const [instructions, setInstructions] = useState(mainInstructions || "");
  const handleInstructionsChange = (e) => {
    let value = e.target.value;
    if (value.includes("  ")) {
      setError("Double spaces are not allowed.");
      return;
    } else {
      setError("");
    }

    if (value.length <= 150) {
      setInstructions(value);
    }
  };

  const handleSave = () => {
    localStorage.setItem("instructions", JSON.stringify(instructions));
    setMainInstructions(instructions);
    onOpenChange(false);
  };

  const handleClose = () => {
    setInstructions(mainInstructions);
    onOpenChange(false);
  };
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Special cooking instructions
            </ModalHeader>
            <ModalBody>
              <Textarea
                autoFocus
                placeholder="Do you want to add cooking instructions?"
                isInvalid={error && true}
                errorMessage={error}
                value={instructions}
                onChange={handleInstructionsChange}
                minRows="6"
                maxLength={150}
              />
              <h3 className="mt-1 text-right w-full text-tiny text-default-700">
                {instructions?.length}/150
              </h3>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={handleClose}>
                Close
              </Button>
              <Button color="primary" onClick={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Instructions;
