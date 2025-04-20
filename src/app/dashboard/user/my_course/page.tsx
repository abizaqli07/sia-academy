import { api } from "~/trpc/server";
import MyCourseList from "./_components/my_course_list";
import { ScrollArea } from "~/components/ui/scroll-area";

export const dynamic = "force-dynamic";

const UserDashboardCoursePage = async () => {
  const mycourses = await api.userRoute.course.getAllMyCourse();

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
        <div className="text-3xl font-semibold md:text-4xl">Kursus Saya</div>
        <MyCourseList data={mycourses} />
      </div>
    </ScrollArea>
  );
};

export default UserDashboardCoursePage;
