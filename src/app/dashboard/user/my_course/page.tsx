import { api } from "~/trpc/server";
import MyCourseList from "./_components/my_course_list";

export const dynamic = 'force-dynamic'

const UserDashboardCoursePage = async () => {
  const mycourses = await api.userRoute.course.getAllMyCourse();

  return (
    <div className="w-full px-12 space-y-12">
      <div className="text-3xl font-semibold md:text-4xl">Kursus Saya</div>
      <MyCourseList data={mycourses} />
    </div>
  );
};

export default UserDashboardCoursePage;