"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import UpdateCourseForm from "./_components/update_course_form";

const CreatePage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading } = api.adminRoute.course.getOne.useQuery({
    courseId: params.id,
  });

  const { data: categories, isLoading: categoryLoading } =
    api.adminRoute.course.getCategory.useQuery();

  if (isLoading || categoryLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !categories) {
    return <div>Error</div>;
  }

  return (
    <>
      <UpdateCourseForm initialData={data} categories={categories} />
    </>
  );
};

export default CreatePage;
