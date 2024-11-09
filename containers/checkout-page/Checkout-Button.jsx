import CallWaiter from "@/components/modal/Call-Waiter";
import supabase from "@/config/supabase";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  ChevronsRight,
  ClipboardCheck,
  ConciergeBell,
  Loader,
  UserPen,
} from "lucide-react";
import React, { useState, useEffect } from "react";

const CheckoutButton = ({
  onOpen,
  tableData,
  restaurantData,
  loading,
  isSuborder,
  handleSubOrderSubmit,
}) => {
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
    const message = `A customer at Table No. ${tableData?.table_no} has requested a waiter.`;
    const sub_message = "Please attend to the table quickly.";
    const userId = localStorage.getItem("userId");

    const { data, error } = await supabase
      .from("messages")
      .insert({
        table_id: tableData?.id,
        restaurant_id: restaurantData?.id,
        user_id: userId,
        order_id: null,
        waiter_id: null,
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

  return (
    <section
      id="checkout_bottom"
      className="fixed bottom-0 backdrop-blur-xl shadow-small flex justify-center mx-auto w-full px-5 rounded-t-large"
    >
      <div className="py-5 gap-2 w-full grid grid-cols-2">
        <Button
          onPress={handleCallWaiter}
          isDisabled={isCalling}
          size="lg"
          variant="flat"
          aria-label="call waiter"
          className="text-small font-medium rounded-large"
          startContent={<ConciergeBell size={18} className="mb-0.5" />}
        >
          {isCalling
            ? `${Math.floor(countdown / 60)}:${(countdown % 60)
                .toString()
                .padStart(2, "0")}`
            : "Call Waiter"}
        </Button>
        {isSuborder ? (
          <Button
            spinner={<Loader size={20} className="animate-spin" />}
            isLoading={loading}
            onPress={handleSubOrderSubmit}
            size="lg"
            color="primary"
            className="text-small font-medium rounded-large"
            startContent={<ClipboardCheck size={18} className="mb-0.5" />}
          >
            Place Order
          </Button>
        ) : (
          <Button
            isLoading={loading}
            onPress={onOpen}
            size="lg"
            color="primary"
            className="text-small font-medium rounded-large"
            startContent={<UserPen size={18} className="mb-0.5" />}
          >
            Add Details
          </Button>
        )}
      </div>
      <CallWaiter isOpen={isWaiterOpen} onOpenChange={onWaiterOpenChange} />
    </section>
  );
};

export default CheckoutButton;
