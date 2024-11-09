import LottieAnimation from "@/components/lottie/LottieAnimation";
import React from "react";
import Delivered from "@/components/lottie/delivered.json";

const DeliveredStatus = ({ orderData }) => {
  return (
    <section id="order_status">
      <div className={`w-full flex flex-col rounded-b-3xl bg-blue-500/10 px-5`}>
        <div className="w-full flex flex-col justify-center items-center gap-1 py-5">
          <div className="w-full flex justify-center flex-col items-center gap-1">
            <h2 className="text-default-600 font-semibold text-small">
              Order ID : {orderData?.order_id}
            </h2>
          </div>
          <div>
            <LottieAnimation
              width={150}
              height={150}
              animationData={Delivered}
            />
            <h3 className="text-medium font-medium text-blue-500">
              Your Order Is Delivered
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveredStatus;
