import { api } from "~/trpc/server";
import HomeSection from "./_components/home_section";
import { auth } from "~/server/auth";

const HomePage = async () => {
  const session = await auth();

  const course = await api.userRoute.course.getFeaturedCourse();
  const mentoring = await api.userRoute.mentoring.getFeaturedMentoring();

  return (
    <>
      <HomeSection course={course} mentoring={mentoring} session={session} />
    </>
  );
};

export default HomePage;
