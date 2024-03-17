"use server";

import { getAdminKeys } from "./getAdminKeys";

interface GetCompleteOrderDataProps {
  orderId?: string;
}

export async function GetCompleteOrderData(
  options: GetCompleteOrderDataProps = {}
) {
  try {
    const adminKeys: any = await getAdminKeys();
    const { orderId } = options;

    const getOrderData = await fetch(
      `https://api.mobimatter.com/mobimatter/api/v2/order/${orderId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          // "api-key": process.env.MOBI_API_KEY as string,
          "api-key": adminKeys[0]?.apikey as string,
          // MerchantId: process.env.MOBI_MERCHANT_ID as string,
          MerchantId: adminKeys[0]?.merchantid as string,
        },
      }
    );

    if (!getOrderData.ok) {
      throw new Error(`HTTP error! Status: ${getOrderData.status}`);
    }

    const data = await getOrderData.json();

    return data;
  } catch (error: any) {
    console.error("Error fetching order data:", error.message);
  }
}
