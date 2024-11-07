"use client";
import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSmallScreen from "@/hooks/useSmallScreen";
import ScreenError from "@/components/pages/Screen-Error";
import Header from "./Header";
import ThankYou from "./Thank-You";
import PaymentStatus from "./Payment-Status";
import LoyaltyPoints from "./Loyalty-Points";
import Footer from "./Footer";
import Cookies from "js-cookie";
import { fetchOrderData } from "@/apis/preparingApi";
import { clearLocalStorage } from "@/hooks/clearLocalStorage";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import QRLoader from "@/components/lottie/QR_loop.json";
import supabase from "@/config/supabase";
import { useDisclosure } from "@nextui-org/react";
import LoginModal from "@/components/modal/LogIn-Modal";
import ClaimedModal from "@/components/modal/Claimed-Modal";

const CompleteMain = () => {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState();
  const [isClaimed, setIsClaimed] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const {
    isOpen: isClaimOpen,
    onOpen: onClaimOpen,
    onOpenChange: onClaimOpenChange,
  } = useDisclosure();

  const handleCoinClick = () => {
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: "🪙", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [unicorn],
      scalar,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  const handleClick = () => {
    const end = Date.now() + 1 * 1000;
    const colors = ["#f8deb1", "#eca184", "#fd8bbc", "#a786ff"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 45,
        startVelocity: 60,
        origin: { x: 0, y: 1 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 45,
        startVelocity: 60,
        origin: { x: 1, y: 1 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };
    frame();
  };

  const fetchData = async (orderId) => {
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
      handleClick();
      setIsLoading(false);
    }
  };

  const fetchLoyalty = async (orderId) => {
    try {
      const { data, error } = await supabase
        .from("loyality_point")
        .select("id")
        .eq("order_id", orderId)
        .single();

      if (data) {
        setIsClaimed(true);
      } else {
        setIsClaimed(false);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const orderId = Cookies.get("orderId");
    fetchData(orderId);
    fetchLoyalty(orderId);
    const orderCompleteSubscription = supabase
      .channel("ordersComplete")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        async (payload) => {
          fetchData(orderId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(orderCompleteSubscription);
    };
  }, []);

  const handleHome = async () => {
    await clearLocalStorage();
    Cookies.remove("orderId");
    router.replace("/");
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
    <main>
      <Header orderData={orderData} userId={userId} />
      <ThankYou orderData={orderData} />
      <PaymentStatus orderData={orderData} isClaimed={isClaimed} />
      {!isClaimed && (
        <LoyaltyPoints
          onOpen={onOpen}
          isClaimed={isClaimed}
          setIsClaimed={setIsClaimed}
          handleClick={handleClick}
          onClaimOpen={onClaimOpen}
          orderData={orderData}
        />
      )}
      <Footer orderData={orderData} handleHome={handleHome} />
      <LoginModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        orderData={orderData}
        handleClick={handleCoinClick}
        setIsClaimed={setIsClaimed}
        onClaimOpen={onClaimOpen}
      />
      <ClaimedModal isOpen={isClaimOpen} onOpenChange={onClaimOpenChange} />
    </main>
  );
};

export default CompleteMain;
