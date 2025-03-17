"use client";

import { ArrowUpRight, BookCheck, ChevronRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { currencyFormatter } from "~/lib/utils";

const tabs = [
  {
    id: "mentor",
    title: "Mentor",
  },
  {
    id: "bootcamp",
    title: "Bootcamp",
  },
];

const HomePage = () => {
  const [tab, setTab] = useState("mentor");

  return (
    <div className="min-h-screen w-full">
      {/* ========== Hero ========== */}
      <section className="container mx-auto h-screen">
        <div className="flex h-full w-full flex-col space-y-20 pt-52">
          <div className="relative">
            {/* Main Header */}
            <div className="relative z-10 flex flex-col items-center gap-12 text-[60px] font-semibold">
              <div className="flex items-center gap-6">
                Everything <div className="title__comp"></div> You
              </div>
              <div className="flex items-center gap-6">
                Need <div className="title__comp"></div> To Crow Your
              </div>
              <div className="flex items-center gap-6">Marketing & Sales</div>
            </div>

            {/* Main Image */}
            <div className="absolute -top-[30px] left-0 z-0">
              <div className="h-[550px] w-[300px] overflow-hidden rounded-br-[100px] rounded-tl-[100px] bg-primary">
                <div className="h-[470px] w-full rounded-br-[100px] bg-gray-100"></div>
                <div className="flex h-[80px] items-end p-4 text-sm font-semibold text-white">
                  Build Your <br /> Marketing Strategi
                </div>
              </div>
            </div>
          </div>

          {/* Main Desc */}
          <div className="max-w-[300px] space-y-4 self-end text-left">
            <div className="text-2xl font-medium">Lorem Ipsum</div>
            <div className="font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna.
            </div>
          </div>
        </div>
      </section>

      {/* ========== About ========== */}
      <section className="container mx-auto mt-8">
        <div className="relative h-full w-full space-y-8">
          {/* Title */}
          <div className="flex w-full flex-col items-center text-4xl">
            <div className="relative w-fit font-semibold">
              Creative{" "}
              <span className="absolute -right-16 -top-[17px] h-[50px] w-[50px] rounded-br-full rounded-tl-full rounded-tr-full bg-primary"></span>
            </div>
            <div className="w-fit">Digital Agency</div>
          </div>

          {/* Content */}
          <div className="relative grid grid-cols-[1fr,_3fr,_1fr] gap-x-4">
            <div className="flex flex-col justify-end gap-3 opacity-0">
              <div className="text-3xl font-medium">Our Story</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud
              </div>
            </div>

            <div className="absolute bottom-0 left-6 flex max-w-[300px] flex-col justify-end gap-3">
              <div className="text-3xl font-medium">Our Story</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative h-fit w-fit">
                <svg
                  width="680"
                  height="350"
                  viewBox="0 0 1058 515"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 50C0 22.3858 22.3858 0 50 0H1008C1035.61 0 1058 22.3858 1058 50V332C1058 359.614 1035.61 382 1008 382H600C572.386 382 550 404.386 550 432V465C550 492.614 527.614 515 500 515H188C160.386 515 138 492.614 138 465V186C138 158.386 115.614 136 88 136H50C22.3858 136 0 113.614 0 86V50Z"
                    fill="#D9D9D9"
                  />
                </svg>
                <Link href="/">
                  <div className="absolute bottom-2 right-0 flex h-[70px] w-[310px] items-center justify-center gap-4 rounded-[30px] bg-gray-100 py-4">
                    <div>Know More</div>
                    <ArrowUpRight />
                  </div>
                </Link>
              </div>
            </div>

            <div className="ml-4 flex flex-col items-start gap-8">
              <div className="space-y-2">
                <div className="text-6xl font-semibold">
                  2 <span className="text-primary">+</span>
                </div>
                <div className="font-light">Years of experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-6xl font-semibold">
                  20 <span className="text-primary">+</span>
                </div>
                <div className="font-light">Projects Done</div>
              </div>
              <div className="space-y-2">
                <div className="text-6xl font-semibold">
                  30 <span className="text-primary">+</span>
                </div>
                <div className="font-light">Happy CLients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============== Bootcamp ============= */}
      <section className="container mx-auto mt-48">
        <div className="relative h-full w-full space-y-8">
          {/* Title */}
          <div className="flex w-full flex-col items-center text-4xl">
            <div className="relative w-fit font-semibold">
              Creative{" "}
              <span className="absolute -right-16 -top-[17px] h-[50px] w-[50px] rounded-br-full rounded-tl-full rounded-tr-full bg-primary"></span>
            </div>
            <div className="w-fit">Digital Agency</div>
          </div>

          {/* Content Tabs */}
          <div className="flex w-full justify-center gap-6 overflow-x-auto">
            {tabs.map((data) => (
              <div
                key={data.id}
                className={`cursor-pointer rounded-xl border-[thin] border-primary px-6 py-2 ${tab === data.id ? "bg-primary" : "bg-white"}`}
                onClick={() => setTab(data.id)}
              >
                <div
                  className={`text-lg font-bold ${tab === data.id ? "text-white" : "text-primary"}`}
                >
                  {data.title}
                </div>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="flex w-full flex-wrap items-stretch justify-center gap-8">
            <Link
              href={`/bootcamp/`}
              className="flex w-full max-w-[320px] flex-col gap-6 rounded-lg p-4 shadow-md"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg bg-gray-500">
                <Image
                  alt="Course Image"
                  src={"/images/courses/aimasterclass_thumbnail.png"}
                  fill
                  className="object-cover object-left-top"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-fit rounded-lg bg-primary px-2 py-1 text-sm font-semibold text-white">
                  Name
                </div>
                <div className="text-lg font-semibold">Title</div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="flex items-center gap-2 font-medium">
                    <BookCheck className="text-xl" /> 
                    1 Session
                    {/* {data.materi?.split(",").length} Sessions */}
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Users className="text-xl" />
                    {/* {data.purchases.length} */}
                    3+ Students
                  </div>
                </div>
                <div>
                  {/* <div className={`${data.isSale ? "line-through" : ""}`}>
                    {currencyFormatter.format(Number(data.price))}
                  </div>
                  {data.isSale ? (
                    <div className="text-lg font-semibold text-primary">
                      {currencyFormatter.format(Number(data.salePrice))}
                    </div>
                  ) : (
                    <div></div>
                  )} */}
                  <div className="text-lg font-semibold text-primary">
                    {currencyFormatter.format(Number(300000))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =============== Footer =============== */}
      <section className="container mx-auto mt-48">
        <div className="flex h-[350px] w-full items-center justify-between gap-6">
          {/* Grid 1 */}
          <div className="footer__box">
            <div className="space-y-2">
              <div className="text-sm font-light">More Offers</div>
              <div className="text-3xl font-semibold">
                There is <br /> something else <br /> for you
              </div>
            </div>
            <Button className="flex w-fit items-center gap-x-2">
              Find More <ChevronRight />
            </Button>
          </div>
          <div className="flex h-full w-full flex-[1] flex-col gap-y-6">
            {/* Grid 2 */}
            <div className="footer__box">
              <div className="flex items-start justify-between">
                <div className="text-sm font-light">
                  Behold <br /> Our Greatnessess
                </div>
                <Link href="/">
                  <ArrowUpRight />
                </Link>
              </div>
              <div className="text-3xl font-semibold">View our projects</div>
            </div>
            <div className="flex w-full flex-[1] gap-6">
              {/* Grid 3 */}
              <div className="footer__box">
                <div className="flex items-start justify-between">
                  <div className="text-sm font-light">
                    Discover <br /> Our History
                  </div>
                  <Link href="/">
                    <ArrowUpRight />
                  </Link>
                </div>
                <div className="text-3xl font-semibold">About Us</div>
              </div>
              {/* Grid 4 */}
              <div className="footer__box">
                <div className="flex items-start justify-between">
                  <div className="text-sm font-light">
                    Have Some <br />
                    Question?
                  </div>
                  <Link href="/">
                    <ArrowUpRight />
                  </Link>
                </div>
                <div className="text-sm font-light">
                  Have Some <br />
                  Question?
                </div>
                <div className="text-3xl font-semibold">Contact Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto my-8">
        <div className="w-full text-center text-sm font-light text-gray-500">
          Copyright &#169; 2025 Linkup Digital. All right reserved
        </div>
      </section>
    </div>
  );
};

export default HomePage;
