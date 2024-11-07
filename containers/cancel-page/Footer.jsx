import { Button } from "@nextui-org/react";
import { ArrowLeftFromLine, PhoneCall } from "lucide-react";
import React from "react";

export default function Footer({ handleHome }) {
  return (
    <section
      id="Cancel_bottom"
      className="fixed bottom-0 backdrop-blur-xl shadow-small flex justify-center mx-auto w-full px-5 rounded-t-large"
    >
      <div className="py-5 gap-2 w-full grid grid-cols-1 z-10">
        <Button
          size="lg"
          variant="flat"
          color="default"
          className="font-medium"
          startContent={<PhoneCall size={18} />}
        >
          Contact Support
        </Button>
        <Button
          onClick={handleHome}
          size="lg"
          color="success"
          variant="solid"
          className="font-medium text-white"
          startContent={<ArrowLeftFromLine size={18} />}
        >
          Return to Home
        </Button>
      </div>
    </section>
  );
}
