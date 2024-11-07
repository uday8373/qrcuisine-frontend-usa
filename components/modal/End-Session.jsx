"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/navigation";
import supabase from "@/config/supabase";
import { LogoutLogo } from "../icons/logout";
import { clearLocalStorage } from "@/hooks/clearLocalStorage";

const EndSession = ({ isOpen, onOpenChange, tableId, userId }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const updateTablePromise = supabase
        .from("tables")
        .update({
          is_booked: false,
          persons: null,
          order_id: null,
          user_id: null,
        })
        .eq("id", tableId)
        .select();

      const updateUserPromise = supabase
        .from("users")
        .update({ is_active: false, closed_at: new Date().toISOString() })
        .eq("id", userId)
        .select();

      const [
        { data: tableData, error: tableError },
        { data: userData, error: userError },
      ] = await Promise.all([updateTablePromise, updateUserPromise]);

      if (tableError) throw tableError;
      if (userError) throw userError;

      await clearLocalStorage();

      router.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Close Session</ModalHeader>
            <ModalBody>
              <div className="flex flex-col justify-center items-center">
                <LogoutLogo size={170} className="-mt-3" />
                <p className="text-center font-medium text-medium">
                  Are you sure, you want to end this booking?
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Continue Booking
              </Button>
              <Button color="danger" onClick={handleLogout}>
                Close Session
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EndSession;
