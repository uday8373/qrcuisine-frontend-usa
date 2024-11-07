import { Button } from "@nextui-org/react";
import { ChevronsRight, Loader } from "lucide-react";
import React from "react";
import { siteConfig } from "@/config/site";
import Invoice from "../complete-page/Invoice";

const BillButton = ({ orderData, onOpen }) => {
  const totalAmount = Number(orderData?.total_amount) || 0;

  const subOrdersTotal =
    orderData?.sub_orders
      .filter((subOrder) => subOrder.is_delivered === true)
      .reduce((acc, subOrder) => {
        return acc + (Number(subOrder?.total_amount) || 0);
      }, 0) || 0;

  const finalTotalAmount = totalAmount + subOrdersTotal;

  const gstPercentage = orderData?.restaurant_id?.gst_percentage || 0;
  const gstAmount = (finalTotalAmount * gstPercentage) / 100;

  const totalWithGst = finalTotalAmount + gstAmount;
  return (
    <section id="bill_button_section" className="mb-44">
      <div className="w-full py-5 flex flex-col gap-3 fixed bottom-0 px-5 backdrop-blur-xl shadow-small rounded-t-large">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-col gap-1">
            <h4 className="text-tiny font-medium text-default-700">
              Grand Total{" "}
              <span className="text-tiny font-medium text-danger-500">
                ({siteConfig?.taxTitle} inc*)
              </span>
            </h4>
            <h4 className="text-xl font-bold text-default-900">
              {siteConfig?.currencySymbol}
              {totalWithGst.toFixed(2)}{" "}
            </h4>
          </div>
          <Invoice orderData={orderData} isComplete={false} />
        </div>
        <div className="border-[0.5px] w-full border-dashed border-default-300" />
        <Button
          size="lg"
          spinner={<Loader size={20} className="animate-spin" />}
          fullWidth
          endContent={<ChevronsRight size={20} />}
          color="primary"
          onClick={onOpen}
        >
          Ask For Bill
        </Button>
      </div>
    </section>
  );
};

export default BillButton;
