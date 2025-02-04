import BannerSliderSection from "~/components/section/banner_slider";
import { api } from "~/trpc/server";
import CourseSection from "./_components/course";
import SearchCourse from "./_components/search_course";

export const revalidate = 0;

const bannerData = [
  {
    id: "1",
    image: "/images/banner/bootcamp_banner_1.png",
    imageMobile: "/images/banner/bootcamp_banner_1_mobile.png",
    redirectUrl: null,
  },
  {
    id: "2",
    image: "/images/banner/bootcamp_banner_1.png",
    imageMobile: "/images/banner/bootcamp_banner_1_mobile.png",
    redirectUrl: null,
  },
];
const CoursePage = async () => {
  const courses = await api.userRoute.course.getAllCourse();

  return (
    <>
      {/* Header Section */}
      <BannerSliderSection bannerData={bannerData} />

      {/* Search Section */}
      <SearchCourse />

      {/* Mentor Section */}
      <CourseSection courses={courses} />
    </>
  );
};

export default CoursePage;
