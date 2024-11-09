import { siteConfig } from "@/config/site";
import supabase from "@/config/supabase";
import moment from "moment-timezone";

export const fetchAllPointData = async (value) => {
  try {
    let query = supabase.from("loyality_point").select("*, user_id(*)");

    if (value === "week") {
      const last7Days = moment()
        .tz(siteConfig?.timeZone)
        .subtract(7, "days")
        .format("YYYY-MM-DD");
      query = query.gte("created_at", last7Days);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching loyalty point data:", error);
  }
};
