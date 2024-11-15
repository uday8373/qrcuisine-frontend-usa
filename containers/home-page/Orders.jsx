import { CircleRingElement } from "@/components/icons/icons";
import { Laptop, Laptop1, Laptop2 } from "@/public/assets/svg/Home-Page/Index";
import Image from "next/image";
import React from "react";

export default function Orders() {
  return (
    <>
      <section
        id="ControlOrders"
        className="flex items-center flex-col justify-center w-full relative"
      >
        <div className=" w-full h-full space-y-5 max-w-screen-xl px-6 md:py-16 py-8 z-10 relative">
          <CircleRingElement
            size={500}
            className="stroke-primary absolute top-24 xl:right-24 right-10 -z-10 md:flex hidden"
          />
          <div className="max-w-xl space-y-5">
            <h3 className="text-secondary font-bold md:leading-tight text-2xl md:text-[36px]">
              Seamlessly Place Orders <br /> – Directly at Your Table Instantly
            </h3>
            <p className="text-default-600 font-medium">
              Open tabs, split bills, and pay directly from an intuitive
              mobile-optimized interface. QR codes linked to table numbers for
              order tracking and food drop-off
            </p>
          </div>

          <div className="flex w-full z-20  overflow-hidden ">
            <Image
              width={2080}
              height={2080}
              alt="Laptop"
              src="/mockup/mockup6.png"
              className="w-full h-full lg:-my-20"
            />
          </div>
        </div>
      </section>
    </>
  );
}
