import { GetCompleteOrderData } from "@/actions/GetCompleteOrderData";
import { getOrderHistoryByOrderId } from "@/actions/getOrderHistoryByOrderId";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsEmojiAstonished } from "react-icons/bs";
import { PiWarningDiamond } from "react-icons/pi";

interface OrderDetailPageProps {
  params: {
    orderid?: string;
  };
}

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  // get Complete Order data from mobimatter .
  // const specificOrderId = await GetCompleteOrderData({
  //   orderId : params?.orderid,
  // });

  const specificOrderId: any = await getOrderHistoryByOrderId(params?.orderid!);

  // Function to format date
  let formatDateTime: any;
  if (params?.orderid !== "undefined") {
    formatDateTime = (dateTimeString: string) => {
      const options: any = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", options)?.format(
        new Date(dateTimeString)
      );
    };
  }

  return (
    <div className="max-w-2xl mx-auto my-5 px-3">
      {params?.orderid && params?.orderid !== "undefined" ? (
        <>
          <h2 className="font-semibold">Your eSIM</h2>
          {/* Top Card */}
          <div className="my-3 bg-white w-full p-2 rounded-md">
            {/* QR */}
            <Image
              // src={lineItems?.qrCode!}
              src={specificOrderId[0]?.qrcode!}
              alt="QR"
              width={180}
              height={180}
              className="object-contain mx-auto"
            />

            {/* Title */}
            <h2 className="text-center font-bold">
              {specificOrderId[0]?.title}
            </h2>

            {/* Provider Logo and Name */}
            <div className="flex items-center justify-center gap-y-1 mt-2">
              <Image
                src={specificOrderId[0]?.providerlogo as any}
                alt="logo"
                width={20}
                height={20}
              />
              <p className="text-txtgrey text-sm ml-2">
                {specificOrderId[0]?.provider}
              </p>
            </div>

            {/* Order Number and Date */}
            <div className="flex items-center justify-between">
              {/* Order Number */}
              <div className="text-left">
                <p className="text-txtgrey">Order #</p>
                <p className="text-gray-800 text-sm font-medium">
                  {specificOrderId[0]?.orderid}
                </p>
              </div>

              {/* Date */}
              <div className="text-right">
                <p className="text-txtgrey">Date</p>
                <p className="text-gray-800 text-sm font-medium">
                  {formatDateTime(specificOrderId[0]?.updatedtime!)}
                </p>
              </div>
            </div>

            <Separator className="bg-gray-200 my-2" />

            {/*Phone number and APN*/}
            <div className="flex items-center justify-between">
              {/* Phone number */}
              <div className="text-left">
                <p className="text-txtgrey">Phone #</p>
                <p className="text-gray-800 text-sm font-medium">
                  {specificOrderId[0]?.phone}
                </p>
              </div>

              {/* APN */}
              <div className="text-right">
                <p className="text-txtgrey">APN (Access Point Name)</p>
                <p className="text-gray-800 text-sm font-medium">
                  {specificOrderId[0]?.accesspointname}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="my-3 bg-white w-full p-2 rounded-md flex flex-col items-center justify-center gap-y-1 text-center">
            <PiWarningDiamond className="text-btnblue text-5xl" />
            <p className="font-bold text-lg">DO NOT DELETE THIS ESIM!</p>
            <p>The eSIM can be downloaded only once.</p>
          </div>

          {/* Return Button */}
          <Link href="/" className="my-5 block">
            <Button
              className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]"
              size="sm"
            >
              Continue shopping
            </Button>
          </Link>
        </>
      ) : (
        <>
          {/* Error UI*/}
          <div className="flex flex-col gap-y-3 h-[80dvh] w-full items-center justify-center">
            <BsEmojiAstonished className="text-7xl text-[#38BDEF]" />
            <h2 className="text-2xl md:text-3xl font-medium px-5 text-center">
              Something went wrong..
            </h2>
            {/* Return Button */}
            <Link href="/" className="my-5 block">
              <Button className="bg-[#38BDEF] min-w-full hover:text-[#38BDEF] hover:bg-white border border-[#38BDEF]">
                Back to Home
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetailPage;
