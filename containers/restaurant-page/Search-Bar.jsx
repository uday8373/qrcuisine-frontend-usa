import { fetchSearchMenuData } from "@/apis/restaurantApi";
import MenuList from "@/components/cards/Menu-List";
import { Button, Input } from "@nextui-org/react";
import { Loader, Search, SlidersHorizontal, X } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { EmptyData } from "@/components/icons/empty";

const SearchBar = ({
  restaurantId,
  onCartChange,
  cartItems,
  onCustomizedOpen,
  setSelecetedFoodItem,
}) => {
  const [searchData, setSearchData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const fetchSearchData = useCallback(
    debounce(async (query) => {
      setLoading(!!query);
      if (!query) return setSearchData(null);

      try {
        const result = await fetchSearchMenuData(restaurantId, query);
        setSearchData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 300),
    [restaurantId]
  );

  useEffect(() => {
    fetchSearchData(searchQuery);
    return () => fetchSearchData.cancel();
  }, [searchQuery, fetchSearchData]);

  const renderEndContent = () =>
    loading ? (
      <Loader className="animate-spin text-primary-500" />
    ) : (
      searchQuery && (
        <X
          className="text-default-600 cursor-pointer"
          onClick={() => setSearchQuery("")}
        />
      )
    );

  const renderSearchResults = () => {
    if (!searchData) return null;
    if (searchData.length === 0) {
      return (
        <div className="text-center py-10 flex flex-col gap-3 justify-center items-center w-full">
          <EmptyData size={85} />
          <p className="text-small">No Search Result Found</p>
        </div>
      );
    }
    return (
      <div className="flex w-full flex-col gap-3">
        {searchData.map((menuItem, index) => (
          <MenuList
            key={index}
            menuItem={menuItem}
            onCartChange={onCartChange}
            cartItems={cartItems}
            onCustomizedOpen={onCustomizedOpen}
            setSelecetedFoodItem={setSelecetedFoodItem}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="search-bar"
      className={`px-5 bg-background/80 backdrop-blur-3xl sticky top-0 z-20 py-3 flex flex-col gap-3 ${
        isSticky && "border-b-1"
      }`}
    >
      <div className="w-full flex justify-between items-center gap-3">
        <Input
          classNames={{ inputWrapper: "!border shadow-none" }}
          variant="faded"
          size="lg"
          fullWidth
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for dishes ..."
          startContent={<Search className="text-default-500" />}
          endContent={renderEndContent()}
        />
        {/* <Button
          className="!border"
          size="lg"
          isIconOnly
          color="default"
          variant="faded"
          aria-label="filter"
        >
          <SlidersHorizontal className="text-default-700" />
        </Button> */}
      </div>
      {renderSearchResults()}
    </section>
  );
};

export default SearchBar;
