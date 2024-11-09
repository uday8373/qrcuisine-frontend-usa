"use client";
import { useRouter } from "next/navigation";

const useStatusNavigate = () => {
  const router = useRouter();

  const navigateBasedOnStatus = () => {
    const customerStatus =
      typeof window !== "undefined" ? localStorage.getItem("status") : null;

    switch (customerStatus) {
      case "checkout":
        router.replace("/checkout");
        break;
      case "preparing":
        router.replace("/preparing");
        break;
      case "delivered":
        router.replace("/delivered");
        break;
      default:
        break;
    }
  };

  return navigateBasedOnStatus;
};

export default useStatusNavigate;
