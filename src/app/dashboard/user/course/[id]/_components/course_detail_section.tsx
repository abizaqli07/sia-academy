"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { SiOpslevel } from "react-icons/si";
import { type z } from "zod";
import BootcampBenefitComp from "~/components/section/bootcamp_benefit";
import MentoringBenefitComp from "~/components/section/mentoring_benefit";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useToast } from "~/hooks/use-toast";
import { currencyFormatter } from "~/lib/utils";
import { type CourseIdSchema } from "~/server/validator/course";
import { api, type RouterOutputs } from "~/trpc/react";
import MentorSliderSection from "./mentor_slider";

interface CourseDetailPropsInterface {
  data: RouterOutputs["userRoute"]["course"]["getOneCourse"];
}

const CourseDetailSection = ({ data }: CourseDetailPropsInterface) => {
  return (
    <>
      <div className="container flex min-h-screen gap-8">
        {/* Main Section */}
        <section className="min-h-screen w-full pt-[12.5vh] lg:flex-[2]">
          {/* Header */}
          <div className="flex w-full flex-col gap-8 rounded-lg">
            <div className="relative aspect-[3/1] max-h-[300px] w-full rounded-lg">
              <Image
                alt="Banner Course"
                src={data?.bannerImage ?? "/images/courses/aimasterclass.png"}
                fill
                className="rounded-xl object-contain object-top"
              />
            </div>
            {data?.isFree && (
              <div className="w-full space-y-4">
                <div className="text-lg font-bold">
                  PENGETAHUAN INDUSTRI EKSKLUSIF {data.isFree ? ", GRATIS!" : ""}
                </div>
                <div className="text-5xl font-bold text-primary">
                  {data.title}
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4 rounded-lg border-[1.5px] border-gray-300 p-2 lg:hidden">
              <BuySection data={data} />
            </div>
          </div>

          {/* Benefit */}
          {data?.isFree ? <MentoringBenefitComp /> : <BootcampBenefitComp />}

          <Separator className="mt-[20px] bg-gray-400" />

          {/* Description */}
          <div className="mt-[20px] w-full">
            <div className="flex flex-col gap-4">
              <div className="text-xl font-bold">
                <span className="text-sm text-primary">Tentang Kelas</span>{" "}
                <br />
                {data?.titleDesc}
              </div>
              <div className="text-justify text-gray-600">
                <div
                  className="space-y-4"
                  dangerouslySetInnerHTML={{ __html: data?.desc ?? "" }}
                ></div>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-4">
              <div className="text-xl font-bold">
                <span className="text-sm text-primary">Kurikulum</span> <br />
                Materi yang dipelajari!
              </div>
              <div className="flex flex-wrap gap-4">
                {data?.materi?.split(",").map((materi, index) => (
                  <div
                    key={index}
                    className="w-fit rounded-lg bg-primary/30 px-4 py-2"
                  >
                    {materi}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mentor & Expert */}
          <MentorSliderSection data={data} />
        </section>

        {/* Right Section */}
        <section className="relative hidden min-h-screen w-full flex-[1] pt-[12.5vh] lg:flex">
          <div className="sticky top-[12.5vh] flex h-fit w-full flex-col gap-4 rounded-lg bg-gray-200 p-4">
            <BuySection data={data} />
          </div>
        </section>
      </div>
    </>
  );
};

const BuySection = ({ data }: CourseDetailPropsInterface) => {
  const router = useRouter();
  const { toast } = useToast();
  const context = api.useUtils();

  const HDate = data?.date?.valueOf() ?? Date.now().valueOf();

  const isAvailable = HDate > Date.now().valueOf();

  const createInvoice = api.userRoute.purchase.purchaseCourse.useMutation({
    async onSuccess(data) {
      await context.userRoute.course.getAllMyCourse.invalidate();

      if (data.url === null) {
        console.log(data.error);
      } else {
        router.push(data.url);
      }
    },
    onError(error) {
      toast({
        title: error.data?.code,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof CourseIdSchema>) => {
    createInvoice.mutate(values);
  };

  return (
    <>
      <div className="text-2xl font-bold">{data?.title}</div>
      <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2">
          <MdOutlineDateRange className="text-xl" />
          {data?.date?.toLocaleDateString("in-ID")}
        </div>
        {data?.isFree ? (
          <div className="flex items-center gap-2">
            <FaRegClock className="text-xl" />
            {data?.date?.toLocaleTimeString("in-ID")} WIB
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <SiOpslevel className="text-xl" />
            {data?.level}
          </div>
        )}
        <div className="flex items-center gap-2">
          <FaLocationDot className="text-xl" />
          {data?.place}
        </div>
      </div>
      <Separator className="bg-gray-400" />
      <div className="flex w-full flex-col gap-3 rounded-lg bg-gray-200 p-4">
        {data?.isSale ?? data?.isFree ? (
          <Badge variant={"destructive"} className="w-fit">
            Promo
          </Badge>
        ) : (
          <></>
        )}
        <div className="flex justify-between font-semibold">
          <div>Total Harga :</div>
          {data?.isFree ? (
            <div className="text-xl font-semibold text-primary">Free</div>
          ) : (
            <div className="flex items-center gap-2">
              <div className={`${data?.isSale ? "line-through" : ""}`}>
                {currencyFormatter.format(Number(data?.price))}
              </div>
              {data?.isSale ? (
                <div className="text-lg font-semibold text-primary">
                  {currencyFormatter.format(Number(data?.salePrice))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={() =>
            onSubmit({
              courseId: data?.id ?? "",
            })
          }
          disabled={!isAvailable}
        >
          {isAvailable ? "Daftar Sekarang" : "Pendaftaran Ditutup"}
        </Button>

        {!isAvailable && (
          <div className="text-center text-sm font-medium text-red-500">
            *Tunggu webinar kami selanjutnya*
          </div>
        )}
      </div>
    </>
  );
};

export default CourseDetailSection;
