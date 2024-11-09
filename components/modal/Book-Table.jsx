import {
  insertMessage,
  insertUser,
  updateTable,
  updateVisitorBooked,
} from "@/apis/restaurantApi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ChevronsRight, Loader, UsersRound } from "lucide-react";
import React, { useState } from "react";

const BookTable = ({
  isModalOpen,
  onOpenChange,
  tableId,
  setIsBooked,
  restaurantId,
  tableNo,
  maxCapacity,
}) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const persons = Array.from({ length: maxCapacity }, (_, index) => ({
    key: index + 1,
    label: String(index + 1).padStart(2, "0"),
  }));

  const handleBookTable = async () => {
    setIsLoading(true);
    try {
      const insertUserResponse = await insertUser(tableId, restaurantId);
      if (!insertUserResponse || insertUserResponse.length === 0) {
        throw new Error("User insertion failed");
      }

      const userId = insertUserResponse[0].id;
      const deviceToken = insertUserResponse[0].deviceToken;

      const [updateTableResponse, updateVisitorResponse, messageResponse] =
        await Promise.all([
          updateTable(tableId, selectedPerson, userId),
          updateVisitorBooked(restaurantId),
          insertMessage(tableId, restaurantId, userId, tableNo),
        ]);

      if (updateTableResponse && updateVisitorResponse && messageResponse) {
        localStorage.setItem("isBooked", true);
        localStorage.setItem("tableId", tableId);
        localStorage.setItem("deviceToken", deviceToken);
        localStorage.setItem("userId", userId);
        setIsBooked(true);
      }
    } catch (error) {
      console.error("Error booking table or updating visitor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTableNumber = (tableNo) => {
    return tableNo && tableNo < 10 ? `0${tableNo}` : tableNo;
  };

  return (
    <>
      <Modal
        isKeyboardDismissDisabled
        defaultOpen
        hideCloseButton
        isDismissable
        backdrop="blur"
        size="xs"
        placement="center"
        isOpen={isModalOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  gap-1">
                <div className="w-full h-full flex justify-center py-3 items-center">
                  <div className="bg-secondary flex justify-center flex-col items-center w-28 h-28 rounded-lg ">
                    <h2 className="font-bold text-xl text-white">TABLE</h2>
                    <p className="font-black text-5xl text-white tracking-wider">
                      {formatTableNumber(tableNo)}
                    </p>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody className="pt-0 ">
                <div>
                  <Select
                    onSelectionChange={(key) => {
                      setSelectedPerson(key.currentKey);
                    }}
                    fullWidth
                    placeholder="Number of persons"
                    size="lg"
                    startContent={<UsersRound size={20} className="mr-1" />}
                    classNames={{
                      trigger: "!h-14",
                    }}
                    aria-label="person"
                    aria-labelledby="person"
                  >
                    {persons.map((person) => (
                      <SelectItem key={person.key}>{person.label}</SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  spinner={<Loader size={20} className="animate-spin" />}
                  isLoading={isLoading}
                  isDisabled={!selectedPerson}
                  onClick={handleBookTable}
                  size="lg"
                  fullWidth
                  color="primary"
                  onPress={onClose}
                  endContent={<ChevronsRight size={22} />}
                  className="font-medium"
                >
                  Book Now
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookTable;
