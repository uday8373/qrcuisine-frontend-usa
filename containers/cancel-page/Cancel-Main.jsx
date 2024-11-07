"use client";

import React, { useEffect, useState } from "react";
import CancelOrder from "./Cancel-Order";
import OrderDetails from "./Order-Details";
import Reason from "./Reason";
import Footer from "./Footer";
import { fetchOrderData } from "@/apis/preparingApi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import QRLoader from "@/components/lottie/QR_loop.json";
import Header from "../preparing-page/Header";
import { clearLocalStorage } from "@/hooks/clearLocalStorage";

export default function CancelMain() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState();

  const fetchData = async () => {
    const orderId = Cookies.get("orderId");

    if (!orderId) {
      await clearLocalStorage();
      router.replace("/");
      return;
    }
    try {
      const result = await fetchOrderData(orderId);
      if (!result) {
        throw new Error("Failed to fetch order data");
      }
      setOrderData(result);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHome = async () => {
    await clearLocalStorage();
    Cookies.remove("orderId");
    router.replace("/");
  };

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center -mt-8">
        <LottieAnimation width={400} height={400} animationData={QRLoader} />
      </div>
    );
  }
  return (
    <main>
      <Header orderData={orderData} />
      <CancelOrder />
      <OrderDetails orderData={orderData} />
      <Reason orderData={orderData} />
      <Footer handleHome={handleHome} />
    </main>
  );
}
