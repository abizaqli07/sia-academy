"use client"

import { type ReactNode } from "react";
import { Sidebar } from "./_components/course_sidebar";
import { MobileSidebar } from "./_components/mobile-sidebar";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

const MyCourseDetailLayout = ({ children }: { children: ReactNode }) => {
  const params = useParams<{ id: string; chapterId: string;}>();
  const {data, isLoading} = api.userRoute.course.getOneMyCourse.useQuery({
    courseId: params.id
  })

  if(isLoading){
    return;
  }

  return (
    <div className="h-full">
      <div className=" container flex h-full flex-col lg:flex-row-reverse mt-12 gap-x-16 gap-y-8">
        <div className="relative min-w-[250px] max-w-[300px] hidden lg:flex">
          <Sidebar data={data} />
        </div>
        <div className="relative mb-12 flex lg:hidden">
          <MobileSidebar data={data} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MyCourseDetailLayout;
