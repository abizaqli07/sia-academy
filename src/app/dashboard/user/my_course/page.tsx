import { api } from "~/trpc/server";
import MyCourseList from "./_components/my_course_list";
import { ScrollArea } from "~/components/ui/scroll-area";

export const dynamic = "force-dynamic";

const UserDashboardCoursePage = async () => {
  const mycourses = await api.userRoute.course.getAllMyCourse();

  return (
    <ScrollArea className="w-full h-full">
      <div className="w-full space-y-12 px-12">
        <div className="text-3xl font-semibold md:text-4xl">Kursus Saya</div>
        <MyCourseList data={mycourses} />
      </div>
    </ScrollArea>
  );
};

export default UserDashboardCoursePage;
