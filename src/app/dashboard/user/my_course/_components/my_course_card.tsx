"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import UserDashboardSkeleton from "~/components/dashboard_skeleton";
import { Badge } from "~/components/ui/badge";

import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { api, type RouterOutputs } from "~/trpc/react";

interface MyCourseCardPropsInterface {
  data: RouterOutputs["userRoute"]["course"]["getAllMyCourse"][number];
}

const MyCourseCard = ({ data }: MyCourseCardPropsInterface) => {
  const router = useRouter();

  const {
    data: invoiceData,
    isLoading,
    isError,
  } = api.userRoute.purchase.getInvoiceData.useQuery({
    invoiceId: data.invoiceId ?? "",
  });

  let status = "";
  const paymentComplete =
    invoiceData?.status === "PAID" || invoiceData?.status === "SETTLED";

  if (invoiceData?.status === undefined) {
    status = "Loading";
  } else if (
    invoiceData?.status === "PAID" ||
    invoiceData.status === "SETTLED"
  ) {
    status = "Payment Completed";
  }

  if (isLoading) {
    return <UserDashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Something Wrong Occured
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-lg border-[1.5px] bg-white p-4 dark:bg-primary-dark md:flex-row">
      <div className="left-0 top-0 z-30 rounded-lg bg-primary px-4 py-2 font-semibold text-white md:absolute md:rounded-bl-none md:rounded-tr-none">
        {data.course?.isWebinar ? "Webinar" : "Bootcamp"}
      </div>

      <div className="relative aspect-[3/2] w-full flex-[2] shrink-0 overflow-hidden rounded-lg bg-primary md:aspect-[3/2]">
        <Image
          fill
          src={
            data.course?.image ??
            "/images/default/thumbnail_career_guidance_default.png"
          }
          alt="Thumbnail Course"
          className="object-cover"
        />
      </div>
      <div className="flex flex-[3] shrink-0 flex-col gap-3">
        <div className="text-2xl font-semibold">{data.course?.title}</div>
        <div className="w-fit rounded-lg bg-primary px-2 py-1 text-sm font-semibold text-white">
          {data.course?.category.name}
        </div>
        <div className="flex flex-col gap-1 font-medium">
          <div className="flex items-center gap-2">
            <IoMdBook className="text-xl" />{" "}
            {data.course?.materi?.split(",").length} Sessions
          </div>
          <div className="flex items-center gap-2">
            <MdOutlineDateRange className="text-xl" />
            {data.course?.date?.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <FaLocationDot className="text-xl" />
            {data.course?.place}
          </div>
          {data.status === "FREE" && data.course?.placeUrl ? (
            <Button
              onClick={() => router.push(data.course?.placeUrl ?? "")}
              className="mt-4"
            >
              Zoom meet Link
            </Button>
          ) : (
            ""
          )}
          {data.course?.isWebinar === false && paymentComplete ? (
            <Button
              onClick={() =>
                router.push(`/dashboard/user/my_course/${data.courseId}`)
              }
            >
              Start Learning
            </Button>
          ) : (
            <div></div>
          )}
        </div>
        <Separator />
        <div className="flex w-full items-center justify-between">
          <div className="font-medium">Status</div>
          {data?.status === "FREE" ? (
            <Badge>Free</Badge>
          ) : paymentComplete ? (
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

export default MyCourseCard;
