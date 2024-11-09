import {
  Analytics1,
  Analytics2,
  Hand,
} from "@/public/assets/svg/Home-Page/Index";
import { Button, Link } from "@nextui-org/react";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Pricing() {
  return (
    <section
      id="Pricing"
      className="flex items-center flex-col justify-center w-full    "
    >
      <div className=" w-full h-full space-y-5 relative  max-w-screen-xl px-6 py-8 md:py-16 z-10">
        <div className="max-w-lg space-y-3">
          <h3 className="text-secondary font-bold md:leading-tight text-2xl md:text-[36px]">
            Simple Pricing for
            <br /> – Smart Dining
          </h3>
          <p className="text-default-600 font-medium">
            QRcuisine provides restaurants real-time data of operations, It will
            make all transactions transparent to owner and manager.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 pt-5 w-full relative overflow-hidden items-center ">
          <div className="bg-primary-100 py-8 px-10 rounded-xl flex justify-center  gap-5 flex-col">
            <h3 className="font-bold text-3xl text-default-900">
              Free for the first <br />3 Months
            </h3>
            <p className="text-lg text-default-700">
              Try it with no loose. We are confident on our product and we will
              make you do so.
            </p>
            <h4 className="text-lg text-default-700 font-semibold">
              Explore our awesome tools and services without paying.
            </h4>
            <div className="pt-5 w-full justify-center items-center flex">
              <Button
                as={Link}
                href="/restaurant-registration"
                size="lg"
                variant="solid"
                color="primary"
                fullWidth
                radius="sm"
                endContent={<ChevronsRight />}
                className={`text-small px-10  font-semibold shadow-sm `}
              >
                REGISTER NOW
              </Button>
            </div>
          </div>
          <div className="bg-primary-100 lg:col-span-2 h-full rounded-xl py-8 px-10 flex justify-center items-start gap-5 flex-col relative">
            <Image
              className=" w-20 h-20 "
              src="/mockup/cost.png"
              alt="Hand"
              width={1080}
              height={1080}
            />

            <h3 className="font-bold text-4xl text-default-900 gap">
              We cost less then a waiter
            </h3>
            <p className="text-xl leading-snug text-default-600 font-semibold ">
              and serve more then a manager, analyst and <br />
              marketer.
            </p>

            <div className="pt-5 w-full justify-center flex-col  gap-2 flex">
              <h3 className="text-primary font-bold text-lg">
                Monthly subscription
              </h3>
              <p className="text-primary font-bold text-3xl">
                Rs. 3999 / Month
              </p>
            </div>
            <Image
              src="/mockup/cta-element.png"
              width={1080}
              height={1080}
              alt="element"
              className="w-auto md:h-60 h-28 absolute md:bottom-10 md:right-10 bottom-center right-5 rotate-180 md:flex hidden opacity-75"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
