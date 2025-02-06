"use client";

import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Button } from "~/components/ui/button";

import { Separator } from "~/components/ui/separator";
import ConsultButton from "./consult_button";
import RegisterButton from "./register_button";
import { type RouterOutputs } from "~/trpc/react";
import MentoringBenefitComp from "~/components/section/mentoring_benefit";

interface DetailMentoringPropsInterface {
  data: RouterOutputs["userRoute"]["mentoring"]["getOneMentoring"];
  session: Session | null;
}

const DetailMentorSection = ({
  data,
  session,
}: DetailMentoringPropsInterface) => {
  return (
    <>
      <div className="container flex min-h-screen gap-8">
        {/* Main Section */}
        <section className="min-h-screen w-full pt-[12.5vh] lg:flex-[2]">
          {/* Header */}
          <div className=" flex w-full flex-col gap-8 rounded-lg">
            <div className="relative aspect-[3/1] max-h-[300px] w-full rounded-lg">
              <Image
                alt="Banner Course"
                src={data?.bannerImage ?? "/images/courses/aimasterclass.png"}
                fill
                className=" rounded-xl object-contain object-top"
              />
            </div>
            <div className=" flex flex-col gap-4 rounded-lg border-[1.5px] border-gray-300 p-2 lg:hidden">
              <BuySection data={data} session={session} />
            </div>
          </div>

          {/* Mentor & Expert */}
          <div className="mt-[30px] flex w-full flex-col gap-8">
            <div className="text-xl font-bold">
              <span className="text-sm text-primary">Subject Expert</span>
              <br />
              Get to Know Our Mentor!
            </div>
            <div className="flex w-full flex-col gap-4 rounded-lg border-[1.5px] bg-white p-4 sm:flex-row">
              <div className="aspect-square max-w-[280px] flex-1 rounded-lg bg-primary">
                <div className="relative h-full w-full">
                  <Image
                    alt="Expert Image"
                    src={data?.mentor.image ?? "/images/profile_picture.jpeg"}
                    fill
                    className=" object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="text-lg font-semibold">{data?.mentor.name}</div>
                <div className="text-sm font-bold text-gray-500">
                  {data?.mentor.title}
                </div>
                <div className="text-justify text-gray-700">
                  {data?.mentor.desc}
                </div>
                <div className="flex gap-3">
                  {data?.mentor.github && (
                    <Link href={data?.mentor.github}>
                      <Button variant={"outline"}>
                        <FaGithub className="mr-2 text-2xl" />
                        Github
                      </Button>
                    </Link>
                  )}
                  {data?.mentor.linkedin && (
                    <Link href={data?.mentor.linkedin}>
                      <Button variant={"outline"}>
                        <FaLinkedin className="mr-2 text-2xl" />
                        LinkedIn
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Keterampilan */}
          <div className="mt-[30px] w-full">
            <div className="mt-8 flex flex-col gap-4">
              <div className="text-xl font-bold">
                <span className="text-sm text-primary">Learning Path</span>{" "}
                <br />
                Materi yang dipelajari!
              </div>
              <div className="flex flex-wrap gap-4">
                {data?.materi.split(",").map((data, index) => (
                  <div
                    key={index}
                    className="w-fit rounded-lg bg-primary/30 px-4 py-2"
                  >
                    {data}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefit */}
          <MentoringBenefitComp />
        </section>

        {/* Right Section */}
        <section className="relative hidden min-h-screen w-full flex-[1] pt-[12.5vh] lg:flex">
          <div className=" sticky top-[12.5vh] flex h-fit w-full flex-col gap-4 rounded-lg bg-gray-200 p-4">
            <BuySection data={data} session={session} />
          </div>
        </section>
      </div>
    </>
  );
};

const BuySection = ({ data, session }: DetailMentoringPropsInterface) => {
  return (
    <>
      <div className="text-2xl font-bold">
        Let&#39;s Have A Mentoring Session
      </div>
      <div className="flex flex-col gap-3 text-sm font-medium text-gray-700">
        <div
          className="space-y-4"
          dangerouslySetInnerHTML={{ __html: data?.desc ?? "" }}
        ></div>
      </div>
      <Separator className="bg-gray-400" />

      {session === null ? (
        <Link href={`/auth/signin?redirect=/mentoring/${data?.id}`}>
          <Button>Login Dahulu Untuk Daftar</Button>
        </Link>
      ) : (
        <>
          <ConsultButton data={data} />
          <RegisterButton data={data} />
        </>
      )}
    </>
  );
};

export default DetailMentorSection;
