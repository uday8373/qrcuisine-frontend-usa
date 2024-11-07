import React from "react";

export default function Reason({ orderData }) {
  return (
    <section id="thankyou" className="w-full mb-44 px-5">
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-default-700 font-medium text-medium mt-3">
          Cancellation Reason
        </h2>
        <div className="w-full h-full bg-default-100 p-3 rounded-lg  space-y-1">
          <h3 className="font-medium text-medium">
            {orderData?.cancelled_reason?.title}
          </h3>
          <p className="text-default-700 font-normal text-small">
            {orderData?.cancelled_reason?.description}
          </p>
        </div>
      </div>
    </section>
  );
}
