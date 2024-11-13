import React from "react";
import { Button, Link } from "@nextui-org/react";
import QrScan from "./Qr-Scan";
import { RectangleElement } from "@/components/icons/icons";
import { MoveRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section
        id="Hero"
        className="flex overflow-hidden h-full flex-col items-center justify-center w-full bg-[#E5F4EB] relative"
      >
        <div className="w-full h-full bg-white/25 backdrop-blur-lg absolute z-[10]" />
        <div className="absolute flex z-[5] justify-center w-full  items-center -translate-y-1/2">
          <div className="w-56 h-56 bg-secondary-200 rounded-full"></div>
          <div className="w-56 h-56 bg-primary-200 rounded-full -ml-16"></div>
        </div>
        <div className="relative w-full h-full flex flex-col max-w-screen-xl px-6 py-24">
          <RectangleElement
            size={450}
            className="z-[15] absolute bottom-0 -left-24 fill-primary-400 md:flex hidden"
          />
          <RectangleElement
            size={450}
            className="z-[15] absolute top-0 -right-24 fill-primary-400 md:flex hidden"
          />
          <div className="flex items-center relative justify-center flex-col 3xl:gap-9 gap-7 text-center z-20">
            <h3 className="3xl:text-xl underline-offset-4 tracking-wide underline text-default-600 font-medium decoration-default-600">{`QR CUISINE USA `}</h3>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-6xl 3xl:text-7xl font-bold text-default-900 leading-relaxed md:leading-tight 3xl:leading-snug text-balance">
                Table Ordering Contactless
                <br />
                With AI Technology
              </h2>
            </div>
            <div className="flex w-full justify-center items-center z-40">
              <div className="w-20 border-t-2 border-default-600" />

              <div className="min-w-fit mx-5">
                <h4 className="font-bold text-default-600 3xl:text-xl">
                  With futuristic <br />
                  technology
                </h4>
              </div>
              <div className="w-20 border-t-2 border-default-600" />
            </div>

            <p className="text-balance font-medium max-w-lg text-default-700 3xl:text-xl">
              Unlock the full potential of dine-in service with the ultimate QR
              code table ordering solution.
            </p>
            <div className="space-y-2">
              <Button
                as={Link}
                href="/restaurant-registration"
                size="lg"
                variant="solid"
                color="primary"
                radius="sm"
                className={`text-medium px-7 font-semibold 3xl:text-lg`}
                endContent={<MoveRight size={20} />}
              >
                Try free for 3 months
              </Button>
              <p className="text-[13px] 3xl:text-md font-semibold text-default-700">{`Trusted by 100’s of restaurants`}</p>
            </div>
          </div>
        </div>
        <div className="w-full z-30">
          <QrScan />
        </div>
      </section>
    </>
  );
}
