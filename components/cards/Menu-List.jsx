import { SquareDot, SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";
import CartButton from "../button/Cart-Button";
import { Button, Image, menu } from "@nextui-org/react";
import { siteConfig } from "@/config/site";

const MenuList = ({
  menuItem,
  onCartChange,
  cartItems,
  onCustomizedOpen,
  setSelecetedFoodItem,
}) => {
  const [isCustomized, setIsCustomized] = useState(false);
  const getQuantityForItem = (menuItemId) => {
    const item = cartItems.find((item) => item.id === menuItemId);
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
    <div className="w-full flex justify-between items-center border rounded-medium bg-default-100 min-h-20 overflow-hidden">
      <div className="w-full flex items-center gap-2">
        <div className="relative h-20 w-20 ">
          <Image
            src={menuItem.image}
            alt={menuItem.food_name}
            className="object-cover h-20 w-20"
            radius="none"
          />
          {isCustomized && (
            <div className="absolute left-1 top-1 z-10">
              <Button
                onClick={handleOpenCustomized}
                color="secondary"
                variant="solid"
                size="sm"
                isIconOnly
              >
                <SquarePen size={20} />
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5 text-default-600 flex-1 min-w-0">
          <h2 className="text-[14px] font-medium line-clamp-1">
            {menuItem.food_name}
          </h2>

          <h2 className="text-small font-medium line-clamp-1 text-[14px] leading-tight text-default-500">
            {siteConfig?.currencySymbol}
            {menuItem?.price.toFixed(2)}
          </h2>
          {isCustomized && (
            <h4
              onClick={handleOpenCustomized}
              className="text-xs text-secondary-500 font-bold underline decoration-dotted select-none decoration-2 cursor-pointer"
            >
              View Customizations
            </h4>
          )}
        </div>
      </div>
      <div className="h-full w-32 flex items-center p-3">
        {menuItem?.is_available ? (
          <CartButton
            menuItem={menuItem}
            onCartChange={onCartChange}
            quantity={getQuantityForItem(menuItem.id)}
            onCustomizedOpen={onCustomizedOpen}
            setSelecetedFoodItem={setSelecetedFoodItem}
          />
        ) : (
          <Button
            size="sm"
            variant="light"
            color="danger"
            radius="sm"
            isDisabled
            className={`text-small font-semibold shadow-sm w-32`}
          >
            Not Available
          </Button>
        )}
      </div>
      {/* <div className="w-20 h-20">
        <div className="relative h-20 w-20 ">
          <Image
            src={menuItem.image}
            alt={menuItem.food_name}
            className="object-cover h-20 w-20"
          />
          {isCustomized && (
            <div className="absolute left-1 top-1 z-10">
              <Button
                onClick={handleOpenCustomized}
                color="secondary"
                variant="solid"
                size="sm"
                isIconOnly
              >
                <SquarePen size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex-1  h-full flex flex-col px-3 py-3 gap-1">
        <div className="w-full">
          <h2 className="text-[14px] font-medium line-clamp-1">
            {menuItem.food_name}
          </h2>
        </div>
        <div className="w-full flex justify-between ">
          <h2 className="text-small font-medium line-clamp-1 text-[14px] leading-tight text-default-500">
            {siteConfig?.currencySymbol}
            {menuItem?.price.toFixed(2)}
          </h2>
          <div className="h-full flex items-center w-28 justify-end">
            {menuItem?.is_available ? (
              <CartButton
                menuItem={menuItem}
                onCartChange={onCartChange}
                quantity={getQuantityForItem(menuItem.id)}
                onCustomizedOpen={onCustomizedOpen}
                setSelecetedFoodItem={setSelecetedFoodItem}
              />
            ) : (
              <Button
                size="sm"
                variant="light"
                color="danger"
                radius="sm"
                isDisabled
                className={`text-small font-semibold shadow-sm`}
              >
                Not Available
              </Button>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MenuList;
