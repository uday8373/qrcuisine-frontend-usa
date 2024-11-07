"use client";
import {
  fetchOrderData,
  fetchStatusData,
  getNotifications,
  updateNofication,
  updateVisitorConfirm,
  updateVisitorDelivered,
  updateVisitorPreparing,
} from "@/apis/preparingApi";
import supabase from "@/config/supabase";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Status from "./Status";
import OrderStatus from "./Order-Status";
import CallWaiterButton from "./Call-Waiter";
import ScreenError from "@/components/pages/Screen-Error";
import useSmallScreen from "@/hooks/useSmallScreen";
import useStatusNavigate from "@/hooks/useStatusRedirect";
import { NotificationList } from "./Notification";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import QRLoader from "@/components/lottie/QR_loop.json";
import Cookies from "js-cookie";
import { clearLocalStorage } from "@/hooks/clearLocalStorage";
import { toast } from "react-toastify";
import SubOrders from "./Sub-Orders";
import MainOrder from "./Main-Order";
import { Button, useDisclosure } from "@nextui-org/react";
import OrderPreview from "@/components/modal/Order-Preview";
import { RotateCw } from "lucide-react";

const PreparingMain = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isRotating, setIsRotating] = useState(false);
  const navigateBasedOnStatus = useStatusNavigate();
  const [notifications, setNotifications] = useState([]);
  const isSmallScreen = useSmallScreen();
  const [orderData, setOrderData] = useState(null);
  const [statusData, setStatusData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const orderId =
    typeof window !== "undefined" ? localStorage.getItem("orderId") : null;

  if (!orderId) {
    notFound();
  }

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  if (!userId) {
    notFound();
  }

  const customerStatus =
    typeof window !== "undefined" ? localStorage.getItem("status") : null;

  if (customerStatus !== "preparing") {
    navigateBasedOnStatus();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderResponse, statusResponse, notificationResponse] =
          await Promise.all([
            fetchOrderData(orderId),
            fetchStatusData(),
            getNotifications(orderId, userId),
          ]);
        if (!orderResponse || !statusResponse) {
          console.error("Error fetching order or status data");
        }

        setOrderData(orderResponse);
        setStatusData(statusResponse);
        const reversedNotifications = [...notificationResponse].reverse();
        setNotifications(reversedNotifications);
      } catch (error) {
        console.error("Error during data fetching:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const orderSubscription = supabase
      .channel("orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        async (payload) => {
          const myData = await fetchOrderData(orderId);
          setOrderData(myData);
          if (myData.status_id.sorting === 2) {
            await updateVisitorConfirm(myData.restaurant_id.id);
          }
          if (myData.status_id.sorting === 3) {
            await updateVisitorPreparing(myData.restaurant_id.id);
          }
          if (myData.status_id.sorting === 4) {
            await updateVisitorDelivered(myData.restaurant_id.id);
          }
        }
      )
      .subscribe();

    const subOrderSubscription = supabase
      .channel("sub_orders")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sub_orders",
          filter: `order_id=eq.${orderId}`,
        },
        async (payload) => {
          const myData = await fetchOrderData(orderId);
          setOrderData(myData);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(orderSubscription);
      supabase.removeChannel(subOrderSubscription);
    };
  }, [orderId, userId]);

  useEffect(() => {
    const playNotificationSound = () => {
      const audio = new Audio("/sounds/notification1.mp3");
      audio.play();
    };
    const messageSubscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `order_id=eq.${orderId}`,
        },
        async (payload) => {
          if (payload.new.user_read === false) {
            playNotificationSound();
            setNotifications((prev) => {
              const updatedNotifications = [...prev, payload.new];
              return updatedNotifications;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [orderId, userId]);

  // if (orderData?.status_id?.sorting === 4) {
  //   localStorage.setItem("status", "delivered");
  //   router.replace("/delivered");
  // }

  if (orderData?.sub_orders.length > 0) {
    const allSubOrdersDelivered = orderData.sub_orders.every((subOrder) =>
      [4, 5, 6].includes(subOrder?.status_id?.sorting)
    );

    if (allSubOrdersDelivered && orderData?.status_id?.sorting === 4) {
      localStorage.setItem("status", "delivered");
      router.replace("/delivered");
    }
  } else {
    if (orderData?.status_id?.sorting === 4) {
      localStorage.setItem("status", "delivered");
      router.replace("/delivered");
    }
  }

  if (orderData?.status_id?.sorting === 5) {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 30);
    Cookies.set("orderId", orderData.id, { expires });
    setTimeout(async () => {
      await clearLocalStorage();
    }, 3000);
    router.replace("/cancel");
  }

  if (orderData?.status_id?.sorting === 6) {
    toast.info("Your Order has been abandoned! Please create a new order.", {
      icon: <span>🥺</span>,
    });
    setTimeout(async () => {
      await clearLocalStorage();
    }, 3000);
    router.replace("/");
  }

  const handleUpdate = async (id) => {
    const result = await updateNofication(id);
    if (result) {
      const response = await getNotifications(orderId, userId);
      const reversedNotifications = [...response].reverse();
      setNotifications(reversedNotifications);
    }
  };

  const handleReload = async () => {
    setIsRotating(true);
    try {
      const [updatedOrderData, updatedNotifications] = await Promise.all([
        fetchOrderData(orderId),
        getNotifications(orderId, userId),
      ]);

      setOrderData(updatedOrderData);

      setNotifications(updatedNotifications.reverse());
    } catch (error) {
      console.error("Failed to reload data:", error);
    } finally {
      setIsRotating(false);
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
      <Header orderData={orderData} statusData={statusData} userId={userId} />

      {orderData?.sub_orders.length < 1 && (
        <div className="relative">
          <div className="absolute top-2 z-10 right-5">
            <Button
              color="default"
              aria-label="Increase"
              size="sm"
              variant="faded"
              onClick={handleReload}
            >
              Refresh{" "}
              <RotateCw
                size={20}
                className={isRotating ? "rotate-animation" : ""}
              />
            </Button>
          </div>
          <OrderStatus orderData={orderData} />
        </div>
      )}
      {notifications.length > 0 && (
        <NotificationList
          notifications={notifications}
          handleUpdate={handleUpdate}
        />
      )}
      {orderData?.sub_orders.length < 1 && (
        <Status
          orderData={orderData}
          statusData={statusData}
          notifications={notifications}
          onDetailsOpen={onOpen}
        />
      )}
      {orderData?.sub_orders.length > 0 && (
        <div className="relative py-1">
          <MainOrder
            orderData={orderData}
            statusData={statusData}
            notifications={notifications}
          />
          <SubOrders orderData={orderData} statusData={statusData} />
          <div className="absolute -top-1 right-5 ">
            <Button
              color="default"
              aria-label="Increase"
              size="sm"
              variant="ghost"
              onClick={handleReload}
            >
              Refresh{" "}
              <RotateCw
                size={20}
                className={isRotating ? "rotate-animation" : ""}
              />
            </Button>
          </div>
        </div>
      )}
      <CallWaiterButton orderData={orderData} />
      <OrderPreview
        foodData={orderData?.fooditem_ids}
        totalAmount={orderData?.total_amount}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default PreparingMain;
