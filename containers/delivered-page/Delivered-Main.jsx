"use client";
import { fetchOrderData } from "@/apis/preparingApi";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ScreenError from "@/components/pages/Screen-Error";
import useSmallScreen from "@/hooks/useSmallScreen";
import Header from "../preparing-page/Header";
import DeliveredStatus from "./Delivered-Status";
import WaiterStatus from "./Waiter-Status";
import CustomRating from "./Custom-Rating";
import BillButton from "./Bill-Button";
import supabase from "@/config/supabase";
import useStatusNavigate from "@/hooks/useStatusRedirect";
import { clearLocalStorage } from "@/hooks/clearLocalStorage";
import QRLoader from "@/components/lottie/QR_loop.json";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import Cookies from "js-cookie";
import { useDisclosure } from "@nextui-org/react";
import TipsModal from "@/components/modal/Tips-Modal";

const DeliveredMain = () => {
  const router = useRouter();
  const navigateBasedOnStatus = useStatusNavigate();
  const isSmallScreen = useSmallScreen();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const orderId =
    typeof window !== "undefined" ? localStorage.getItem("orderId") : null;

  const customerStatus =
    typeof window !== "undefined" ? localStorage.getItem("status") : null;

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  if (customerStatus !== "delivered") {
    navigateBasedOnStatus();
  }

  useEffect(() => {
    if (!orderId) {
      notFound();
    }
  }, [orderId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderResponse] = await Promise.all([fetchOrderData(orderId)]);
        if (!orderResponse) {
          console.error("Error fetching order");
        }
        setOrderData(orderResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [orderId]);

  const updateTable = async () => {
    const { data, error } = await supabase
      .from("tables")
      .update({
        is_booked: false,
        persons: null,
        order_id: null,
        user_id: null,
      })
      .eq("id", orderData?.tables?.id)
      .select("id");
    if (error) {
      throw error;
    }
    if (data) {
      return data;
    }
  };

  const insertWaiterMessage = async () => {
    const message = `Please call the waiter to prepare the bill for table no: ${orderData?.tables?.table_no}`;
    const sub_message = "Please prepare the bill quickly.";
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
      throw new error();
    }
    if (data) return data;
  };

  const updateUser = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({ is_active: false, closed_at: new Date().toISOString() })
      .eq("id", orderData?.user_id)
      .select("id");
    if (error) {
      throw new error();
    }
    if (data) return data;
  };
  const updateOrder = async (tip, finalAmount) => {
    const { data, error } = await supabase
      .from("orders")
      .update({ ask_bill: true, tip_amount: tip, final_amount: finalAmount })
      .eq("id", orderData?.id)
      .select("id");
    if (error) {
      throw new error();
    }
    if (data) return data;
  };

  const handleCallWaiter = async (tip, finalAmount) => {
    setButtonLoading(true);
    try {
      const [tableResponse, waiterResponse, userResponse, orderResponse] =
        await Promise.all([
          updateTable(),
          insertWaiterMessage(),
          updateUser(),
          updateOrder(tip, finalAmount),
        ]);

      if (
        !tableResponse ||
        !waiterResponse ||
        !userResponse ||
        !orderResponse
      ) {
        console.error("Error updating table, waiter message, or user");
        return;
      } else {
        onOpenChange(false);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 30);
        Cookies.set("orderId", orderData.id, { expires });
        setTimeout(async () => {
          await clearLocalStorage();
        }, 3000);
        router.replace("/complete");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setButtonLoading(false);
    }
  };

  if (!isSmallScreen) {
    return <ScreenError />;
  }

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center -mt-8">
        <LottieAnimation width={400} height={400} animationData={QRLoader} />
      </div>
    );
  }

  return (
    <div>
      <Header orderData={orderData} userId={userId} />
      <DeliveredStatus orderData={orderData} />
      <WaiterStatus orderData={orderData} />
      <CustomRating
        restaurant_id={orderData?.restaurant_id?.id}
        order_id={orderData?.id}
        table_id={orderData?.tables?.id}
        user_id={orderData?.user_id}
      />
      <BillButton orderData={orderData} onOpen={onOpen} />
      <TipsModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        orderData={orderData}
        handleCallWaiter={handleCallWaiter}
        isLoading={buttonLoading}
      />
    </div>
  );
};

export default DeliveredMain;
