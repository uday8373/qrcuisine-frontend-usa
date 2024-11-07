import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Accordion,
  AccordionItem,
  Avatar,
  ModalFooter,
  Button,
} from "@nextui-org/react";

import {
  ChevronsRight,
  CirclePlus,
  Filter,
  Loader,
  MessageCircle,
  ShoppingBag,
  Soup,
  Thermometer,
  Utensils,
} from "lucide-react";

import CustomButton from "../button/Custom-Button";
export default function ViewCart({
  isOpen,
  onOpenChange,
  foodData,
  onCartChange,
  isLoading,
  handleCheckout,
}) {
  return (
    <>
      <Modal
        backdrop="blur"
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          header: "border-b border-dotted",
          footer: "border-t border-dotted",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b decoration-dotted">
                Your Cart Details
              </ModalHeader>
              <ModalBody>
                <Accordion variant="light" className="px-0">
                  {foodData &&
                    foodData.map((item, index) => {
                      return (
                        <AccordionItem
                          key={index}
                          aria-label="Accordion 1"
                          startContent={
                            <Avatar
                              src={
                                item?.image || "/assets/image_placeholder.webp"
                              }
                              radius="sm"
                            />
                          }
                          indicator={
                            <div>
                              <CustomButton
                                menuItem={item}
                                onCartChange={onCartChange}
                              />
                            </div>
                          }
                          disableIndicatorAnimation
                          title={item?.food_name}
                          subtitle={<span>x{item?.quantity}</span>}
                          classNames={{
                            title: "text-medium",
                          }}
                        >
                          {item?.is_customized && (
                            <>
                              <div className="w-full flex flex-col gap-3 disabled:bg-opacity-100">
                                {item?.selectedQuantity && (
                                  <div className="w-full flex items-center gap-3">
                                    <Filter
                                      size={18}
                                      className="text-default-600"
                                    />
                                    <h4 className="text-default-700 text-small  line-clamp-1">
                                      Quantity : {item?.selectedQuantity?.title}
                                    </h4>
                                  </div>
                                )}
                                {item?.selectedInstructions && (
                                  <div className="w-full flex items-center gap-3">
                                    <MessageCircle
                                      size={18}
                                      className="text-default-600"
                                    />
                                    <h4 className="text-default-700 text-small line-clamp-1">
                                      Quick Instructions :{" "}
                                      {item?.selectedInstructions?.title}
                                    </h4>
                                  </div>
                                )}
                                {item?.selectedTemperature && (
                                  <div className="w-full flex items-center gap-3">
                                    <Thermometer
                                      size={18}
                                      className="text-default-600"
                                    />
                                    <h4 className="text-default-700 text-small line-clamp-1">
                                      Temperature :{" "}
                                      {item?.selectedTemperature?.title}
                                    </h4>
                                  </div>
                                )}
                                {item?.selectedSides && (
                                  <div className="w-full flex items-center gap-3">
                                    <Utensils
                                      size={18}
                                      className="text-default-600"
                                    />
                                    <h4 className="text-default-700 text-small">
                                      Side Item : {item?.selectedSides?.title}
                                    </h4>
                                  </div>
                                )}
                                {item?.selectedAdditionalSides && (
                                  <div className="w-full flex items-center gap-3">
                                    <Soup
                                      size={18}
                                      className="text-default-600"
                                    />
                                    <h4 className="text-default-700 text-small line-clamp-1">
                                      Additional Side :{" "}
                                      {item?.selectedAdditionalSides?.title}
                                    </h4>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </AccordionItem>
                      );
                    })}
                </Accordion>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex justify-between items-center gap-2 mb-3">
                  <Button
                    fullWidth
                    onClick={() => {
                      onOpenChange(false);
                    }}
                    size="lg"
                    color="default"
                    variant="flat"
                    className="font-medium"
                    startContent={<CirclePlus size={20} className="mb-0.5" />}
                  >
                    Add Item
                  </Button>
                  <Button
                    fullWidth
                    spinner={<Loader size={20} className="animate-spin" />}
                    isLoading={isLoading}
                    onClick={handleCheckout}
                    size="lg"
                    color="primary"
                    className="font-medium"
                    endContent={<ChevronsRight />}
                  >
                    Checkout
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
