"use client";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

const CartButton = ({
  menuItem,
  onCartChange,
  quantity: initialQuantity,
  fullWidth = false,
  onCustomizedOpen,
  setSelecetedFoodItem,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleAddClick = () => {
    setQuantity(1);
    onCartChange(menuItem, 1);
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onCartChange(menuItem, newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onCartChange(menuItem, newQuantity);
    } else {
      setQuantity(0);
      onCartChange(menuItem, 0);
    }
  };

  const handleOpenCustomized = () => {
    setSelecetedFoodItem(menuItem);
    onCustomizedOpen(true);
  };

  return (
    <div className={`${fullWidth && "w-full"}`}>
      {quantity === 0 ? (
        <Button
          size="sm"
          variant="solid"
          color="primary"
          radius="sm"
          className={`text-small font-semibold shadow-sm ${
            fullWidth ? "w-full" : "w-24"
          }`}
          onClick={
            menuItem?.is_customized ? handleOpenCustomized : handleAddClick
          }
        >
          Add
        </Button>
      ) : (
        <ButtonGroup
          radius="sm"
          size="sm"
          className={`bg-default-100 rounded-lg shadow-sm ${
            fullWidth ? "w-full" : "w-auto"
          }`}
        >
          <Button
            className={`${fullWidth && "w-full"}`}
            isIconOnly
            color="primary"
            aria-label="Decrease"
            size="sm"
            onClick={handleDecrement}
          >
            {quantity === 1 ? (
              <Trash2 className="w-4 h-4 text-white" />
            ) : (
              <Minus className="w-4 h-4 fill-white" />
            )}
          </Button>
          <h3
            className={`${
              fullWidth ? "w-28" : "w-8"
            } flex justify-center font-bold`}
          >
            {quantity}
          </h3>
          <Button
            className={`${fullWidth && "w-full"}`}
            isIconOnly
            color="primary"
            aria-label="Increase"
            size="sm"
            onClick={handleIncrement}
            isDisabled={quantity === 10}
          >
            <Plus className="w-4 h-4 fill-white" />
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default CartButton;
