import { Button, Image, Input } from "@nextui-org/react";
import { ChevronsDown, Search, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Categories = ({ categoryData, selectedCategory, onCategoryChange }) => {
  const [seeAll, setSeeAll] = useState(false);
  return (
    <section
      id="search-bar"
      className="px-5 relative bg-background flex flex-col gap-2.5"
    >
      <div className="w-full flex justify-between items-center gap-3">
        <h4 className="text-default-800 text-large font-medium">Categories</h4>
        <div
          onClick={() => {
            setSeeAll(!seeAll);
          }}
          className="flex gap-1 items-center"
        >
          <h4 className="text-medium text-default-600 underline underline-offset-2 decoration-dotted">
            See all
          </h4>
          <ChevronsDown
            size={20}
            className={`text-default-500 transition-all duration-500 ${
              seeAll && "-rotate-180"
            }`}
          />
        </div>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          initial={{ height: seeAll ? "88px" : "auto" }}
          animate={{ height: seeAll ? "auto" : "88px" }}
          exit={{ height: "88px" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full flex items-center gap-2 flex-wrap overflow-hidden"
        >
          <Button
            onClick={() => onCategoryChange("all")}
            className={`font-medium flex-grow ${
              selectedCategory !== "all" && "text-default-600 !border"
            }`}
            size="md"
            color={selectedCategory === "all" ? "primary" : "default"}
            variant={selectedCategory === "all" ? "solid" : "faded"}
            aria-label="all"
            startContent={
              <span className="font-bold text-xl leading-none">🍽️</span>
            }
          >
            <span className="text-sm">All</span>
          </Button>
          {categoryData &&
            categoryData.map((item, index) => (
              <Button
                onClick={() => onCategoryChange(item?.id)}
                key={index}
                className={`font-medium flex-grow ${
                  selectedCategory !== item?.id && "text-default-600 !border"
                }`}
                size="md"
                color={selectedCategory === item?.id ? "primary" : "default"}
                variant={selectedCategory === item?.id ? "solid" : "faded"}
                aria-label={item?.category_name}
                startContent={
                  <span className="font-bold text-xl leading-none">
                    {item?.icon || "🍽️"}
                  </span>
                }
              >
                <span className="text-sm">{item?.category_name}</span>
              </Button>
            ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default Categories;
