"use client";

import React from "react";
import QRCodeScanner from "@/components/modal/QR-Scanner";
import { ScanLine } from "lucide-react";
import { Button, useDisclosure } from "@nextui-org/react";
export default function QrScan() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div
      id="QrScan"
      className="flex items-center justify-center w-full bg-primary-200"
    >
      <div className=" w-full md:flex justify-between hidden items-center  max-w-screen-xl py-6 px-6 z-10">
        <h3 className="text-[#2B251A] text-2xl lg:text-3xl font-bold">
          Inside a QRCuisine powered restaurant ?
        </h3>
        <Button
          onClick={onOpen}
          color="primary"
          href="#"
          variant="solid"
          className="font-medium w-fit px-10"
          size="lg"
          startContent={<ScanLine size={18} />}
        >
          Scan Now
        </Button>

        <QRCodeScanner isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </div>
  );
}
