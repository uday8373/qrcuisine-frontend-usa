"use client";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/config/supabase";
import { clearLocalStorage } from "@/hooks/clearLocalStorage";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import { siteConfig } from "@/config/site";

const CancelOrder = ({
  isOpen,
  onOpenChange,
  tableId,
  userId,
  orderData,
  statusData,
}) => {
  const router = useRouter();
  const [reason, setReason] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reasonData, setReasonData] = useState([]);
  const sortedOrder = statusData?.find((order) => order.sorting === 5);

  const fetchReasonData = async () => {
    const { data, error } = await supabase
      .from("cancelled_reason")
      .select("*")
      .eq("is_admin", false);
    if (error) {
      throw new Error("Error fetching reason data:", error);
    }
    setReasonData(data);
  };

  useEffect(() => {
    fetchReasonData();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const updateTablePromise = supabase
        .from("tables")
        .update({
          is_booked: false,
          persons: null,
          order_id: null,
          user_id: null,
        })
        .eq("id", tableId)
        .select();

      const updateUserPromise = supabase
        .from("users")
        .update({ is_active: false, closed_at: new Date().toISOString() })
        .eq("id", userId)
        .select();

      const updateOrderPromise = supabase
        .from("orders")
        .update({
          is_cancelled: true,
          cancelled_reason: reason,
          status_id: sortedOrder.id,
        })
        .eq("id", orderData.id)
        .select();

      const [
        { data: tableData, error: tableError },
        { data: userData, error: userError },
        { data: orderUpdateData, error: orderUpdateError },
      ] = await Promise.all([
        updateTablePromise,
        updateUserPromise,
        updateOrderPromise,
      ]);

      if (tableError) throw tableError;
      if (userError) throw userError;
      if (orderUpdateError) throw orderUpdateError;

      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 30);
      Cookies.set("orderId", orderData.id, { expires });
      setTimeout(async () => {
        await clearLocalStorage();
      }, 3000);
      router.replace("/cancel");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Cancel Order</ModalHeader>
            <ModalBody>
              <div className="-mt-4">
                <div className="mb-4 flex flex-col gap-1">
                  <p className="text-sm text-default-600 font-medium">
                    Order Id: {orderData?.order_id}{" "}
                  </p>
                  <p className="text-sm text-default-600 font-medium">
                    Total Amount: {siteConfig?.currencySymbol}
                    {orderData?.total_amount.toFixed(2)}{" "}
                    <span className="text-danger-500">
                      (Exclude {siteConfig?.taxTitle})
                    </span>
                  </p>
                  <p className="text-sm text-default-600 font-medium">
                    Order Status:{" "}
                    <Chip
                      size="sm"
                      color="primary"
                      variant="solid"
                      className="uppercase font-medium px-2"
                    >
                      {orderData?.status_id?.title}
                    </Chip>
                  </p>
                </div>

                <div className="pt-1">
                  <Select
                    label="Reason for Cancellation"
                    labelPlacement="outside"
                    fullWidth
                    size="lg"
                    variant="faded"
                    placeholder="Select a Reason"
                    onSelectionChange={(key) => {
                      setReason(key.currentKey);
                    }}
                  >
                    {reasonData &&
                      reasonData.map((reason) => {
                        return (
                          <SelectItem key={reason.id}>
                            {reason.title}
                          </SelectItem>
                        );
                      })}
                  </Select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex flex-col gap-2 w-full">
                <Button
                  onClick={handleLogout}
                  size="lg"
                  color="danger"
                  className="w-full"
                  isDisabled={!reason || isLoading}
                  spinner={<Loader size={20} className="animate-spin" />}
                  isLoading={isLoading}
                >
                  Confirm Cancellation
                </Button>
                <Button
                  onClick={onClose}
                  size="lg"
                  variant="flat"
                  className="w-full"
                >
                  Keep Order
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CancelOrder;