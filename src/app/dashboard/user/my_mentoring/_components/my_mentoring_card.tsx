"use client";

import Image from "next/image";
import Link from "next/link";
import UserDashboardSkeleton from "~/components/dashboard_skeleton";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { api, type RouterOutputs } from "~/trpc/react";
import RequestButton from "./request_button";

interface MyMentoringCardPropsInterface {
  data: RouterOutputs["userRoute"]["mentoring"]["getAllMyMentoring"][number];
}

const MyMentoringCard = ({ data }: MyMentoringCardPropsInterface) => {
  const {
    data: recentSession,
    isLoading,
    isError,
  } = api.userRoute.mentoring.getRecentSession.useQuery({
    mentoringDataId: data.mentoringId ?? "",
  });

  const {
    data: invoiceData,
    isLoading: invoiceLoading,
    isError: invoiceError,
  } = api.userRoute.purchase.getInvoiceData.useQuery({
    invoiceId: data.invoiceId ?? "",
  });

  if (isLoading || invoiceLoading) {
    return <UserDashboardSkeleton />;
  }

  if (isError || invoiceError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Something Wrong Occured
      </div>
    );
  }

  let status = "";
  const paymentComplete =
    invoiceData?.status === "PAID" || invoiceData?.status === "SETTLED";

  if (invoiceData?.status === undefined) {
    status = "Loading";
  } else if (
    invoiceData?.status === "PAID" ||
    invoiceData?.status === "SETTLED"
  ) {
    status = "Payment Completed";
  }

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-lg border-[1.5px] bg-white p-4 dark:bg-primary-dark md:flex-row">
      <div className="left-0 top-0 z-30 rounded-lg bg-primary px-4 py-2 font-semibold text-white md:absolute md:rounded-bl-none md:rounded-tr-none">
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
        {paymentComplete || data.status === "FREE" ? (
          <RequestButton
            mentoringDataId={data.mentoringId ?? ""}
            schedules={recentSession}
          />
        ) : (
          <></>
        )}
        <Separator />
        <div className="flex w-full items-center justify-between">
          <div className="font-medium">Status</div>
          {paymentComplete ? (
            <Badge>{status}</Badge>
          ) : invoiceData?.status === "EXPIRED" ? (
            <Badge variant={"destructive"}>Expired</Badge>
          ) : (
            <Link href={data?.invoiceUrl ?? ""}>
              <Button>Payout</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMentoringCard;
