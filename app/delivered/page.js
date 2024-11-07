import DeliveredMain from "@/containers/delivered-page/Delivered-Main";
import React from "react";

const page = () => {
  return (
    <main className="flex items-center justify-center w-full font-Rethink">
      <div className="w-full h-full flex-col max-w-screen-xl">
        <DeliveredMain />
      </div>
    </main>
  );
};

export default page;
