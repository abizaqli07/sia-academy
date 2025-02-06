"use client";

import Image from "next/image";
import Link from "next/link";
import { GoPeople } from "react-icons/go";
import { IoMdBook } from "react-icons/io";
import { currencyFormatter } from "~/lib/utils";
import { type RouterOutputs } from "~/trpc/react";

interface CourseSectionPropsInterface {
  courses: RouterOutputs["userRoute"]["course"]["getAllCourse"];
}

const CourseSection = ({ courses }: CourseSectionPropsInterface) => {
  return (
    <section className=" mt-[100px] w-full">
      <div className="container flex flex-col items-center gap-8">
        <div className="flex w-full max-w-[600px] flex-col gap-4 text-center">
          <div className="text-3xl font-bold lg:text-5xl">
            Pilih <span className="text-primary">Course</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          {/* Search Mentor Section */}
          {/* <SearchMentor /> */}

          {/* List Mentor Section */}
          <div className="flex w-full flex-wrap items-start justify-center gap-8">
            {courses.length > 0 ? (
              courses.map((data) => (
                <Link
                  key={data.id}
                  href={`/dashboard/user/course/${data.id}`}
                  className="flex w-full max-w-[320px] flex-col gap-6 rounded-lg p-4 shadow-md"
                >
                  <div>
                    <div className="w-full rounded-t-lg bg-primary p-3 text-center font-bold text-white">
                      {data.isWebinar ? "Webinar" : "Bootcamp"}
                    </div>
                    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-b-lg bg-gray-500">
                      <Image
                        alt="Course Image"
                        src={
                          data.image ??
                          "/images/courses/aimasterclass_thumbnail.png"
                        }
                        fill
                        className=" object-cover object-left-top"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="w-fit rounded-lg bg-primary px-2 py-1 text-sm font-semibold text-white">
                      {data.category.name}
                    </div>
                    <div className="text-lg font-semibold">{data.title}</div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <div className="flex items-center gap-2 font-medium">
                        <IoMdBook className="text-xl" />{" "}
                        {data.materi?.split(",").length} Sessions
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <GoPeople className="text-xl" /> {data.purchases.length}
                        + Students
                      </div>
                    </div>
                    {data.isFree ? (
                      <div className="text-xl font-semibold text-primary">
                        Free
                      </div>
                    ) : (
                      <div>
                        <div className={`${data.isSale ? "line-through" : ""}`}>
                          {currencyFormatter.format(Number(data.price))}
                        </div>
                        {data.isSale ? (
                          <div className="text-lg font-semibold text-primary">
                            {currencyFormatter.format(Number(data.salePrice))}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-lg bg-gray-200 px-24 py-4 text-center">
                <div className="text-2xl font-semibold">Belum Ada Bootcamp</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
