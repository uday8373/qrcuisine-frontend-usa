"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
} from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const QRCodeScanner = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const videoRef = useRef(null);

  useEffect(() => {
    let qrScanner;

    if (isOpen && videoRef.current) {
      qrScanner = new QrScanner(videoRef.current, (result) => {
        router.replace(result);
        onOpenChange(false);
      });
      qrScanner.start();
    }
    return () => {
      if (qrScanner) {
        qrScanner.stop();
      }
    };
  }, [isOpen, onOpenChange, router]);

  return (
    <Modal
      backdrop="blur"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Scan QR code
            </ModalHeader>
            <ModalBody className="py-0 ">
              <div className="w-full h-full flex relative overflow-hidden rounded-xl">
                <video ref={videoRef} className="w-full h-full" />
                <motion.div
                  className="absolute w-full h-1 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, y: [0, 350] }}
                  transition={{
                    opacity: { delay: 1, duration: 0.5 },
                    y: {
                      delay: 1,
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                    },
                  }}
                />
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default QRCodeScanner;
