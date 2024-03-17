"use server";

import { db, siteTitle } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

interface UpdateSiteTitleProps {
  title?: string;
  id?: number;
}

export async function UpdateSiteTitle(options: UpdateSiteTitleProps = {}) {
  try {
    const { title, id } = options;
    console.log("Simple Id ---->", id);

    const updateSiteTitle = await db
      .update(siteTitle)
      .set({
        title: title?.toString(),
      })
      .where(eq(siteTitle.id, id as number))
      .returning();

    console.log("Update Result ---->", updateSiteTitle);

    return updateSiteTitle;
  } catch (error: any) {
    console.log("Unable to Update Site Title ", error.message);
  }
}
