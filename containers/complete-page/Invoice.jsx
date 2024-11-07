import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import html2canvas from "html2canvas";
import { Download, Eye } from "lucide-react";
import { siteConfig } from "@/config/site";

const Invoice = ({ orderData, isComplete = true }) => {
  const invoiceRef = useRef(null);
  const [previewMode, setPreviewMode] = useState(false);

  const downloadInvoiceAsImage = async () => {
    const element = invoiceRef.current;

    if (!element) {
      console.error("Invoice content is not available.");
      return;
    }

    await html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `invoice_${orderData?.order_id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };
  const combinedFoodItems = [
    ...(orderData.fooditem_ids || []), // Main order food items
    ...(orderData.sub_orders
      ?.filter((subOrder) => subOrder?.is_delivered)
      ?.flatMap((subOrder) => subOrder?.fooditem_ids) || []), // Sub-order food items
  ];

  function calculateTotalAmount(orderId, sub_orders) {
    if (sub_orders.length < 1) {
      return 0;
    }

    const totalAmount =
      sub_orders
        .filter((subOrder) => subOrder.is_delivered === true)
        .reduce(
          (sum, subOrder) => sum + (Number(subOrder.total_amount) || 0),
          0
        ) || 0;

    return totalAmount.toFixed(2);
  }

  return (
    <>
      {/* Invoice Content (Hidden by Default) */}
      <div
        ref={invoiceRef}
        style={{
          position: previewMode ? "relative" : "absolute",
          top: previewMode ? "0" : "-1000px",
          left: previewMode ? "0" : "-1000px",
          width: "210mm",
          padding: "20px",
          backgroundColor: "#fff",
          zIndex: previewMode ? 10 : -1,
          overflow: "hidden",
        }}
      >
        {/* Invoice Details */}
        <div className="w-full flex justify-center items-center py-8 flex-col">
          <div className=" text-center">
            <h2 className="font-Rethink font-medium text-black">
              {orderData?.restaurant_id?.restaurant_name}
            </h2>
            <h3 className="font-Rethink font-medium text-black">
              {orderData?.restaurant_id?.restaurant_address}
            </h3>
            {/* Customer and Order Information */}
            <div className="flex flex-col items-center text-black ">
              <h3 className="font-Rethink font-medium text-black">
                Ph - {orderData?.users?.mobile}
              </h3>
              <h3 className="font-Rethink font-medium">
                {orderData?.users?.name ? orderData?.users?.name : "Anonymous"}
              </h3>
              <p>
                Thank you for visiting. We welcome all feedback regarding your
                visit.
              </p>
              <p>Email us at - {orderData?.restaurant_id?.restaurant_email}</p>
              <p>
                Table No: {orderData?.tables?.table_no} -{" "}
                {orderData.tables.max_capacity} Guest
              </p>
              <p>Your Server was {orderData?.waiters?.name}</p>
              <p>
                {new Date(orderData?.created_at).toLocaleDateString("en-us", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                |{" "}
                {new Date(orderData?.created_at).toLocaleTimeString("en-us", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>

            {/* Order Items Table */}
            <table
              className="w-full
            text-center text-sm font-light mt-5"
            >
              <thead className="border-b border-dashed border-gray-600 text-black font-medium">
                <tr>
                  <th className="w-full flex justify-start py-4 text-start">
                    ITEM
                  </th>
                  <th className="px-6 py-4">UNIT/PRICE</th>
                  <th className="px-6 py-4">QTY</th>
                  <th className=" py-4 flex justify-end w-full">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {combinedFoodItems.map((item, index) => (
                  <>
                    <tr
                      key={`${item?.id}-${index}`}
                      className="border-b border-dashed  text-black"
                    >
                      <td className="py-4 text-start">
                        {item?.food_name || "N/A"}
                      </td>
                      <td className="py-4">
                        {siteConfig.currencySymbol}
                        {item?.price ? item.price.toFixed(2) : "0.00"}
                      </td>
                      <td className="py-4">{item?.quantity || 0}</td>
                      <td className="py-4 flex justify-end">
                        {siteConfig.currencySymbol}
                        {(item?.price * item?.quantity || 0).toFixed(2)}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>

            {/* Summary Section */}
            <div className="flex flex-col items-end gap-2 pt-3 border-t border-dashed border-gray-600 mt-2">
              {/* Subtotal */}
              <div className="flex gap-2 items-center">
                <strong>Subtotal :</strong>
                <p>
                  {siteConfig.currencySymbol}

                  {(
                    Number(orderData.total_amount) +
                    Number(
                      calculateTotalAmount(
                        orderData?.order_id,
                        orderData?.sub_orders
                      )
                    )
                  ).toFixed(2)}
                </p>
              </div>

              {/* Total Taxes */}
              <div className="flex gap-2 items-center">
                <strong>Total Taxes :</strong>
                <p>
                  {siteConfig.currencySymbol}
                  {(
                    (Number(orderData.total_amount) +
                      Number(
                        calculateTotalAmount(
                          orderData?.order_id,
                          orderData?.sub_orders
                        )
                      )) *
                    (Number(orderData.restaurant_id.gst_percentage) / 100)
                  ).toFixed(2)}
                </p>
              </div>

              {/* Grand Total */}
              <div className="flex gap-2 items-center mt-2  border-dashed border-gray-600 border-t font-bold text-2xl">
                <strong>Grand Total :</strong>
                <p>
                  {siteConfig.currencySymbol}
                  {(
                    Number(orderData.total_amount) +
                    Number(
                      calculateTotalAmount(
                        orderData?.order_id,
                        orderData?.sub_orders
                      )
                    ) +
                    (Number(orderData.total_amount) +
                      Number(
                        calculateTotalAmount(
                          orderData?.order_id,
                          orderData?.sub_orders
                        )
                      )) *
                      (Number(orderData?.restaurant_id?.gst_percentage) / 100)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
            {/* Tip Section */}
            <div className="w-full grid grid-cols-4  py-2 my-2">
              {[17, 20, 25, 30].map((tip) => {
                const grandTotal = (
                  Number(orderData.total_amount) +
                  Number(
                    calculateTotalAmount(
                      orderData?.order_id,
                      orderData?.sub_orders
                    )
                  ) +
                  (Number(orderData.total_amount) +
                    Number(
                      calculateTotalAmount(
                        orderData?.order_id,
                        orderData?.sub_orders
                      )
                    )) *
                    (Number(orderData?.restaurant_id?.gst_percentage) / 100)
                ).toFixed(2);

                const tipAmount = (Number(grandTotal) * (tip / 100)).toFixed(2);
                const totalWithTip = (
                  Number(grandTotal) + Number(tipAmount)
                ).toFixed(2);

                return (
                  <div
                    key={tip}
                    className="flex  items-center flex-col text-black"
                  >
                    <p>{tip}% </p>
                    <p>
                      {siteConfig.currencySymbol}
                      {tipAmount}
                    </p>
                    {/* <strong>Total:</strong> */}
                    {/* <p>
                      {siteConfig.currencySymbol}
                      {totalWithTip}
                    </p> */}
                  </div>
                );
              })}
            </div>
            <div className=" flex border-t flex-col  justify-between   border-dashed border-gray-600  items-center w-full">
              <div className="h-1"></div>
              <p className="text-center text-black">Tip is not included</p>
              <p className="text-center text-black ">
                Thank you -{" "}
                <span className="font-Rethink  text-black">
                  powered by https://www.qrcuisine.com
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download and Preview Buttons */}
      {/* <div className="download-buttons w-full  mb-5"> */}
      {/* <Button
        startContent={<Eye size={18} className="mb-0.5" />}
        fullWidth
        size="lg"
        variant="faded"
        onClick={togglePreview}
      >
        {previewMode ? "Close Preview" : "Preview Invoice"}
      </Button> */}
      {isComplete ? (
        <Button
          startContent={<Download size={18} className="mb-0.5" />}
          fullWidth
          size="lg"
          variant="faded"
          onClick={downloadInvoiceAsImage}
          className="mt-2"
        >
          Download Invoice
        </Button>
      ) : (
        <Button
          variant="solid"
          color="primary"
          onClick={downloadInvoiceAsImage}
        >
          Download Invoice
        </Button>
      )}

      {/* </div> */}
    </>
  );
};

export default Invoice;
