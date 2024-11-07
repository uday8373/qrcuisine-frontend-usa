import { siteConfig } from "@/config/site";
import supabase from "@/config/supabase";
import moment from "moment-timezone";

export const fetchOrderData = async (orderId) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `*, sub_orders(*, status_id(*)), tables: table_id(id, table_no), waiters: waiter_id(id, name), restaurant_id: restaurants(id, is_tip_percentage, restaurant_name, logo, payment_qr, google_review_url, unique_name, gst_percentage), status_id: status_table(id, title, description, sorting) , users: users(id, name,mobile), cancelled_reason: cancelled_reason(id, title, description)`
      )
      .eq("id", orderId)
      .single();

    if (error) throw error;
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return null;
  }
};
export const fetchStatusData = async () => {
  try {
    const { data, error } = await supabase
      .from("status_table")
      .select("*")
      .order("sorting", { ascending: true });

    if (error) throw error;
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching table data:", error);
    return null;
  }
};

export const updateVisitorConfirm = async (restaurantId) => {
  try {
    const startDate = moment()
      .tz(siteConfig?.timeZone)
      .startOf("day")
      .format("YYYY-MM-DD");
    const endDate = moment()
      .tz(siteConfig?.timeZone)
      .add(1, "day")
      .startOf("day")
      .format("YYYY-MM-DD");

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, order_confirm_count")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", startDate)
      .lt("created_at", endDate)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.order_confirm_count) + 1;
      upsertData = { id: existingRecord.id, order_confirm_count: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        order_confirm_count: count,
      };
    }

    const { data, error: upsertError } = await supabase
      .from("visitors")
      .upsert(upsertData, { onConflict: ["id"] })
      .select("id");

    if (upsertError) throw upsertError;

    return data;
  } catch (error) {
    console.error("Error updating visitors:", error);
    return null;
  }
};

export const updateVisitorPreparing = async (restaurantId) => {
  try {
    const startDate = moment()
      .tz(siteConfig?.timeZone)
      .startOf("day")
      .format("YYYY-MM-DD");
    const endDate = moment()
      .tz(siteConfig?.timeZone)
      .add(1, "day")
      .startOf("day")
      .format("YYYY-MM-DD");

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, order_preparing_count")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", startDate)
      .lt("created_at", endDate)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.order_preparing_count) + 1;
      upsertData = { id: existingRecord.id, order_preparing_count: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        order_preparing_count: count,
      };
    }

    const { data, error: upsertError } = await supabase
      .from("visitors")
      .upsert(upsertData, { onConflict: ["id"] })
      .select("id");

    if (upsertError) throw upsertError;

    return data;
  } catch (error) {
    console.error("Error updating visitors:", error);
    return null;
  }
};

export const updateVisitorDelivered = async (restaurantId) => {
  try {
    const startDate = moment()
      .tz(siteConfig?.timeZone)
      .startOf("day")
      .format("YYYY-MM-DD");
    const endDate = moment()
      .tz(siteConfig?.timeZone)
      .add(1, "day")
      .startOf("day")
      .format("YYYY-MM-DD");

    const { data: existingRecord, error: fetchError } = await supabase
      .from("visitors")
      .select("id, order_delivered_count")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", startDate)
      .lt("created_at", endDate)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    let count = 1;
    let upsertData;

    if (existingRecord) {
      count = parseInt(existingRecord.order_delivered_count) + 1;
      upsertData = { id: existingRecord.id, order_delivered_count: count };
    } else {
      upsertData = {
        restaurant_id: restaurantId,
        order_delivered_count: count,
      };
    }

    const { data, error: upsertError } = await supabase
      .from("visitors")
      .upsert(upsertData, { onConflict: ["id"] })
      .select("id");

    if (upsertError) throw upsertError;

    return data;
  } catch (error) {
    console.error("Error updating visitors:", error);
    return null;
  }
};

export const getNotifications = async (orderId, userId) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("order_id", orderId)
      .eq("user_id", userId)
      .eq("user_read", false)
      .order("created_at", { ascending: false })
      .limit(2);

    if (error) throw error;
    return data ? data : null;
  } catch (error) {
    console.error("Error fetching notification data:", error);
  }
};

export const updateNofication = async (id) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .update({ user_read: true })
      .eq("id", id)
      .select("id");

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating notification status:", error);
  }
};
