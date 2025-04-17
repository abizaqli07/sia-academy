import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import CourseDetailSection from "./_components/course_detail_section";
import Image from "next/image";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

const CourseDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const detail = await api.userRoute.course.getOneCourse({
    courseId: id,
  });

  if (!detail) {
    redirect("/404");
  }

  return (
    <div>
      <div className="absolute left-0 top-0 -z-10 h-[25vh] w-full bg-primary-dark">
        <Image
          alt="Baackground"
          src={"/images/hero/bg_2.jpg"}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-primary/50"></div>
      </div>
      <CourseDetailSection data={detail} />
    </div>
  );
};

export default CourseDetailPage;
