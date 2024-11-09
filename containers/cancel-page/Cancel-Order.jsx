"use client";

import React from "react";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import Sad from "@/components/lottie/Cancel.json";
export default function CancelOrder() {
  return (
    <section id="order_cancelled">
      <div
        className={`w-full flex flex-col rounded-b-3xl bg-danger-500/10 px-5`}
      >
        <div className="w-full flex flex-col justify-center items-center gap-1 py-5">
          <div>
            <LottieAnimation width={100} height={100} animationData={Sad} />
            <h3 className="text-medium font-medium text-danger-500">
              Your Order Is Cancelled
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
