import BannerSliderSection from "~/components/section/banner_slider";
import { api } from "~/trpc/server";
import CourseSection from "./_components/course";
import { ScrollArea } from "~/components/ui/scroll-area";

export const dynamic = "force-dynamic";

const bannerData = [
  {
    id: "1",
    image: "/images/banner/banner_1.jpg",
    imageMobile: "/images/banner/banner_1.jpg",
    redirectUrl: null,
  },
  {
    id: "2",
    image: "/images/banner/banner_2.jpg",
    imageMobile: "/images/banner/banner_2.jpg",
    redirectUrl: null,
  },
  {
    id: "2",
    image: "/images/banner/banner_5.jpg",
    imageMobile: "/images/banner/banner_5.jpg",
    redirectUrl: null,
  },
  {
    id: "2",
    image: "/images/banner/banner_6.jpg",
    imageMobile: "/images/banner/banner_6.jpg",
    redirectUrl: null,
  },
];
const CoursePage = async () => {
  const courses = await api.userRoute.course.getAllCourse();

  return (
    <ScrollArea className="w-full h-full">
      {/* Header Section */}
      <BannerSliderSection bannerData={bannerData} />

      {/* Search Section */}
      {/* <SearchCourse /> */}

      {/* Mentor Section */}
      <CourseSection courses={courses} />
    </ScrollArea>
  );
};

export default CoursePage;
