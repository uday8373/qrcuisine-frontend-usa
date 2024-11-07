import CancelOrder from "@/components/modal/Cancel-Order";
import { Button, useDisclosure } from "@nextui-org/react";
import { Check, CircleX, ConciergeBell, ReceiptText } from "lucide-react";
import React from "react";

const Status = ({ orderData, statusData, notifications, onDetailsOpen }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const activeId = orderData?.status_id?.sorting;

  return (
    <section id="status">
      <div
        className={`w-full flex flex-col gap-1 px-5 mb-56 ${
          notifications.length < 1 && "pt-3"
        }`}
      >
        <h2 className="text-default-700 font-medium text-medium">
          Order Status
        </h2>
        <div className="w-full flex flex-col gap-2 bg-default-100 rounded-large p-3 border">
          {statusData
            .filter((status) => status.sorting < 5)
            .map((status) => (
              <React.Fragment key={status.id}>
                <div className="w-full grid grid-cols-6 items-center py-2">
                  <div
                    className={`w-8 h-8 col-span-1 flex justify-center items-center rounded-full ${
                      status?.id === orderData?.status_id?.id
                        ? "bg-primary"
                        : "bg-transparent"
                    }`}
                  >
                    <h3
                      className={`text-medium font-semibold  ${
                        status?.id === orderData?.status_id?.id
                          ? "text-white"
                          : "text-default-400"
                      }`}
                    >
                      {status?.sorting}
                    </h3>
                  </div>
                  <div className="col-span-4">
                    <h2
                      className={`text-medium font-semibold ${
                        status?.id === orderData?.status_id?.id
                          ? "text-default-800"
                          : "text-default-400"
                      }`}
                    >
                      {status?.title}
                    </h2>
                    {status?.id === orderData?.status_id?.id && (
                      <h3 className="text-small text-default-600 tracking-tighter">
                        {status.description}
                      </h3>
                    )}
                    <div className="w-full flex gap-2">
                      {status?.sorting === 1 &&
                        orderData?.status_id?.sorting === 1 && (
                          <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            className="mt-2 font-medium px-2 gap-1"
                            // startContent={<CircleX size={16} />}
                            onClick={onOpen}
                          >
                            Cancel Order
                          </Button>
                        )}
                      {status?.sorting === activeId && (
                        <Button
                          size="sm"
                          variant="solid"
                          color="primary"
                          className="mt-2 font-medium px-2 gap-1"
                          startContent={<ReceiptText size={16} />}
                          onClick={onDetailsOpen}
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex col-span-1 justify-end">
                    {status?.sorting <= activeId && (
                      <Check
                        className={` ${
                          status?.id === orderData?.status_id?.id
                            ? "text-success mt-3"
                            : "text-default-400"
                        }`}
                      />
                    )}
                  </div>
                </div>
                {status !== statusData[statusData.length - 3] && (
                  <div className="border w-full border-dashed border-default-300" />
                )}
              </React.Fragment>
            ))}
        </div>
      </div>
      <CancelOrder
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        tableId={orderData?.tables?.id}
        userId={orderData?.users?.id}
        orderData={orderData}
        statusData={statusData}
      />
    </section>
  );
};

export default Status;
