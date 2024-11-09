import ItemButton from "@/components/button/Item-Button";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/react";
import { SquareDot } from "lucide-react";
import React, { useState } from "react";

const ItemList = ({ menuItems, handleCartChange, tableId, restaurantId }) => {
  const [showAll, setShowAll] = useState(false);

  const itemsToShow = showAll ? menuItems : menuItems.slice(0, 5);

  const handleSeeAllClick = () => {
    setShowAll(!showAll);
  };
  return (
    <section id="checkout_itemlist">
      <div className="w-full flex flex-col gap-2 px-5">
        <h2 className="text-default-700 font-medium text-medium mt-3">
          Items Added
        </h2>
        <div className="bg-default-100 px-3 py-4 rounded-large flex flex-col gap-4 w-full ">
          {itemsToShow.map((menuItem, index) => (
            <>
              <div
                key={index}
                className="w-full flex gap-3 justify-between items-center "
              >
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-2 w-full">
                    <SquareDot
                      size={20}
                      className={`${
                        menuItem?.is_veg ? "text-success" : "text-danger"
                      }`}
                    />
                    <div className="flex flex-col w-full gap-2 text-default-600">
                      <h2 className="text-[14px] font-medium line-clamp-2">
                        {menuItem?.food_name}
                      </h2>
                      <div className="flex gap-1 items-center text-default-500">
                        <h2 className="text-small font-medium line-clamp-1 text-[14px]">
                          {siteConfig?.currencySymbol}
                          {menuItem?.price.toFixed(2)} /-
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>

                <ItemButton
                  onCartChange={handleCartChange}
                  menuItem={menuItem}
                  cartItems={menuItems}
                  tableId={tableId}
                  restaurantId={restaurantId}
                />
              </div>

              {index !== menuItems.length - 1 && (
                <div
                  key={index}
                  className="border w-full border-dashed border-default-300"
                />
              )}
            </>
          ))}
          {menuItems.length > 5 && (
            <div className="w-full flex justify-center ">
              <Button
                onPress={handleSeeAllClick}
                color="primary"
                fullWidth="false"
                size="sm"
              >
                {showAll ? "See less" : "See all"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ItemList;
