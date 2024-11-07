import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { LogOutIcon } from "lucide-react";
import React from "react";

const ProfileModal = ({ isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <h2>Profile</h2>
            </ModalHeader>
            <ModalBody className="flex flex-col items-center gap-4 py-6">
              <Avatar size="lg" src="/placeholder-avatar.jpg" fallback="UN" />
              <div className="text-center">
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-sm text-muted-foreground">
                  +1 (555) 123-4567
                </p>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 w-full">
                <h3 className="font-semibold text-primary">Loyalty Points</h3>
                <p className="text-2xl font-bold">1,250 pts</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                color="danger"
                onPress={onClose}
                className="w-full"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                End Session
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
