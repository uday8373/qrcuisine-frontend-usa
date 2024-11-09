import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Slider,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { SquareDot } from "lucide-react";
import { Checkbox } from "../checkbox/Checkbox";
import { useEffect, useState } from "react";
import supabase from "@/config/supabase";
import { siteConfig } from "@/config/site";

export default function CustomizedModal({
  isOpen,
  onOpenChange,
  selecetedFoodItem,
  onCartChange,
  cartItems,
}) {
  const [data, setData] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [selectedInstructions, setSelectedInstructions] = useState(null);
  const [selectedSides, setSelectedSides] = useState(null);
  const [selectedAdditionalSides, setSelectedAdditionalSides] = useState(null);
  const [selectedTemperature, setSelectedTemperature] = useState({ value: 0 });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCustomized, setIsCustomized] = useState(true);
  const [errors, setErrors] = useState({
    quantity: false,
    temperature: false,
    sides: false,
    additionalSides: false,
  });

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .rpc("fetch_group_data", {
          _group_id_food_quantity: selecetedFoodItem?.quantity_id || null,
          _group_id_quick_instructions:
            selecetedFoodItem?.quick_instruction_id || null,
          _fetch_temperature: selecetedFoodItem?.is_temperature || false,
          _group_id_food_sides: selecetedFoodItem?.side_id || null,
          _group_id_additional_sides:
            selecetedFoodItem?.additional_side_id || null,
        })
        .single();

      if (error) throw error;

      setData(data);
    } catch (error) {
      console.error("Error fetching group data:", error.message);
    }
  };

  useEffect(() => {
    if (selecetedFoodItem) {
      getInitialCustomization();
      getCustomization();
      fetchData();
    }
  }, [selecetedFoodItem, isOpen]);

  const handleQuantityChange = (quantity) => {
    if (selectedQuantity?.id === quantity.id) {
      setSelectedQuantity(null);
      return;
    }
    setSelectedQuantity(quantity);
  };

  const handleInstructionsChange = (instructions) => {
    if (selectedInstructions?.id === instructions.id) {
      setSelectedInstructions(null);
      return;
    }
    setSelectedInstructions(instructions);
  };

  const handleSidesChange = (sideId) => {
    const selectedSide = data?.food_sides.find((side) => side.id === sideId);
    if (selectedSides?.id === selectedSide?.id) {
      setSelectedSides(null);
    } else {
      setSelectedSides(selectedSide);
    }
  };

  const handleAdditionalSidesChange = (additionalSideId) => {
    const selectedAdditionalSide = data?.additional_sides.find(
      (side) => side.id === additionalSideId
    );
    if (selectedAdditionalSides?.id === selectedAdditionalSide?.id) {
      setSelectedAdditionalSides(null);
    } else {
      setSelectedAdditionalSides(selectedAdditionalSide);
    }
  };

  const getQuantityForItem = (menuItemId) => {
    const item = cartItems.find((item) => item.id === menuItemId);
    return item ? item.quantity : 0;
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [
    selecetedFoodItem,
    selectedQuantity,
    selectedAdditionalSides,
    selectedTemperature,
    selectedSides,
    selectedInstructions,
    cartItems,
    onCartChange,
  ]);

  const calculateCusmizationPrice = () => {
    let totalPrice = selecetedFoodItem?.price || 0;

    if (selectedQuantity?.price) {
      totalPrice += selectedQuantity.price;
    }

    if (selectedSides?.price) {
      totalPrice += selectedSides.price;
    }

    if (selectedAdditionalSides?.price) {
      totalPrice += selectedAdditionalSides.price;
    }

    if (selectedTemperature?.price) {
      totalPrice += selectedTemperature.price;
    }

    if (selectedInstructions?.price) {
      totalPrice += selectedInstructions?.price;
    }

    return totalPrice;
  };

  const calculateTotalPrice = () => {
    const calculateQuantity = getQuantityForItem(selecetedFoodItem?.id);
    const quantity = parseInt(calculateQuantity === 0 ? 1 : calculateQuantity);

    let totalPrice = selecetedFoodItem?.price || 0;

    if (selectedQuantity?.price) {
      totalPrice += selectedQuantity.price;
    }

    if (selectedSides?.price) {
      totalPrice += selectedSides.price;
    }

    if (selectedAdditionalSides?.price) {
      totalPrice += selectedAdditionalSides.price;
    }

    if (selectedTemperature?.price) {
      totalPrice += selectedTemperature.price;
    }

    if (selectedInstructions?.price) {
      totalPrice += selectedInstructions?.price;
    }

    totalPrice *= quantity;

    setTotalPrice(totalPrice);
  };

  const validateFields = () => {
    const errors = {
      quantity: selecetedFoodItem?.quantity_id ? !selectedQuantity : false,
      temperature: selecetedFoodItem?.is_temperature
        ? selectedTemperature.value === 0
        : false,
      sides: selecetedFoodItem?.side_id ? !selectedSides : false,
      additionalSides: selecetedFoodItem?.additional_side_id
        ? !selectedAdditionalSides
        : false,
    };

    setErrors(errors);
    return !Object.values(errors).some((hasError) => hasError);
  };

  const resetSelections = () => {
    setSelectedQuantity(null);
    setSelectedInstructions(null);
    setSelectedSides(null);
    setSelectedAdditionalSides(null);
    setSelectedTemperature({ value: 0 });
    setIsCustomized(false);
    setErrors({
      quantity: false,
      temperature: false,
      sides: false,
      additionalSides: false,
    });
  };

  const handleSave = () => {
    if (validateFields()) {
      onCartChange(selecetedFoodItem, 1, {
        selectedQuantity,
        selectedInstructions,
        selectedSides,
        selectedAdditionalSides,
        selectedTemperature,
        price: calculateCusmizationPrice(),
        basePrice: selecetedFoodItem.price,
      });
      resetSelections();
      onOpenChange(false);
    }
  };

  const getInitialCustomization = () => {
    const item = cartItems.find((item) => item.id === selecetedFoodItem?.id);
    if (!item) {
      resetSelections();
    } else {
      setSelectedQuantity(item?.selectedQuantity);
      setSelectedInstructions(item?.selectedInstructions);
      setSelectedSides(item?.selectedSides);
      setSelectedAdditionalSides(item?.selectedAdditionalSides);
      setSelectedTemperature(item?.selectedTemperature);
    }
  };

  const getCustomization = () => {
    const item = cartItems.find((item) => item.id === selecetedFoodItem?.id);
    if (!item) {
      setIsCustomized(false);
      return;
    }
    if (
      item?.selectedQuantity ||
      item?.selectedInstructions ||
      item?.selectedSides ||
      item?.selectedAdditionalSides ||
      item?.selectedTemperature
    ) {
      setIsCustomized(true);
      return;
    }
    setIsCustomized(false);
  };

  const handleUpdate = () => {
    if (validateFields()) {
      const item = cartItems.find((item) => item.id === selecetedFoodItem?.id);
      onCartChange(selecetedFoodItem, item?.orderQuantity, {
        selectedQuantity,
        selectedInstructions,
        selectedSides,
        selectedAdditionalSides,
        selectedTemperature,
        price: calculateCusmizationPrice(),
        basePrice: selecetedFoodItem.price,
      });
      resetSelections();
      onOpenChange(false);
    }
  };

  const modalClose = () => {
    resetSelections();
    setErrors({
      quantity: false,
      temperature: false,
      sides: false,
      additionalSides: false,
    });
    onOpenChange(false);
  };

  return (
    <>
      <Modal
        scrollBehavior="inside"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={modalClose}
        classNames={{
          header: "border-b-2 border-dotted",
          footer: "border-t-2 border-dotted",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-2 ">
                <SquareDot
                  size={24}
                  className={`${
                    selecetedFoodItem?.is_veg
                      ? "text-success"
                      : "text-danger-500"
                  } mt-0.5`}
                />
                <div className="w-full flex flex-col gap-1">
                  <h4 className="text-default-800 font-medium text-large line-clamp-1">
                    {selecetedFoodItem?.food_name}
                  </h4>
                  <h5 className="text-primary text-medium leading-none">
                    {siteConfig?.currencySymbol}
                    {selecetedFoodItem?.price.toFixed(2)}/-
                  </h5>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col mt-2 gap-x-5 gap-y-0.5">
                  {data?.food_quantity && (
                    <div className="w-full col-span-1 flex flex-col gap-2">
                      <h3 className="text-small font-medium text-default-700">
                        Quantity{" "}
                        <span className="text-danger font-semibold">*</span>
                      </h3>
                      <div className="w-full flex gap-2 flex-wrap">
                        {data?.food_quantity.map((quantity, index) => (
                          <Checkbox
                            isSelected={selectedQuantity?.id === quantity?.id}
                            onChange={() => handleQuantityChange(quantity)}
                            key={index}
                            value={quantity?.id}
                          >
                            {quantity?.title}{" "}
                            <span className={`${quantity?.price && "pl-1"}`}>
                              {!quantity.price ? null : (
                                <>
                                  ({siteConfig.currencySymbol}
                                  {quantity.price?.toFixed(2)})
                                </>
                              )}
                            </span>
                          </Checkbox>
                        ))}
                      </div>
                      <div className="min-h-4">
                        {errors.quantity && (
                          <p className="text-danger text-xs">
                            Please select a quantity.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {data?.quick_instructions && (
                    <div className="w-full col-span-1 flex flex-col gap-2">
                      <h3 className="text-small font-medium text-default-700">
                        Quick Instruction
                      </h3>
                      <div className="w-full flex gap-2 flex-wrap">
                        {data?.quick_instructions.map((instraction, index) => (
                          <Checkbox
                            isSelected={
                              selectedInstructions?.id === instraction?.id
                            }
                            onChange={() =>
                              handleInstructionsChange(instraction)
                            }
                            key={index}
                            value={instraction?.id}
                          >
                            {instraction?.title}{" "}
                            <span className={`${instraction.price && "pl-1"}`}>
                              {!instraction.price ? null : (
                                <>
                                  ({siteConfig.currencySymbol}
                                  {instraction.price?.toFixed(2)})
                                </>
                              )}
                            </span>
                          </Checkbox>
                        ))}
                      </div>
                      <div className="min-h-4" />
                    </div>
                  )}
                  {data?.temperature && (
                    <div className="w-full col-span-2 flex flex-col gap-2 ">
                      <h3 className="text-small font-medium text-default-700">
                        Temperature{" "}
                        <span className="text-danger font-semibold">*</span>
                      </h3>
                      <div className="w-full flex gap-2">
                        <Slider
                          classNames={{
                            mark: "text-xs pt-1",
                            base: "max-w-md gap-3",
                            track: "border-s-secondary-500",
                            filler:
                              "bg-gradient-to-r from-secondary-500 to-danger-500",
                          }}
                          aria-label="temperature"
                          showSteps={true}
                          color="danger"
                          size="md"
                          step={20}
                          value={selectedTemperature?.value}
                          minValue={0}
                          maxValue={Math.max(
                            ...data.temperature.map((temp) => temp.value)
                          )}
                          marks={data.temperature.map((temp) => ({
                            value: temp.value,
                            label: temp.title,
                          }))}
                          defaultValue={0}
                          onChange={(value) => {
                            const selectedTemp = data.temperature.find(
                              (temp) => temp.value === value
                            );
                            setSelectedTemperature(selectedTemp);
                          }}
                          className="w-full"
                        />
                      </div>
                      <div className="min-h-4">
                        {errors.temperature && (
                          <p className="text-danger text-xs">
                            Please select a temperature.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {data?.food_sides && (
                    <div className="w-full col-span-1 flex flex-col gap-2 ">
                      <h3 className="text-small font-medium text-default-700">
                        Choose Sides{" "}
                        <span className="text-danger font-semibold">*</span>
                      </h3>
                      <Select
                        classNames={{
                          trigger: ` !border`,
                        }}
                        aria-label="sides"
                        variant="faded"
                        size="md"
                        radius="sm"
                        placeholder="Choose favorite side"
                        className="w-full mb-2 "
                        selectionMode="single"
                        onSelectionChange={(value) =>
                          handleSidesChange(value.currentKey)
                        }
                        selectedKeys={[selectedSides?.id]}
                        renderValue={(items) => {
                          return items.map((item) => (
                            <div
                              key={item.key}
                              className="flex items-center gap-2"
                            >
                              <div className="flex">
                                <span>{selectedSides.title}</span>
                                <span className="pl-2">
                                  {selectedSides?.price
                                    ? `(${
                                        siteConfig?.currencySymbol
                                      }${selectedSides?.price.toFixed(2)})`
                                    : null}
                                </span>
                              </div>
                            </div>
                          ));
                        }}
                      >
                        {data?.food_sides.map((side, index) => (
                          <SelectItem
                            key={side?.id}
                            value={side?.id}
                            endContent={
                              <span>
                                {side?.price
                                  ? `${
                                      siteConfig?.currencySymbol
                                    }${side?.price.toFixed(2)}`
                                  : null}
                              </span>
                            }
                          >
                            {side?.title}
                          </SelectItem>
                        ))}
                      </Select>
                      <div className="w-full flex gap-2 relative flex-wrap">
                        {data?.food_sides.slice(0, 3).map((side, index) => (
                          <Checkbox
                            isSelected={selectedSides?.id === side?.id}
                            onChange={() => handleSidesChange(side.id)}
                            key={index}
                            value={side?.id}
                          >
                            {side?.title}
                            <span className={`${side.price && "pl-1"}`}>
                              {!side.price ? null : (
                                <>
                                  ({siteConfig.currencySymbol}
                                  {side.price?.toFixed(2)})
                                </>
                              )}
                            </span>
                          </Checkbox>
                        ))}
                      </div>
                      <div className="min-h-4">
                        {errors.sides && (
                          <p className="text-danger text-xs">
                            Please select a side.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {data?.additional_sides && (
                    <div className="w-full col-span-1 flex flex-col gap-2">
                      <h3 className="text-small font-medium text-default-700">
                        Additional Sides{" "}
                        <span className="text-danger font-semibold">*</span>
                      </h3>
                      <Select
                        classNames={{
                          trigger: ` !border`,
                        }}
                        radius="sm"
                        aria-label="additional"
                        variant="faded"
                        size="md"
                        placeholder="Choose additional side"
                        className="w-full mb-2"
                        selectionMode="single"
                        onSelectionChange={(value) =>
                          handleAdditionalSidesChange(value.currentKey)
                        }
                        selectedKeys={[selectedAdditionalSides?.id]}
                        renderValue={(items) => {
                          return items.map((item) => (
                            <div
                              key={item.key}
                              className="flex items-center gap-2"
                            >
                              <div className="flex">
                                <span>{selectedAdditionalSides.title}</span>
                                <span className="pl-2">
                                  {selectedAdditionalSides?.price
                                    ? `(${
                                        siteConfig?.currencySymbol
                                      }${selectedAdditionalSides?.price.toFixed(
                                        1
                                      )})`
                                    : null}
                                </span>
                              </div>
                            </div>
                          ));
                        }}
                      >
                        {data?.additional_sides.map((side, index) => (
                          <SelectItem
                            endContent={
                              <span>
                                {side?.price
                                  ? `${
                                      siteConfig?.currencySymbol
                                    }${side?.price.toFixed(2)}`
                                  : null}
                              </span>
                            }
                            key={side?.id}
                            value={side?.id}
                          >
                            {side?.title}
                          </SelectItem>
                        ))}
                      </Select>
                      <div className="w-full flex gap-2 flex-wrap">
                        {data?.additional_sides
                          .slice(0, 3)
                          .map((side, index) => (
                            <Checkbox
                              isSelected={
                                selectedAdditionalSides?.id === side?.id
                              }
                              onChange={() =>
                                handleAdditionalSidesChange(side.id)
                              }
                              key={index}
                              value={side?.id}
                            >
                              {side?.title}
                              <span className={`${side.price && "pl-1"}`}>
                                {!side.price ? null : (
                                  <>
                                    ({siteConfig.currencySymbol}
                                    {side.price?.toFixed(2)})
                                  </>
                                )}
                              </span>
                            </Checkbox>
                          ))}
                      </div>
                      <div className="min-h-4">
                        {errors.additionalSides && (
                          <p className="text-danger text-xs">
                            Please select an additional side.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex justify-between items-center mb-5">
                  <div className="flex flex-col">
                    <h3 className="text-xs font-medium text-default-500">
                      Total Amount
                    </h3>
                    <h2 className="text-xl font-bold text-primary-500">
                      {siteConfig?.currencySymbol}
                      {totalPrice.toFixed(2)}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    {isCustomized ? (
                      <Button
                        onClick={handleUpdate}
                        color="secondary"
                        variant="solid"
                        size="md"
                        className="font-medium"
                      >
                        Update Changes
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSave}
                        color="primary"
                        variant="solid"
                        size="md"
                        className="font-medium"
                      >
                        Save Changes
                      </Button>
                    )}
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
