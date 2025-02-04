"use client";

import { type RouterOutputs } from "~/trpc/react";
import MyMentoringCard from "./my_mentoring_card";

interface MyMentoringListPropsInterface {
  data: RouterOutputs["userRoute"]["mentoring"]["getAllMyMentoring"];
}

const MyMentoringList = ({ data }: MyMentoringListPropsInterface) => {
  return (
    <div className="w-full space-y-8">
      <div className="w-full">
        {data.length > 0 ? (
          <div className="flex w-full flex-col gap-y-6">
            {data.map((value) => (
              <MyMentoringCard key={value.id} data={value} />
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] items-center justify-center rounded-lg bg-gray-200 px-24 py-4 text-center">
            <div className="text-2xl font-semibold">Belum Ada Mentoring</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMentoringList;
