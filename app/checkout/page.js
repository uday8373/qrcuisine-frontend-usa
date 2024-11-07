import CheckoutMain from "@/containers/checkout-page/Checkout-Main";
import React from "react";

export default function page() {
  return (
    <main className="flex items-center justify-center w-full relative font-Rethink">
      <div className="w-full h-full flex-col max-w-screen-xl">
        <CheckoutMain />
      </div>
    </main>
  );
}
