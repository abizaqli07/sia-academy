import { redirect } from "next/navigation";
import { api } from "~/trpc/server";
import CourseDetailSection from "./components/course_detail_section";

export const dynamicParams = true;
export const dynamic = 'force-dynamic'

const MyCourseDetailPage = async ({ params }: { params: { id: string } }) => {
  const detail = await api.userRoute.course.getOneCourse({
    courseId: params.id,
  });

  if(!detail){
    redirect("/404")
  }

  return (
    <div>
      <div className="absolute left-0 top-0 -z-10 h-[25vh] w-full bg-primary-dark"></div>
      <CourseDetailSection data={detail} />
    </div>
  );
};

export default MyCourseDetailPage;