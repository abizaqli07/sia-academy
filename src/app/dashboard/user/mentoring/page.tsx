import BannerSliderSection from "~/components/section/banner_slider";
import { api } from "~/trpc/server";
import MentorSection from "./_components/mentor";

export const dynamic = 'force-dynamic'

const bannerData = [
  {
    id: "1",
    image: "/images/banner/mentoring_banner_1.png",
    imageMobile: "/images/banner/mentoring_banner_1_mobile.png",
    redirectUrl: "/career_guidance/74cd00b8-9de3-4645-8d3c-823199b1e7d2",
  },
  {
    id: "2",
    image: "/images/banner/mentoring_banner_2.png",
    imageMobile: "/images/banner/mentoring_banner_2_mobile.png",
    redirectUrl: null,
  },
];

const MentoringPage = async () => {
  const mentoring = await api.userRoute.mentoring.getAllMentoring();

  return (
    <>
      {/* Header Section */}
      <BannerSliderSection bannerData={bannerData} />

      {/* Search Section */}
      {/* <SearchMentor /> */}

      {/* Mentor Section */}
      <MentorSection mentorings={mentoring} />
    </>
  );
};

export default MentoringPage;
