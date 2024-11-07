import React, { useRef } from "react";
import { Button } from "@nextui-org/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const Invoice = ({ orderData }) => {
  const invoiceRef = useRef(null);

  const downloadInvoiceAsPDF = () => {
    const element = invoiceRef.current;

    if (!element) {
      console.error("Invoice content is not available.");
      return;
    }

    // Use html2canvas to capture the HTML content
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Calculate the width and height based on the A4 size
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save(`invoice_${orderData.order_id}.pdf`);
    });
  };

  return (
    <>
      {/* Hidden Invoice HTML Structure */}
      <div
        ref={invoiceRef}
        style={{
          position: "absolute",
          top: "-1000px",
          left: "-1000px",
          width: "210mm", // Set the width to A4 size
          padding: "20px",
          backgroundColor: "#fff",
          // backgroundImage: "/assets/Invoice_page-0001.jpg",
        }}
      >
        <div className="p-20">
          {/* <div className="w-full flex items-center justify-center pb-5">
            <div className="w-20 h-20 bg-primary-400 rounded-full">
              <Image
                src={orderData.restaurant_id.logo}
                alt="Restaurant Logo"
                width={500}
                height={500}
                className="w-full h-full aspect-auto object-cover"
              />
            </div>
          </div> */}
          <div className="w-full flex justify-between items-center">
            <div>
              <h2 className="font-Rethink font-medium text-black">Bill To :</h2>
              <h3 className="font-Rethink font-medium text-black">
                {orderData.users.name}
              </h3>
              <h2 className="font-Rethink font-medium text-black">
                {orderData.restaurant_id.restaurant_name}
              </h2>
            </div>

            <div className="flex justify-end flex-col items-end">
              <h2 className="font-Rethink font-medium text-black">
                Invoice To :
              </h2>
              <h3 className="font-Rethink font-medium text-black">
                {orderData.order_id}
              </h3>
              <h3 className="font-Rethink font-medium text-black">
                Table No : {orderData.tables.table_no}
              </h3>
              <h3 className="font-Rethink font-medium text-black">
                {new Date(orderData.created_at)
                  .toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/-/g, " ")}
              </h3>
            </div>
          </div>

          <div className="min-w-full pt-5">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-center text-sm font-light text-surface ">
                      <thead className="border-b border-t  whitespace-nowrap border-gray-600  text-black font-medium ">
                        <tr>
                          <th scope="col" className=" px-6 py-4">
                            #
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            DESCRIPTION
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            UNIT PRICE
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            QTY
                          </th>
                          <th scope="col" className=" px-6 py-4">
                            TOTAL
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData.fooditem_ids.map((item, index) => (
                          <tr
                            className="border-b border-neutral-200  text-black"
                            key={item.id}
                          >
                            <td className=" whitespace-nowrap  px-6 py-4">
                              {index + 1}
                            </td>
                            <td className=" whitespace-nowrap  px-6 py-4">
                              {item.food_name}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {siteConfig?.currencySymbol}{" "}
                              {item.price.toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {item.quantity}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {siteConfig?.currencySymbol}{" "}
                              {(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className=" border-b border-t border-gray-600  text-black  w-full  py-3 flex justify-between px-7   font-medium  ">
                      <h2>TOTAL</h2>
                      <h3>
                        {" "}
                        {siteConfig?.currencySymbol}{" "}
                        {orderData.total_amount.toFixed(2)}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="invoice-summary  whitespace-nowrap w-full flex-col gap-2 flex justify-end items-end px-7  ">
            <div className="flex gap-2 items-center">
              <strong className="text-black font-medium">Total Amount :</strong>{" "}
              <p className="text-gray-700 font-normal">
                {siteConfig?.currencySymbol} {orderData.total_amount.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <strong className="text-black font-medium">Tax Amount :</strong>{" "}
              {siteConfig?.currencySymbol}{" "}
              <p className="text-gray-700 font-normal">
                {" "}
                {orderData.tax_amount.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <strong className="text-black font-bold font-Rethink text-xl">
                Grand Total :
              </strong>{" "}
              <p className="text-gray-700  text-xl font-normal">
                {siteConfig?.currencySymbol} {orderData.grand_amount.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="pt-10 flex justify-center  items-center w-full">
            <p className="text-center text-black">
              This is a auto generated bill need to signature.
              <br />
              <span className="text-primary-500 text-2xl font-bold font-Rethink">
                QRCuisine
              </span>{" "}
            </p>
          </div>
        </div>
      </div>

      {/* Download Invoice as PDF button */}
      <div className="download-buttons">
        <Button variant="flat" color="success" onClick={downloadInvoiceAsPDF}>
          Download Invoice
        </Button>
      </div>
    </>
  );
};

export default Invoice;
