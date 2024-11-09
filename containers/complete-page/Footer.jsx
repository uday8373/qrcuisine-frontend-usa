import { Button, Link } from "@nextui-org/react";
import { ArrowLeftFromLine, Download, Star, UserPen } from "lucide-react";
import React from "react";

export default function Footer({ orderData, handleHome }) {
  return (
    <section
      id="checkout_bottom"
      className="fixed bottom-0 bg-background shadow-small flex justify-center mx-auto w-full px-5 rounded-t-large"
    >
      <div className="py-5 gap-2 w-full grid grid-cols-5">
        <Button
          onClick={() => handleHome()}
          variant="flat"
          color="default"
          size="lg"
          className="font-medium col-span-2"
          startContent={<ArrowLeftFromLine size={18} />}
        >
          Home
        </Button>
        <Button
          as={Link}
          href={orderData?.restaurant_id?.google_review_url}
          color="success"
          variant="solid"
          size="lg"
          className="text-white font-medium col-span-3"
          startContent={<Star size={18} />}
        >
          Google Review
        </Button>
      </div>
    </section>
  );
}
