"use server";

import { db, siteTitle } from "@/lib/drizzle";

export async function GetSiteTitle() {
  try {
    // check if the adminKeys table is empty
    const firstRecord = await db.select().from(siteTitle).limit(1);
    // console.log("First Record ----> ", firstRecord);

    if (firstRecord.length === 0) {
      const insertTitle = await db
        .insert(siteTitle)
        .values({
          title: " eSimWE | We are Your eSim Provider ",
        })
        .returning();

      return insertTitle;
    } else {
      // If the table is not empty, retrieve the existing records
      const siteTITLE = await db.select().from(siteTitle);
      return siteTITLE;
    }
  } catch (error: any) {
    console.log("Error in Fetching the Site Title");
  }
}
