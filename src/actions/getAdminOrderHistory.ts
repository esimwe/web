"use server";
import { asc } from "drizzle-orm";
import { db, orders } from "../lib/drizzle";

export async function getAdminOrderHistory() {
  try {
    // get order history data for Admin Panel
    const data = await db.select().from(orders).orderBy(asc(orders.id));

    return data;
  } catch (error: any) {
    // throw new Error("Unable to Fetch order History For Admin Panel!");
    console.log(
      "Unable to Fetch order History For Admin Panel!",
      error.message
    );
  }
}
