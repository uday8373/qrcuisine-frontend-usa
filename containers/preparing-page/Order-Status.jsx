import React, { useEffect, useState } from "react";
import LottieAnimation from "@/components/lottie/LottieAnimation";

import Received from "@/components/lottie/received.json";
import Confirm from "@/components/lottie/confirm.json";
import Preparing from "@/components/lottie/preparing.json";
import { RotateCw } from "lucide-react";
import { Button } from "@nextui-org/react";
const OrderStatus = ({ orderData, handleReload, isRotating }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const { restaurant_id, table_id, status_id } = orderData || {};
  const { logo, restaurant_name } = restaurant_id || {};
  const { table_no } = table_id || {};
  const { sorting } = status_id || {};

  const renderLottieAnimation = (sorting) => {
    switch (sorting) {
      case 1:
        return (
          <LottieAnimation width={80} height={80} animationData={Received} />
        );
      case 2:
        return (
          <LottieAnimation width={80} height={80} animationData={Confirm} />
        );
      case 3:
        return (
          <LottieAnimation width={80} height={80} animationData={Preparing} />
        );
      default:
        return null;
    }
  };

  let bgColorClass = "";
  let textColorClass = "";

  switch (orderData?.status_id?.sorting) {
    case 1:
      bgColorClass = "bg-blue-500";
      textColorClass = "text-blue-500";
      break;
    case 2:
      bgColorClass = "bg-primary";
      textColorClass = "text-primary";
      break;
    case 3:
      bgColorClass = "bg-secondary";
      textColorClass = "text-secondary";
      break;
    default:
      bgColorClass = "bg-default";
      textColorClass = "text-default";
  }

  useEffect(() => {
    if (!orderData) return;

    const targetTime =
      new Date(orderData?.created_at).getTime() +
      orderData.preparation_time * 60000;

    const updateRemainingTime = () => {
      const now = new Date().getTime();
      const timeLeft = targetTime - now;

      if (timeLeft <= 0) {
        setRemainingTime("Over");
      } else {
        const minutes = Math.floor(timeLeft / 60000);
        setRemainingTime(`${minutes} mins`);
      }
    };

    updateRemainingTime();

    const timeoutId = setTimeout(() => {
      updateRemainingTime();
    }, 60000);

    return () => clearTimeout(timeoutId);
  }, [orderData]);

  return (
    <section id="order_status">
      <div
        className={`w-full flex flex-col rounded-b-large ${bgColorClass} px-5 bg-opacity-10 relative`}
      >
        <div className="w-full flex flex-col justify-center items-center gap-1 py-5 relative">
          <div className="absolute top-3 z-10 right-0">
            <Button
              color="default"
              aria-label="Increase"
              size="sm"
              variant="faded"
              onClick={handleReload}
              className="font-medium text-small border"
            >
              Refresh
              <RotateCw
                size={14}
                className={isRotating ? "rotate-animation" : ""}
              />
            </Button>
          </div>
          <div className="w-full flex justify-center flex-col items-center gap-1">
            <h2 className="text-default-600 font-semibold text-xs">
              Order ID : {orderData?.order_id}
            </h2>
          </div>
          <div>{renderLottieAnimation(sorting)}</div>
          <h2 className={`font-semibold text-medium ${textColorClass}`}>
            Order {orderData?.status_id?.title}
          </h2>
          <h3
            className={`text-default-600 text-semibold font-medium text-small`}
          >
            Waiting Time:
            <span className={`${textColorClass} text-small font-bold px-2`}>
              {remainingTime || "Calculating..."}
            </span>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default OrderStatus;
