import GridPattern from "@/components/background/GridBackground";
import { Analytics1, Analytics2 } from "@/public/assets/svg/Home-Page/Index";
import { cn } from "@/utils/cn";
import { Button, Link } from "@nextui-org/react";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Analytics() {
  return (
    <section
      id="ControlOrders"
      className="flex items-center flex-col justify-center w-full bg-primary-100 relative overflow-hidden"
    >
      <GridPattern
        width={25}
        height={25}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)] stroke-primary-200"
        )}
      />
      <div className=" w-full h-full space-y-5 relative  max-w-screen-xl px-6 py-8 md:py-16 z-10">
        <div className="max-w-xl space-y-5">
          <h3 className="text-secondary font-bold md:leading-tight text-2xl md:text-[36px]">
            Real-Time Analytics, <br /> – Real-Time Succes
          </h3>
          <p className="text-default-600 font-medium">
            Real-Time Analytics, Real-Time Success: Leverage instant insights to
            drive immediate decisions, optimize performance, and achieve
            measurable success in real time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full relative overflow-hidden items-center ">
          <Image
            className=" w-full p-10 h-full "
            src={Analytics2}
            alt="Analytics"
            width={0}
            height={0}
          />
          <Image
            className="w-full  h-full"
            src={Analytics1}
            alt="Analytics"
            width={0}
            height={0}
          />
        </div>
        <div className="pt-5 w-full justify-center items-center flex">
          <Button
            as={Link}
            href="/book-free-demo"
            size="lg"
            variant="solid"
            color="primary"
            radius="sm"
            className={`text-medium px-12 font-semibold shadow-sm `}
            endContent={<MoveRight />}
          >
            Book Free Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
