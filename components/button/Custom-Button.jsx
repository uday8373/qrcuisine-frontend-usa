"use client";
import { Button, ButtonGroup } from "@nextui-org/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const CustomButton = ({ menuItem, onCartChange }) => {
  const [quantity, setQuantity] = useState(menuItem?.quantity || 0);

  useEffect(() => {
    setQuantity(menuItem?.quantity || 0);
  }, [menuItem]);

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

  return (
    <div>
      <ButtonGroup className="bg-default-100 rounded-lg shadow-sm w-auto">
        <Button
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
        <h3 className="w-8 flex justify-center font-bold text-default-700">
          {quantity}
        </h3>
        <Button
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
    </div>
  );
};

export default CustomButton;
