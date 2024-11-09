import React from "react";
import { Button } from "@nextui-org/react";
import { TicketCheck } from "lucide-react";
import supabase from "@/config/supabase";
import { siteConfig } from "@/config/site";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";

export default function LoyaltyPoints({
  onClaimOpen,
  isClaimed,
  setIsClaimed,
  handleClick,
  orderData,
}) {
  const router = useRouter();
  let userId = null;

  const userToken =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  if (userToken) {
    const dycrptToken = CryptoJS.AES.decrypt(
      userToken,
      siteConfig.cryptoSecret
    );

    userId = dycrptToken.toString(CryptoJS.enc.Utf8);
  }

  const handleClaimed = async () => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("loyality_point")
        .insert([
          {
            point: 50,
            user_id: userId,
            restaurant_id: orderData.restaurant_id.id,
            order_id: orderData.id,
            is_credit: true,
          },
        ])
        .select("id");

      if (error) {
        throw new Error("Failed to insert loyalty point");
      }
      if (data) {
        setIsClaimed(true);
        handleClick();
        onClaimOpen();
      }
    } catch (error) {
      console.error("Error claiming points:", error);
    }
  };

  const handleSignIn = async () => {
    router.push("/login");
  };

  return (
    <section id="thankyou" className="w-full pb-28 px-5">
      <div className="w-full">
        <div className="w-full h-full bg-warning-100 p-3 rounded-lg space-y-2 flex flex-col gap-1">
          <div>
            <p className="text-amber-700 text-small font-semibold">
              {`You've earned 50 points with this purchase!`}
            </p>
            <p className="text-amber-700 text-sm font-normal">
              Redeem your points for discounts on your next order.
            </p>
          </div>
          <Button
            isDisabled={isClaimed}
            onClick={userToken ? handleClaimed : handleSignIn}
            color="warning"
            size="md"
            className="text-small text-white font-semibold rounded-large"
            startContent={<TicketCheck size={18} />}
          >
            {userId ? "Claim Your Points" : "Log In to Claim Your Point!"}
          </Button>
        </div>
      </div>
    </section>
  );
}
