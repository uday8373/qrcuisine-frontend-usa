import { Button, Card, CardFooter } from "@nextui-org/react";
import { SquareDot, SquarePen } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CartButton from "../button/Cart-Button";
import { siteConfig } from "@/config/site";

const MenuGrid = ({
  menuItem,
  onCartChange,
  cartItems,
  onCustomizedOpen,
  setSelecetedFoodItem,
}) => {
  const [isCustomized, setIsCustomized] = useState(false);

  const getQuantityForItem = (menuItemId) => {
    const item = cartItems?.find((item) => item.id === menuItemId);
    return item ? item.quantity : 0;
  };

  const getCustomization = () => {
    const item = cartItems.find((item) => item.id === menuItem?.id);
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

  useEffect(() => {
    getCustomization();
  }, [cartItems]);

  const handleOpenCustomized = () => {
    setSelecetedFoodItem(menuItem);
    onCustomizedOpen(true);
  };

  return (
    <Card radius="md" className="border w-full relative shadow-none">
      <Image
        alt={menuItem.food_name}
        title={menuItem.food_name}
        className="object-cover w-full h-44"
        src={
          menuItem.image
            ? menuItem.image
            : "https://res.cloudinary.com/dhflg7es7/image/upload/v1719330520/KidsQuiz/674_1_qxxwlb.jpg"
        }
        width={512}
        height={512}
      />
      {isCustomized && (
        <div className="absolute right-2 top-2">
          <Button
            onClick={handleOpenCustomized}
            color="secondary"
            variant="solid"
            size="sm"
            isIconOnly
          >
            <SquarePen size={18} />
          </Button>
        </div>
      )}
      <CardFooter className="bg-background/85 backdrop-blur-xl overflow-hidden py-1 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className="w-full flex flex-col gap-1 py-1">
          <div className="w-full flex">
            <p
              className={`text-small font-semibold line-clamp-1 text-default-800`}
            >
              {menuItem.food_name.length > 16
                ? `${menuItem.food_name.substring(0, 16)}...`
                : menuItem.food_name}
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p
              className={`text-tiny font-medium line-clamp-1 text-default-600`}
            >
              {siteConfig?.currencySymbol}
              {menuItem?.price.toFixed(2)}
            </p>
            <SquareDot
              size={18}
              className={`${menuItem?.is_veg ? "text-success" : "text-danger"}`}
            />
          </div>
          <div className="w-full flex pt-1 justify-between items-center">
            <CartButton
              fullWidth
              menuItem={menuItem}
              onCartChange={onCartChange}
              quantity={getQuantityForItem(menuItem.id)}
              onCustomizedOpen={onCustomizedOpen}
              setSelecetedFoodItem={setSelecetedFoodItem}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MenuGrid;
