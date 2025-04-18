"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import UpdateCourseForm from "./_components/update_course_form";
import { Loader2 } from "lucide-react";

const CreatePage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading } = api.adminRoute.course.getOne.useQuery({
    courseId: params.id,
  });

  const { data: categories, isLoading: categoryLoading } =
    api.adminRoute.course.getCategory.useQuery();

  if (isLoading || categoryLoading) {
    return (
      <div className="relative h-full w-full">
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-500/20">
          <div className="text-2xl font-semibold">Loading</div>
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!data || !categories) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Something Wrong Occured
      </div>
    );
  }

  return (
    <>
      <UpdateCourseForm initialData={data} categories={categories} />
    </>
  );
};

export default CreatePage;
