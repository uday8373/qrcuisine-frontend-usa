import { Logo } from "@/components/icons/icons";
import { siteConfig } from "@/config/site";
import { Button, Link } from "@nextui-org/react";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <>
      <section
        id="ControlOrders"
        className="flex items-center flex-col justify-center w-full overflow-hidden "
      >
        <div className="w-full flex flex-col max-w-screen-xl px-6 pb-8">
          <div className="w-full border-t-2" />
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 pt-8 ">
            <div className="w-full flex flex-col col-span-1 md:order-1 lg:order-1 order-1">
              <Logo size={150} />
              <p className="text-medium  text-default-600 mt-4">
                Dining, Simplified and Rewarded.
              </p>
              <p className="text-medium  text-default-600 mt-0.5">
                Version 1.0.P
              </p>
            </div>
            <div className="w-full flex flex-col col-span-1 md:order-3 lg:order-2 order-2">
              <h3 className="text-large font-semibold mb-4 text-default-800">
                Indian Office
              </h3>
              <address className="not-italic">
                <p className="flex items-center mb-2 text-default-600 text-medium">
                  <MapPin size={20} className="mr-2" />
                  Purulia, West Bengal, India
                </p>
                <p className="flex items-center mb-2 text-default-600 text-medium">
                  <Mail size={20} className="mr-2" />
                  <a
                    href="mailto:myqrcuisine@gmail.com"
                    className="hover:underline transition-colors"
                  >
                    myqrcuisine@gmail.com
                  </a>
                </p>
                <p className="flex items-center mb-2 text-default-600 text-medium">
                  <Phone size={20} className="mr-2" />
                  <a
                    href="tel:+919064504565"
                    className="hover:underline transition-colors"
                  >
                    +91 906 450 4565
                  </a>
                </p>
              </address>
            </div>
            <div className="w-full flex flex-col col-span-1 md:order-4 lg:order-3 order-3">
              <h3 className="text-large font-semibold mb-4 text-default-800">
                North American Office
              </h3>
              <address className="not-italic">
                <p className="flex items-center mb-2 text-default-600 text-medium">
                  <MapPin size={20} className="mr-2" />
                  Sunrise Florida, USA
                </p>
                <p className="flex items-center mb-2 text-default-600 text-medium">
                  <Mail size={20} className="mr-2" />
                  <a
                    href="mailto:myqrcuisine@gmail.com"
                    className="hover:underline transition-colors"
                  >
                    myqrcuisine@gmail.com
                  </a>
                </p>
                <p className="flex items-center mb-2 text-default-600 text-medium">
                  <Phone size={20} className="mr-2" />
                  <a
                    href="tel:+1-(954)-326-0638"
                    className="hover:underline transition-colors"
                  >
                    +1-(954)-326-0638
                  </a>
                </p>
              </address>
            </div>
            <div className="flex items-end justify-center flex-col gap-5 w-full h-full col-span-1 md:order-2 lg:order-4 order-4">
              <div className=" w-full lg:justify-end items-center flex ">
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
              <div className=" w-full lg:justify-end items-center flex">
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
          <div className="mt-8 pt-8 border-t-2 text-center">
            <p className="text-medium font-medium text-default-500">
              © {new Date().getFullYear()}{" "}
              <a
                target="_blank"
                href="https://erexstudio.com"
                className="underline underline-offset-2 hover:opacity-70"
              >
                Erex Studio
              </a>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
