import { ChevronRight, CirclePlus, EditIcon } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const Preferences = ({ mainInstructions, onOpen, restaurantName, tableId }) => {
  const router = useRouter();
  const handleCart = () => {
    localStorage.removeItem("status");
    router.push(`/${restaurantName}/${tableId}`);
  };
  return (
    <section id="preferences">
      <div className="w-full flex flex-col gap-2 px-5">
        <h2 className="text-default-700 font-medium text-medium mt-3">
          Preferences
        </h2>
        <div className="bg-default-100 px-3 py-4 rounded-large flex flex-col gap-4 w-full">
          <div
            onClick={handleCart}
            className="w-full flex justify-between items-center"
          >
            <div className="flex gap-3 items-center">
              <CirclePlus size={20} className="text-default-600" />
              <h3 className="text-small font-medium text-default-600">
                Add more items
              </h3>
            </div>
            <ChevronRight className="text-default-600" />
          </div>
          <div className="border w-full border-dashed border-default-300" />
          <div
            onClick={onOpen}
            className="w-full flex justify-between items-center"
          >
            <div className="flex gap-3 items-center w-full">
              <EditIcon size={20} className="text-default-600 self-start" />
              <div className="flex flex-col w-full">
                <h3 className="text-small font-medium text-default-600">
                  Add cooking instructions
                </h3>
                {mainInstructions && (
                  <h3 className="text-tiny text-default-500 pr-2 mt-1 line-clamp-2 w-full leading-tight">
                    {mainInstructions}
                  </h3>
                )}
              </div>
            </div>
            <ChevronRight className="text-default-600" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preferences;
