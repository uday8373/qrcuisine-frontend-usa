import { CircleElement } from "@/components/icons/icons";
import Safari from "@/components/mockup/safari-mockup";
import { HelpsRestaurantsData } from "@/constant/data";
import { Dashboard } from "@/public/assets/svg/Home-Page/Index";
import { HandPlatter } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function HelpsRestaurants() {
  return (
    <>
      <section
        id="HelpsRestaurants"
        className="flex items-center h-full flex-col justify-center w-full overflow-hidden"
      >
        <div className=" w-full flex flex-col items-center justify-center max-w-screen-xl py-8 md:py-16 px-6 z-10">
          <div className="lg:col-span-2  py-2 w-full flex ">
            <h2 className="text-secondary font-bold md:leading-tight max-w-lg text-2xl md:text-[36px] text-left">{`QRCuisine Helps Restaurant’s to manage efficiently`}</h2>
          </div>
          <div className=" w-full h-auto flex flex-col lg:flex-row py-8 gap-10 z-10">
            <div className="w-full">
              <div className="flex flex-col md:gap-10 gap-6 py-5 md:py-10">
                {HelpsRestaurantsData.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="flex gap-5 items-start  ">
                        <div>
                          <div className="p-4 bg-primary-500/20 rounded-lg mt-2">
                            <item.icon size={30} className="text-primary-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-bold text-default-800 text-xl md:text-2xl">
                            {item.title}
                          </h3>
                          <p className="text-md text-default-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center w-full h-full relative justify-center ">
              <Safari
                src="/mockup/mockup1.png"
                url="business.qrcuisine.com"
                className="size-full z-[5]"
              />
              <CircleElement
                size={350}
                className="fill-secondary-300 absolute -top-20 lg:flex hidden"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
