"use client";

import React from "react";
import QRCodeScanner from "@/components/modal/QR-Scanner";
import { ScanLine } from "lucide-react";
import { Button, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function QrScannerForMoblie() {
  const pathName = usePathname();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (
    pathName !== "/" &&
    pathName !== "/register-business" &&
    pathName !== "/home"
  ) {
    return null;
  }

  return (
    <section
      id="QrScan"
      className="flex items-center justify-center w-full sticky bottom-0 z-40 backdrop-blur-xl bg-primary-100 overflow-hidden border-t border-default-300"
    >
      <div className="w-full md:hidden justify-between grid grid-cols-3 items-center py-3 px-6 z-10">
        <h3 className="text-default-700 text-md font-semibold col-span-2">
          Inside a QRCuisine powered restaurant ?
        </h3>
        <div className="flex w-full justify-end">
          <Button
            onClick={onOpen}
            color="primary"
            href="#"
            variant="solid"
            className="font-medium w-fit"
            size="md"
            startContent={<ScanLine size={18} />}
          >
            Scan Now
          </Button>
        </div>
        <QRCodeScanner isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </section>
  );
}
