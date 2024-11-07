import { siteConfig } from "@/config/site";
import { CalendarDays, Hash, WalletMinimal } from "lucide-react";
import moment from "moment";
import React from "react";

export default function OrderDetails({ orderData }) {
  return (
    <section id="thankyou" className=" w-full px-5">
      <div className="w-full flex flex-col gap-2">
        <h2 className="text-default-700 font-medium text-medium mt-3">
          Order Details
        </h2>
        <div className="w-full h-full bg-default-100 p-3 rounded-large space-y-2.5">
          <div className="w-full flex items-center gap-2">
            <Hash size={16} className="text-default-600" />
            <h3 className="text-default-600 flex items-center gap-1 font-medium text-medium">
              Order ID :{" "}
              <span className="text-default-900">{orderData?.order_id}</span>
            </h3>
          </div>
          <div className="w-full flex items-center gap-2">
            <CalendarDays size={16} className="text-default-600" />
            <h3 className="text-default-600 flex items-center gap-1 font-medium text-medium">
              Date :{" "}
              <span className="text-default-900">
                {orderData?.created_at
                  ? moment(orderData.created_at).format(
                      "DD MMM YYYY [at] hh:mm A"
                    )
                  : ""}
              </span>
            </h3>
          </div>
          <div className="w-full flex items-center gap-2">
            <WalletMinimal size={16} className="text-default-600" />
            <h3 className="text-default-600 flex items-center gap-1 font-medium text-medium">
              Total Amount :{" "}
              <span className="text-default-900">
                {siteConfig?.currencySymbol}{" "}
                {orderData?.grand_amount.toFixed(2)}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
