"use client";

import { useState } from "react";
import MyCourseCard from "./my_course_card";
import { type RouterOutputs } from "~/trpc/react";

const tabs = [
  {
    id: "webinar",
    title: "Webinar",
  },
  {
    id: "bootcamp",
    title: "Bootcamp",
  },
];

interface MyCourseListPropsInterface {
  data: RouterOutputs["userRoute"]["course"]["getAllMyCourse"];
}

const MyCourseList = ({ data }: MyCourseListPropsInterface) => {
  const [tab, setTab] = useState<string>("webinar");

  const dataBootcamp = data.filter(
    (value) => value.course?.isWebinar === false,
  );
  const dataWebinar = data.filter((value) => value.course?.isWebinar === true);

  return (
    <div className="w-full space-y-8">
      <div className="flex w-full gap-6 overflow-x-auto">
        {tabs.map((data) => (
          <div
            key={data.id}
            className={`cursor-pointer rounded-md border-[thin] border-primary px-6 py-2 ${tab === data.id ? "bg-primary" : "bg-white"}`}
            onClick={() => setTab(data.id)}
          >
            <div
              className={`text-base font-medium ${tab === data.id ? "text-white" : "text-primary"}`}
            >
              {data.title}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        {tab === "webinar" &&
          (dataWebinar.length > 0 ? (
            <div className="flex w-full flex-col gap-y-6">
              {dataWebinar.map((value) => (
                <MyCourseCard key={value.id} data={value} />
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg bg-gray-200 px-24 py-4 text-center">
              <div className="text-2xl font-semibold">Belum Ada Webinar</div>
            </div>
          ))}
        {tab === "bootcamp" &&
          (dataBootcamp.length > 0 ? (
            <div className="flex w-full flex-col gap-y-6">
              {dataBootcamp.map((value) => (
                <MyCourseCard key={value.id} data={value} />
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center rounded-lg bg-gray-200 px-24 py-4 text-center">
              <div className="text-2xl font-semibold">Belum Ada Bootcamp</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyCourseList;
