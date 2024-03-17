"use server";

import { db, mobiusers } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

interface CheckUserExistInDatbaseProps {
  email?: string;
}

export async function CheckUserExistInDatbase(
  options: CheckUserExistInDatbaseProps = {}
) {
  try {
    const { email } = options;

    const user = await db
      .select()
      .from(mobiusers)
      .where(eq(mobiusers.email, email as string));

    if (user.length === 0) {
      return false;
    }

    return true;
  } catch (error: any) {
    console.log("Unable to fetch the user exist in database ", error.message);
  }
}
