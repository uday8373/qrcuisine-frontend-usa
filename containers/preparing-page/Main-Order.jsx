import OrderPreview from "@/components/modal/Order-Preview";
import { Button, Progress, useDisclosure } from "@nextui-org/react";
import { CircleX, ReceiptText } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const MainOrder = ({ orderData, statusData, notifications }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    <section id="suborder">
      <div
        className={`w-full flex flex-col gap-1 px-5 ${
          notifications.length < 1 && "mt-3"
        }`}
      >
        <h2 className="text-default-700 font-medium text-medium">My Orders</h2>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex flex-col bg-default-100 rounded-large px-3 py-4 border justify-between items-center gap-5">
            <div className="w-full flex justify-between items-center">
              <h3 className="text-default-500 font-medium text-small">
                Order ID : {orderData?.order_id}
              </h3>
              <h3 className="text-default-500 font-medium text-small">
                {moment(orderData?.created_at).fromNow()}
              </h3>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-1">
              <h2
                className={`text-xl font-bold text-center ${
                  orderData?.status_id?.sorting === 1
                    ? "text-blue-500"
                    : orderData?.status_id?.sorting === 2
                    ? "text-primary-500"
                    : orderData?.status_id?.sorting === 3
                    ? "text-secondary-500"
                    : orderData?.status_id?.sorting === 4
                    ? "text-success-500"
                    : orderData?.status_id?.sorting === 5
                    ? "text-red-500"
                    : "text-amber-600"
                }`}
              >
                Order {orderData?.status_id?.title}
              </h2>
              <h3 className="text-default-500  text-small">
                Waiting Time: {remainingTime || "Loading..."}
              </h3>

              <div className="w-full mt-2">
                <Progress
                  classNames={{
                    indicator: `${
                      orderData?.status_id?.sorting === 1
                        ? "bg-blue-500"
                        : orderData?.status_id?.sorting === 2
                        ? "bg-primary-500"
                        : orderData?.status_id?.sorting === 3
                        ? "bg-secondary-500"
                        : orderData?.status_id?.sorting === 4
                        ? "bg-success-500"
                        : orderData?.status_id?.sorting === 5
                        ? "bg-red-500"
                        : "bg-amber-600"
                    }`,
                  }}
                  aria-label="status"
                  value={orderData?.status_id?.sorting}
                  minValue={0.88}
                  maxValue={
                    orderData?.status_id?.sorting === 5
                      ? statusData.length - 1
                      : orderData?.status_id?.sorting === 6
                      ? statusData.length
                      : statusData.length - 2
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-default-600 w-full mt-2">
                  {statusData &&
                    statusData
                      .filter((status, index) => {
                        if (orderData?.status_id?.sorting === 5) {
                          return index === 0 || index === 4;
                        } else if (orderData?.status_id?.sorting === 6) {
                          return index === 0 || index === 5;
                        }
                        return status.sorting < 5;
                      })
                      .map((status, index) => (
                        <span key={index}>{status.title}</span>
                      ))}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center gap-2">
              {orderData?.sub_orders.length < 1 &&
                orderData?.status_id?.sorting === 1 && (
                  <Button
                    fullWidth
                    size="md"
                    color="danger"
                    variant="flat"
                    startContent={<CircleX size={18} />}
                  >
                    Cancel Order
                  </Button>
                )}
              <Button
                size="md"
                fullWidth
                color="primary"
                startContent={<ReceiptText size={18} />}
                onClick={onOpen}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
      <OrderPreview
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        foodData={orderData?.fooditem_ids}
        totalAmount={orderData?.total_amount}
      />
    </section>
  );
};

export default MainOrder;
