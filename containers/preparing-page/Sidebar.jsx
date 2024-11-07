import CancelOrder from "@/components/modal/Cancel-Order";
import {
  Avatar,
  Button,
  ButtonGroup,
  Chip,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { ChevronRight, CircleX, Edit, Trophy } from "lucide-react";
import React, { useRef, useEffect } from "react";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  tableId,
  restaurantId,
  orderData,
  statusData,
}) => {
  statusData;
  const sidebarRef = useRef(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const clickEndSession = () => {
    setSidebarOpen(false);
    onOpen();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    const toggleOverflow = () => {
      document.body.style.overflow = sidebarOpen ? "hidden" : "";
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      toggleOverflow();
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      toggleOverflow();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 backdrop-blur-sm z-30" />}

      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-72 bg-background z-40 shadow-small transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex flex-col items-center mb-5 mt-20">
            <Avatar className="w-20 h-20 mb-2" />
            <h2 className="text-large font-semibold text-default-900">
              {orderData?.users?.name}
            </h2>
            <p className="text-sm text-default-500">
              +91 {orderData?.users?.mobile}
            </p>
          </div>

          <div className="flex flex-col items-center justify-between mb-5 bg-secondary-500/20 px-3 py-3 rounded-lg gap-2 relative">
            <div className="w-full flex justify-between">
              <div className="flex flex-col">
                <h3 className="text-[10px] font-bold uppercase">
                  Available Points
                </h3>
                <h2 className="text-2xl font-bold">1050</h2>
              </div>
              <Chip
                startContent={
                  <Image
                    alt="icon"
                    src="/assets/trophy.png"
                    className="w-4 h-4"
                  />
                }
                color="secondary"
                variant="flat"
                size="md"
                className="gap-1 !font-bold flex justify-center items-center"
              >
                Gold
              </Chip>
            </div>
            <h4 className="text-[10px] leading-snug font-medium text-default-600 -mt-1">
              Placed order to earn more loyality points, redeem exciting deals.
            </h4>
            <ButtonGroup
              fullWidth
              size="sm"
              variant="solid"
              color="secondary"
              className="gap-0.5"
            >
              <Button className="font-medium">HISTORY</Button>
              <Button className="font-medium">DETAILS</Button>
            </ButtonGroup>
          </div>

          <div className="flex-1">
            <Button
              variant="flat"
              className="w-full justify-start mb-2 rounded-lg px-3 relative bg-default-100 text-default-700 font-medium text-[15px]"
              size="lg"
            >
              <Trophy size={18} className="mr-1" />
              Leaderboard
              <ChevronRight size={20} className="absolute right-2" />
            </Button>
            <Button
              variant="flat"
              className="w-full justify-start mb-2 rounded-lg px-3 relative bg-default-100 text-default-700 font-medium text-[15px]"
              size="lg"
            >
              <Edit size={18} className="mr-1" />
              Edit Profile
              <ChevronRight size={20} className="absolute right-2" />
            </Button>
            {orderData?.status_id?.sorting === 1 && (
              <Button
                onClick={clickEndSession}
                variant="flat"
                color="danger"
                className="w-full justify-start mb-2 rounded-lg px-3 relative text-danger-500 font-medium text-[15px]"
                size="lg"
              >
                <CircleX size={18} className="mr-1" />
                Cancel Order
                <ChevronRight size={20} className="absolute right-2" />
              </Button>
            )}
          </div>
        </div>
      </aside>
      <CancelOrder
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        tableId={tableId}
        restaurantId={restaurantId}
        userId={orderData?.users?.id}
        orderData={orderData}
        statusData={statusData}
      />
    </>
  );
};

export default Sidebar;
