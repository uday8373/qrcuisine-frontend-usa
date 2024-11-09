import { Avatar, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { AlignLeft, X } from "lucide-react";
import ProfileSidebar from "@/components/drawer/Profile-Sidebar";

const Header = ({ restaurantData, tableData, userId, isSuborder }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const formatTableNumber = (tableNo) => {
    return tableNo && tableNo < 10 ? `0${tableNo}` : tableNo;
  };
  return (
    <>
      <section
        id="checkout_header"
        className="pl-5 relative bg-background z-50 border-b"
      >
        <div className="flex w-full items-center justify-between  relative">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Button
                size="sm"
                variant="flat"
                color="default"
                isIconOnly
                className="w-10 h-10"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X /> : <AlignLeft />}
              </Button>
              <div className="absolute -top-1 -right-1 z-50">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                </span>
              </div>
            </div>
            <Avatar
              src={restaurantData?.logo}
              className="w-8 h-8 text-large text-white"
            />

            <h1 className="text-medium font-semibold">
              {restaurantData.restaurant_name.length > 15
                ? `${restaurantData.restaurant_name.slice(0, 15)}...`
                : restaurantData.restaurant_name}
            </h1>
          </div>
          <div
            className="bg-secondary flex  flex-col px-4 py-2 justify-center items-center
         h-full "
          >
            <h3 className="text-sm font-bold text-white">TABLE</h3>
            <p className="text-3xl font-black tracking-wider text-white leading-7">
              {formatTableNumber(tableData?.table_no)}
            </p>
          </div>
        </div>
      </section>
      <ProfileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        tableId={tableData?.id}
        restaurantId={restaurantData?.id}
        userId={userId}
        isEndSession={isSuborder ? false : true}
      />
    </>
  );
};

export default Header;
