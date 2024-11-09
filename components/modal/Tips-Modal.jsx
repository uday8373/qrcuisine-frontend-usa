import { siteConfig } from "@/config/site";
import supabase from "@/config/supabase";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export default function TipsModal({
  isOpen,
  onOpenChange,
  orderData,
  handleCallWaiter,
  isLoading,
}) {
  const [tip, setTip] = useState(0);
  const [tipData, setTipData] = useState([]);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const { data, error } = await supabase
          .from("tips")
          .select("*")
          .eq("restaurant_id", orderData?.restaurant_id?.id)
          .order("amount", { ascending: true });
        if (error) throw error;
        setTipData(data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };
    fetchTips();
  }, [orderData?.restaurant_id?.id]);

  const handleTipChange = (value) => {
    if (value === tip) {
      setTip(0);
    } else {
      setTip(value);
    }
  };

  const totalAmount = orderData?.total_amount || 0;
  const subOrdersTotal =
    orderData?.sub_orders
      ?.filter((subOrder) => subOrder.is_delivered === true)
      ?.reduce((acc, subOrder) => {
        return acc + (subOrder?.total_amount || 0);
      }, 0) || 0;

  const finalTotalAmount = totalAmount + subOrdersTotal;
  const gstPercentage = orderData?.restaurant_id?.gst_percentage || 0;
  const gstAmount = (finalTotalAmount * gstPercentage) / 100;
  const totalWithGst = finalTotalAmount + gstAmount;

  const handleCustomTipChange = (event) => {
    const value = event.target.value;
    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
      setTip(Number(value) || 0);
    }
  };

  const calculateTipAmount = (amount) => {
    if (orderData?.restaurant_id?.is_tip_percentage) {
      return (amount / 100) * totalWithGst;
    }
    return amount;
  };

  return (
    <>
      <Modal
        classNames={{
          header: "border-b border-dotted",
          footer: "border-t border-dotted",
        }}
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div>
                  <h2 className="text-lg font-medium text-default-900">
                    Add a Tip
                  </h2>
                  <p className="text-default-500 text-small font-normal">
                    {orderData?.restaurant_id?.is_tip_percentage
                      ? "Choose a tip percentage or enter a custom percentage."
                      : "Choose a tip amount or enter a custom tip."}
                  </p>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="w-full grid grid-cols-2 gap-3 py-3">
                  {tipData &&
                    tipData.map((item, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          handleTipChange(calculateTipAmount(item.amount))
                        }
                        className={`${
                          tip === calculateTipAmount(item.amount)
                            ? "bg-secondary-500 border-secondary-500 text-white"
                            : "bg-default-100 border"
                        } w-full flex justify-center items-center rounded-small py-3 text-default-700 font-medium text-medium col-span-1 cursor-pointer`}
                      >
                        {orderData?.restaurant_id?.is_tip_percentage
                          ? `${item?.amount}%`
                          : `${siteConfig?.currencySymbol}${item?.amount}`}
                      </div>
                    ))}
                  {!orderData?.restaurant_id?.is_tip_percentage && (
                    <div className="flex col-span-2 w-full">
                      <Input
                        classNames={{
                          base: "border rounded-small",
                        }}
                        size="lg"
                        radius="sm"
                        fullWidth
                        type="number"
                        placeholder="custom tip"
                        className="!w-full "
                        startContent={<span>{siteConfig.currencySymbol}</span>}
                        value={
                          tip > 0 &&
                          !tipData.some((item) => item.amount === tip)
                            ? tip
                            : ""
                        }
                        onChange={handleCustomTipChange}
                      />
                    </div>
                  )}
                  <div className="space-y-2 text-medium w-full col-span-2 text-default-600">
                    <div className="flex justify-between ">
                      <span>Bill amount:</span>
                      <span>
                        {siteConfig.currencySymbol}
                        {totalWithGst.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between ">
                      <span>{siteConfig?.taxTitle}:</span>
                      <span>
                        {siteConfig.currencySymbol}
                        {gstAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tip amount:</span>
                      {tip === 0 ? (
                        "N/A"
                      ) : (
                        <span>
                          {siteConfig.currencySymbol}
                          {tip.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>
                        {siteConfig.currencySymbol}
                        {(totalWithGst + tip).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  size="lg"
                  fullWidth
                  color="primary"
                  className="font-medium"
                  spinner={<Loader size={20} className="animate-spin" />}
                  isLoading={isLoading}
                  onClick={() =>
                    handleCallWaiter(
                      tip.toFixed(2),
                      (tip + totalWithGst).toFixed(2)
                    )
                  }
                >
                  Confirm {siteConfig.currencySymbol}
                  {(totalWithGst + tip).toFixed(2)}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
