"use client";

import { type RouterOutputs } from "~/trpc/react";
import MyMentoringCard from "./my_mentoring_card";
import Link from "next/link";
import { Button } from "~/components/ui/button";

interface MyMentoringListPropsInterface {
  data: RouterOutputs["userRoute"]["mentoring"]["getAllMyMentoring"];
}

const MyMentoringList = ({ data }: MyMentoringListPropsInterface) => {
  return (
    <div className="w-full space-y-8">
      <div className="w-full">
        {data.length > 0 ? (
          <div className="flex w-full flex-wrap gap-y-6">
            {data.map((value) => (
              <MyMentoringCard key={value.id} data={value} />
            ))}
          </div>
        ) : (
          <div className="flex h-[200px] flex-col items-center justify-center gap-y-3 rounded-lg bg-gray-200 px-24 py-4 text-center">
            <div className="text-2xl font-semibold">Belum Ada Mentoring</div>
            <Link href={"/dashboard/user/mentoring"}>
              <Button>Temukan Mentoring</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMentoringList;
