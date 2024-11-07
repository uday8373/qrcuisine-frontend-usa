import CancelSubOrder from "@/components/modal/Cancel-Suborder";
import OrderPreview from "@/components/modal/Order-Preview";
import { Button, Progress, useDisclosure } from "@nextui-org/react";
import { CircleX, ReceiptText } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const SubOrders = ({ orderData, statusData }) => {
  const [remainingTimes, setRemainingTimes] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onOpenChange: onCancelOpenChange,
  } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!orderData?.sub_orders) return;

    const updateTimes = () => {
      const updatedTimes = {};

      orderData.sub_orders.forEach((order) => {
        const targetTime =
          new Date(order?.created_at).getTime() +
          order.preparation_time * 60000;

        const now = new Date().getTime();
        const timeLeft = targetTime - now;

        if (timeLeft <= 0) {
          updatedTimes[order.sub_order_id] = "Over";
        } else {
          const minutes = Math.ceil(timeLeft / 60000);
          updatedTimes[order.sub_order_id] = `${minutes} mins`;
        }
      });

      setRemainingTimes(updatedTimes);
    };

    updateTimes();

    const timeoutId = setTimeout(() => {
      updateTimes();
    }, 60000);

    return () => clearTimeout(timeoutId);
  }, [orderData]);

  return (
    <section id="suborder">
      <div className="w-full flex flex-col gap-1 px-5 mb-56 mt-3 ">
        <div className="w-full flex flex-col gap-3">
          {orderData?.sub_orders &&
            orderData.sub_orders
              .sort((a, b) => a.status_id.sorting - b.status_id.sorting)
              .map((order, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col bg-default-100 rounded-large px-3 py-4 border justify-between items-center gap-5"
                >
                  <div className="w-full flex justify-between items-center">
                    <h3 className="text-default-500 font-medium text-small">
                      Order ID : {order?.sub_order_id}
                    </h3>
                    <h3 className="text-default-500 font-medium text-small">
                      {moment(order?.created_at).fromNow()}
                    </h3>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center gap-1">
                    <h2
                      className={`text-xl font-bold text-center ${
                        order?.status_id?.sorting === 1
                          ? "text-blue-500"
                          : order?.status_id?.sorting === 2
                          ? "text-primary-500"
                          : order?.status_id?.sorting === 3
                          ? "text-secondary-500"
                          : order?.status_id?.sorting === 4
                          ? "text-success-500"
                          : order?.status_id?.sorting === 5
                          ? "text-red-500"
                          : "text-amber-600"
                      }`}
                    >
                      Order {order?.status_id?.title}
                    </h2>
                    <h3 className="text-default-500  text-small">
                      Waiting Time:{" "}
                      {remainingTimes[order?.sub_order_id] || "Loading..."}
                    </h3>

                    <div className="w-full mt-2">
                      <Progress
                        classNames={{
                          indicator: `${
                            order?.status_id?.sorting === 1
                              ? "bg-blue-500"
                              : order?.status_id?.sorting === 2
                              ? "bg-primary-500"
                              : order?.status_id?.sorting === 3
                              ? "bg-secondary-500"
                              : order?.status_id?.sorting === 4
                              ? "bg-success-500"
                              : order?.status_id?.sorting === 5
                              ? "bg-red-500"
                              : "bg-amber-600"
                          }`,
                        }}
                        aria-label="status"
                        value={order?.status_id?.sorting}
                        minValue={0.88}
                        maxValue={
                          order?.status_id?.sorting === 5
                            ? statusData.length - 1
                            : order?.status_id?.sorting === 6
                            ? statusData.length
                            : statusData.length - 2
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-default-600 w-full mt-2">
                        {statusData &&
                          statusData
                            .filter((status, index) => {
                              if (order?.status_id?.sorting === 5) {
                                return index === 0 || index === 4;
                              } else if (order?.status_id?.sorting === 6) {
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
                    {order?.status_id?.sorting === 1 && (
                      <Button
                        fullWidth
                        size="md"
                        color="danger"
                        variant="flat"
                        startContent={<CircleX size={18} />}
                        onClick={() => {
                          setSelectedOrder(order);
                          onCancelOpenChange(true);
                        }}
                      >
                        Cancel Order
                      </Button>
                    )}
                    <Button
                      size="md"
                      fullWidth
                      color="primary"
                      startContent={<ReceiptText size={18} />}
                      onClick={() => {
                        setSelectedOrder(order);
                        onOpenChange(true);
                      }}
                    >
                      View Order
                    </Button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <OrderPreview
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        foodData={selectedOrder?.fooditem_ids}
        totalAmount={selectedOrder?.total_amount}
      />
      <CancelSubOrder
        orderData={selectedOrder}
        isOpen={isCancelOpen}
        onOpenChange={onCancelOpenChange}
        statusData={statusData}
      />
    </section>
  );
};

export default SubOrders;
