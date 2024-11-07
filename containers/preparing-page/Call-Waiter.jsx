import CallWaiter from "@/components/modal/Call-Waiter";
import OrderPreview from "@/components/modal/Order-Preview";
import supabase from "@/config/supabase";
import { Button, useDisclosure } from "@nextui-org/react";
import { CirclePlus, ConciergeBell, ReceiptText } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CallWaiterButton = ({ orderData }) => {
  const router = useRouter();
  const {
    isOpen: isWaiterOpen,
    onOpen: onWaiterOpen,
    onOpenChange: onWaiterOpenChange,
  } = useDisclosure();
  const [isCalling, setIsCalling] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (isCalling && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCalling(false);
    }

    return () => clearInterval(timer);
  }, [isCalling, countdown]);

  const handleCallWaiter = async () => {
    let message = "";
    let sub_message = "";

    if (orderData?.waiter_id?.id) {
      message = `Please call the waiter ${orderData?.waiters?.name} for table no: ${orderData?.tables?.table_no}`;
      sub_message = "Please attend to the table quickly.";
    } else {
      message = `A customer at Table No. ${orderData?.tables?.table_no} has requested a waiter.`;
      sub_message = "Please attend to the table quickly.";
    }

    const { data, error } = await supabase
      .from("messages")
      .insert({
        table_id: orderData.tables.id,
        restaurant_id: orderData.restaurant_id.id,
        user_id: orderData.user_id,
        order_id: orderData.id,
        waiter_id: orderData.waiters?.id,
        message: message,
        sub_message: sub_message,
        is_read: false,
        user_read: true,
      })
      .select("id");
    if (error) {
      return console.error(error);
    } else {
      onWaiterOpen();
      setIsCalling(true);
      setCountdown(120);
    }
  };

  const handleMoreOrder = () => {
    localStorage.setItem("is_suborder", true);
    localStorage.removeItem("status");
    router.replace(
      `/${orderData.restaurant_id.unique_name}/${orderData.tables.id}`
    );
  };

  return (
    <section id="call_waiter_section">
      <div className="w-full fixed bottom-0 px-5 py-5 backdrop-blur-xl bg-background/50 flex flex-col gap-2 shadow-small rounded-t-large">
        <div className="w-full flex gap-2 flex-shrink items-center">
          <div className="flex flex-col w-full">
            <h2 className="text-xs font-medium text-default-500">
              Assigned Waiter :
            </h2>
            <h2 className="text-medium text-default-700 font-medium line-clamp-1">
              {orderData?.waiters?.name ? (
                orderData?.waiters?.name
              ) : (
                <span className="animate-pulse">pending ...</span>
              )}
            </h2>
          </div>
          <Button
            onClick={handleCallWaiter}
            isDisabled={isCalling}
            startContent={<ConciergeBell size={20} className="mb-1" />}
            size="lg"
            fullWidth
            variant="flat"
            color="default"
          >
            {isCalling
              ? `${Math.floor(countdown / 60)}:${(countdown % 60)
                  .toString()
                  .padStart(2, "0")}`
              : "Call Waiter"}
          </Button>
        </div>
        <Button
          onClick={handleMoreOrder}
          fullWidth
          size="lg"
          startContent={<CirclePlus size={20} />}
          color="primary"
          variant="solid"
        >
          Order More Items
        </Button>
      </div>

      <CallWaiter isOpen={isWaiterOpen} onOpenChange={onWaiterOpenChange} />
    </section>
  );
};

export default CallWaiterButton;
