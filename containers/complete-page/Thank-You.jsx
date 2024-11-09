import LottieAnimation from "@/components/lottie/LottieAnimation";
import React from "react";
import Thanks from "@/components/lottie/Thanks";

export default function ThankYou({ orderData }) {
  return (
    <section id="ThankYou" className="w-full">
      <div className={`w-full flex flex-col bg-primary-100 px-5 rounded-b-3xl`}>
        <div className="w-full flex flex-col justify-center items-center gap-1 py-5">
          <div className="w-full flex justify-center flex-col items-center gap-1">
            <h2 className="text-default-600 font-semibold text-small">
              Order ID : {orderData?.order_id}
            </h2>
          </div>
          <div>
            <LottieAnimation width={100} height={100} animationData={Thanks} />
          </div>
          <h2 className="text-primary font-semibold text-large">
            Thank you for visiting us!
          </h2>
        </div>
      </div>
    </section>
  );
}
