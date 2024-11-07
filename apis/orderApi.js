import { siteConfig } from "@/config/site";
import supabase from "@/config/supabase";
import CryptoJS from "crypto-js";

export const fetchOrderHisory = async (filter) => {
  try {
    const encryptedToken = localStorage.getItem("userToken");

    if (!encryptedToken) {
      return null;
    }
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedToken,
      siteConfig.cryptoSecret
    );

    const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);

    let query = supabase
      .from("orders")
      .select(
        "*, restaurant_id(restaurant_name, logo), status_id(title, sorting)",
        {
          count: "exact",
        }
      )
      .eq("verified_user_id", decryptedToken)
      .order("created_at", { ascending: false });

    switch (filter) {
      case "Delivered":
        query = query.eq("is_delivered", true);
        break;
      case "Cancelled":
        query = query.eq("is_cancelled", true);
        break;
      case "Abandoned":
        query = query.eq("is_abandoned", true);
        break;
      default:
        break;
    }

    const { data, count, error } = await query;
    if (error) throw error;
    return { data, count };
  } catch (error) {
    console.error("Error fetching restaurant data:", error);
  }
};
