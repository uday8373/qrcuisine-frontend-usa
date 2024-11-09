import DotPattern from "@/components/background/DotBackground";
import { cn } from "@/utils/cn";
import { Button } from "@nextui-org/react";
import { ArrowRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SmarterOrdering() {
  return (
    <>
      <section
        id="SmarterOrdering"
        className="flex items-center flex-col justify-center w-full bg-primary-100 relative"
      >
        <DotPattern
          className={cn(
            "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] fill-primary-400 top-4"
          )}
        />
        <div className="w-full h-full flex flex-col md:flex-row max-w-screen-xl z-10 py-10 px-6 gap-5 md:items-center">
          <div className="w-full flex justify-center">
            <Image
              width={1080}
              height={1080}
              className=" w-[512px]"
              src="/mockup/qr-mockup.png"
              alt="BannerTransparent"
            />
          </div>

          <div className="w-full h-full flex flex-col 3xl:gap-8 lg:gap-6 gap-3">
            <h3 className="lg:text-5xl md:text-3xl text-2xl font-bold text-default-900 md:leading-tight leading-inherit gap-3 flex flex-col lg:leading-snug">
              Smarter Ordering,
              <br />
              Deeper Insights
            </h3>
            <div className="flex items-center gap-3">
              <ArrowRight strokeWidth={3} size={36} className="text-primary" />

              <span className="text-primary lg:text-5xl md:text-3xl text-2xl font-bold">
                All with a QR Scan
              </span>
            </div>
            <Button
              as={Link}
              href="/restaurant-registration"
              size="lg"
              variant="solid"
              color="primary"
              radius="sm"
              endContent={<MoveRight />}
              className={`text-medium 3xl:text-lg px-10 mt-3 font-semibold shadow-sm w-fit`}
            >
              Try free for 3 months
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
