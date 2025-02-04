"use client";

import Image from "next/image";
import Link from "next/link";
import { type RouterOutputs } from "~/trpc/react";

interface MyMentoringCardPropsInterface {
  data: RouterOutputs["userRoute"]["mentoring"]["getAllMyMentoring"][number];
}

const MyMentoringCard = ({ data }: MyMentoringCardPropsInterface) => {
  // const { data: invoiceData, isLoading } =
  //   api.userRoute.purchase.getInvoiceData.useQuery({
  //     invoiceId: data.invoiceId ?? "",
  //   });

  // let status = "";

  // if (invoiceData?.status === undefined) {
  //   status = "Loading";
  // } else if (invoiceData?.status === "PAID") {
  //   status = "Payment Completed";
  // }

  // if (isLoading) {
  //   return <UserDashboardSkeleton />;
  // }

  return (
    <Link
      href={`/mentoring/${data.mentoring?.mentoringId}`}
      className="relative flex w-full flex-col gap-4 rounded-lg border-[1.5px] bg-white p-4 md:flex-row"
    >
      <div className="md:absolute right-0 top-0 rounded-lg md:rounded-br-none md:rounded-tl-none bg-primary px-4 py-2 font-semibold text-white">
        Mentoring
      </div>
      <div className="relative aspect-[1/1] w-full flex-[2] shrink-0 overflow-hidden rounded-lg bg-primary md:aspect-[1/1] md:max-w-[280px]">
        <Image
          fill
          src={
            data.mentoring?.mentoring?.mentor.image ??
            "/images/default/thumbnail_career_guidance_default.png"
          }
          alt="Thumbnail Career Guidane"
          className="object-cover"
        />
      </div>
      <div className="flex flex-[3] flex-col gap-3">
        <div className="text-xl font-semibold">
          {data.mentoring?.mentoring?.mentor.name}
        </div>
        <div className="text-base font-semibold">
          {data.mentoring?.mentoring?.mentor.title}
        </div>
        <div className="flex flex-wrap gap-2">
          {data.mentoring?.mentoring?.mentor.expertise
            .split(",")
            .map((expert, index) => (
              <div
                key={index}
                className="w-fit rounded-lg bg-primary-dark px-2 py-1 text-sm font-semibold text-white"
              >
                {expert}
              </div>
            ))}
        </div>
        <div className="text-justify text-gray-700">
          {data.mentoring?.mentoring?.mentor?.desc}
        </div>
        {/* {invoiceData?.status === "PAID" || invoiceData?.status === "SETTLED" ? (
          <Link href={"https://wa.me/628179922903"} className="w-full">
            <Button className="w-full">Request Session</Button>
          </Link>
        ) : (
          <></>
        )}
        <Separator />
        <div className="flex w-full items-center justify-between">
          <div className="font-medium">Status</div>
          {invoiceData?.status === "PAID" ||
          invoiceData?.status === "SETTLED" ? (
            <Badge>{status}</Badge>
          ) : invoiceData?.status === "EXPIRED" ? (
            <Badge variant={"destructive"}>Expired</Badge>
          ) : (
            <Link href={data?.invoiceUrl ?? ""}>
              <Button>Payout</Button>
            </Link>
          )}
        </div> */}
      </div>
    </Link>
  );
};

export default MyMentoringCard;
