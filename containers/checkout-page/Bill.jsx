import { siteConfig } from "@/config/site";
import React from "react";

const Bill = ({ totalPrice, gstAmount, grandTotal }) => {
  return (
    <section id="bill_section">
      <div className="w-full flex flex-col gap-2 mb-32 px-5">
        <h2 className="text-default-700 font-medium text-medium mt-3">
          Bill Summary
        </h2>
        <div className="bg-default-100 px-3 py-4 rounded-large flex flex-col gap-3 w-full text-default-700">
          <div className="text-small font-medium w-full flex justify-between items-center">
            <h4 className="text-small font-medium">Subtotal</h4>
            <div className="flex items-center gap-2">
              <h2 className="text-default-700 font-bold text-small">
                {siteConfig?.currencySymbol}
                {totalPrice.toFixed(2)}
              </h2>
            </div>
          </div>
          <div className="text-small font-medium w-full flex justify-between items-center">
            <h4 className="text-[13px] font-semibold text-default-500">
              {siteConfig?.taxTitle}
            </h4>
            <div className="flex items-center gap-2">
              <h2 className="text-default-500 font-bold text-[13px]">
                {siteConfig?.currencySymbol}
                {gstAmount.toFixed(2)}
              </h2>
            </div>
          </div>
          <div className="border w-full border-dashed border-default-300" />
          <div className="text-small font-medium w-full flex justify-between items-center">
            <h4 className="text-medium font-medium">Grand Total</h4>
            <div className="flex items-center gap-2">
              <h2 className="text-success font-bold text-medium">
                {siteConfig?.currencySymbol}
                {grandTotal.toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bill;
