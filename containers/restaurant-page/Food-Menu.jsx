import MenuGrid from "@/components/cards/Menu-Grid";
import MenuList from "@/components/cards/Menu-List";
import { EmptyData } from "@/components/icons/empty";
import { Button, ScrollShadow } from "@nextui-org/react";
import { LayoutGrid, List, Loader } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const FoodMenu = ({
  menuItems,
  onCartChange,
  cartItems,
  maxItems,
  onLoadMore,
  dataLoading,
  onCustomizedOpen,
  setSelecetedFoodItem,
  subCategoryData,
  handleSubCategoryChange,
  selecetedSubCategory,
  selectedTitle,
}) => {
  const [isList, setIsList] = useState(true);
  const loadMoreRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !dataLoading &&
        maxItems !== menuItems.length
      ) {
        onLoadMore();
      }
    },
    [dataLoading, maxItems, menuItems.length, onLoadMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [handleObserver]);

  return (
    <section
      id="food_menu_section"
      className="flex items-center justify-center w-full overflow-hidden"
    >
      <div className="w-full h-full flex-col max-w-screen-xl relative">
        <div className="w-full flex flex-col px-5 mt-3">
          <div className="w-full flex justify-between items-center gap-3">
            <h4 className="text-default-800 text-large font-medium line-clamp-1">
              {selectedTitle}
            </h4>
            <div className="flex gap-2 items-center">
              <Button
                className={`${!isList && "!border"}`}
                size="sm"
                isIconOnly
                color={isList ? "primary" : "default"}
                variant={isList ? "solid" : "faded"}
                aria-label="list"
                onClick={() => setIsList(true)}
              >
                <List
                  size={20}
                  className={`${
                    isList ? "text-default-50" : "text-default-700"
                  }`}
                />
              </Button>
              <Button
                className={`${isList && "!border"}`}
                size="sm"
                isIconOnly
                color={!isList ? "primary" : "default"}
                variant={!isList ? "solid" : "faded"}
                aria-label="grid"
                onClick={() => setIsList(false)}
              >
                <LayoutGrid
                  size={20}
                  className={`${
                    !isList ? "text-default-50" : "text-default-700"
                  }`}
                />
              </Button>
            </div>
          </div>
          <ScrollShadow
            hideScrollBar
            orientation="horizontal"
            className="w-full overflow-x-auto max-w-full"
            size={0}
          >
            <div className={`inline-flex gap-2 mt-3 mb-4 whitespace-nowrap `}>
              <Button
                size="sm"
                color={selecetedSubCategory === "all" ? "secondary" : "default"}
                variant={selecetedSubCategory === "all" ? "solid" : "faded"}
                className={`font-medium ${
                  selecetedSubCategory !== "all" && "!border text-default-600"
                }`}
                onClick={() => {
                  handleSubCategoryChange("all");
                }}
              >
                All
              </Button>
              {subCategoryData &&
                subCategoryData.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      size="sm"
                      color={
                        selecetedSubCategory === item.id
                          ? "secondary"
                          : "default"
                      }
                      variant={
                        selecetedSubCategory === item.id ? "solid" : "faded"
                      }
                      className={`font-medium ${
                        selecetedSubCategory !== item.id &&
                        "!border text-default-600"
                      }`}
                      onClick={() => {
                        handleSubCategoryChange(item.id);
                      }}
                    >
                      {item?.title}
                    </Button>
                  );
                })}
            </div>
          </ScrollShadow>
        </div>
        <div
          className={`grid gap-2.5 w-full mb-32 px-5 relative ${
            isList ? "grid-cols-1" : "grid-cols-2"
          } `}
        >
          {menuItems.length === 0 ? (
            <div
              className={`text-center py-10 flex flex-col gap-3 justify-center items-center w-full ${
                isList ? "col-span-1" : "col-span-2"
              } `}
            >
              <EmptyData size={85} />
              <p className="text-small">No Food Items Found</p>
            </div>
          ) : (
            menuItems.map((menuItem, index) => (
              <>
                {isList ? (
                  <MenuList
                    menuItem={menuItem}
                    onCartChange={onCartChange}
                    cartItems={cartItems}
                    onCustomizedOpen={onCustomizedOpen}
                    setSelecetedFoodItem={setSelecetedFoodItem}
                  />
                ) : (
                  <MenuGrid
                    key={index}
                    menuItem={menuItem}
                    onCartChange={onCartChange}
                    cartItems={cartItems}
                    onCustomizedOpen={onCustomizedOpen}
                    setSelecetedFoodItem={setSelecetedFoodItem}
                  />
                )}
              </>
            ))
          )}
          {maxItems !== menuItems.length && (
            <div
              ref={loadMoreRef}
              className={`flex justify-center mt-2 w-full ${
                isList ? "col-span-1" : "col-span-2"
              } `}
            >
              <Loader className="text-primary-500 animate-spin" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoodMenu;
