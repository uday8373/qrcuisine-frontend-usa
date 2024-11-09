"use client";
import { fetchOrderHisory } from "@/apis/orderApi";
import { EmptyData } from "@/components/icons/empty";
import LottieAnimation from "@/components/lottie/LottieAnimation";
import { siteConfig } from "@/config/site";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import QRLoader from "@/components/lottie/QR_loop.json";
import moment from "moment";
import ScreenError from "@/components/pages/Screen-Error";
import useSmallScreen from "@/hooks/useSmallScreen";

const OrderHistoryMain = () => {
  const router = useRouter();
  const isSmallScreen = useSmallScreen();
  const [orderData, setOrderData] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const userToken =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
  if (!userToken) {
    router.replace("/login");
  }

  const fetchData = async () => {
    try {
      const result = await fetchOrderHisory(activeTab);
      if (result) {
        setOrderData(result.data);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  if (isLoading) {
    return (
      <div className="w-full h-svh flex justify-center items-center -mt-8">
        <LottieAnimation width={400} height={400} animationData={QRLoader} />
      </div>
    );
  }

  if (!isSmallScreen) {
    return <ScreenError />;
  }
  return (
    <section id="booking-main" className="flex flex-col w-full ">
      <div className="w-full items-center relative flex justify-center px-6 py-6 ">
        <Button
          onClick={() => {
            router.back();
          }}
          size="sm"
          variant="flat"
          isIconOnly
          className="absolute left-0 text-default-800 ml-6"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-center text-large font-medium  text-default-800 ">
          Order History
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 px-6 w-full">
        <Tabs
          selectedKey={activeTab ? activeTab : "all"}
          onSelectionChange={(key) => setActiveTab(key)}
          color="primary"
          fullWidth
          size="lg"
          aria-label="Tabs sizes"
        >
          <Tab key="All" title="All" />
          <Tab key="Delivered" title="Delivered" />
          <Tab key="Cancelled" title="Cancelled" />
          <Tab key="Abandoned" title="Abandoned" />
        </Tabs>
      </div>
      <div className="w-full flex flex-col px-6 py-5 gap-3">
        {orderData.length < 1 && (
          <div className="text-center py-10 flex flex-col gap-3 justify-center items-center w-full h-96">
            <EmptyData size={85} />
            <p className="text-small">No Order Found</p>
          </div>
        )}
        {orderData &&
          orderData.map((item, index) => (
            <Card
              key={index}
              aria-label="loyality"
              shadow="none"
              isBlurred
              className="border bg-default-100 pb-1"
            >
              <CardBody>
                <div className="w-full flex justify-between items-center border-b pb-2">
                  <h3 className="text-sm font-medium text-default-600">
                    Order #{item?.order_id}
                  </h3>
                  {/* <span className="text-sm font-medium text-secondary-500 underline">
                    View order details
                  </span> */}
                  <span className="text-sm font-medium text-secondary-500">
                    {moment(item?.created_at).format("DD MMM YYYY")}
                  </span>
                </div>
                <div className="flex w-full pt-3 justify-between items-center gap-3">
                  <div className="flex gap-3 items-center">
                    <Avatar
                      src={item?.restaurant_id?.logo}
                      size="lg"
                      radius="sm"
                    />
                    <div>
                      <h3 className="text-medium font-medium text-default-700 line-clamp-1">
                        {item?.restaurant_id?.restaurant_name}
                      </h3>
                      <h4 className="text-sm font-medium text-default-500">
                        {siteConfig?.currencySymbol}{" "}
                        {item?.grand_amount.toFixed(2)}
                      </h4>
                    </div>
                  </div>
                  <Chip
                    radius="sm"
                    color={
                      item?.is_delivered
                        ? "primary"
                        : item?.is_cancelled
                        ? "danger"
                        : item?.is_abandoned
                        ? "secondary"
                        : "default"
                    }
                    classNames={{
                      content: "!min-w-24 flex justify-center",
                    }}
                  >
                    {item?.status_id?.title}
                  </Chip>
                </div>
                {/* <div className="w-full flex justify-between items-center p-2 rounded-md bg-default-50 mt-3">
              <h3 className="text-sm font-medium text-default-700">
                Rate & Review
              </h3>
              <div className="flex text-default-600 gap-2">
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
                <Star size={20} />
              </div>
            </div> */}
              </CardBody>
            </Card>
          ))}
      </div>
    </section>
  );
};

export default OrderHistoryMain;
