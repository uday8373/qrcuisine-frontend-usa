import { Logo } from "@/components/icons/icons";
import { siteConfig } from "@/config/site";
import { Button, Link } from "@nextui-org/react";
import React from "react";

export default function Footer() {
  return (
    <>
      <section
        id="ControlOrders"
        className="flex items-center flex-col justify-center w-full bg-gradient-to-t from-secondary-100 to-primary-100 overflow-hidden"
      >
        <div className="w-full flex flex-col md:items-center gap-5 md:flex-row max-w-screen-xl px-6 py-10 relative">
          <div className="text-default-500 absolute bottom-5 lg:flex w-full justify-center hidden text-xs font-bold tracking-widest">
            <h5>
              V{" "}
              {siteConfig.isProduction
                ? siteConfig.productionVersion
                : siteConfig.developementVersion}
            </h5>
          </div>
          <div className="space-y-3 text-default-800">
            <Logo />
            <div className="text-default-800 flex flex-col">
              <Link
                href="mailto:myqrcuisine@gmail.com"
                className="w-fit text-default-800 my-1"
              >
                myqrcuisine@gmail.com
              </Link>
              <Link
                href="tel: 9064504565"
                className="w-fit text-default-800 my-1"
              >
                +91 9064504565
              </Link>
            </div>
            <p>
              Purulia, West Bengal <br />
              India
            </p>
            <p>
              A product by{" "}
              <Link
                target="_blank"
                href="https://erexstudio.com"
                className="font-bold text-primary"
              >
                Erex Studio
              </Link>
            </p>
          </div>
          <div className="flex items-end justify-center flex-col gap-5 w-full h-full ">
            <div className=" w-full md:justify-end items-center flex ">
              <Button
                as={Link}
                href="/book-free-demo"
                size="lg"
                variant="solid"
                color="primary"
                radius="sm"
                className={`text-small !w-60  font-semibold shadow-sm `}
              >
                Schedule a demo
              </Button>
            </div>{" "}
            <div className=" w-full md:justify-end items-center flex">
              <Button
                as={Link}
                href="/restaurant-registration"
                size="lg"
                variant="solid"
                color="secondary"
                radius="sm"
                className={`text-small !w-60  font-semibold shadow-sm `}
              >
                Register Restaurant
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
