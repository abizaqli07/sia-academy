import BannerSliderSection from "~/components/section/banner_slider";
import { api } from "~/trpc/server";
import MentorSection from "./_components/mentor";
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
    image: "/images/banner/banner_4.jpg",
    imageMobile: "/images/banner/banner_4.jpg",
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

const MentoringPage = async () => {
  const mentoring = await api.userRoute.mentoring.getAllMentoring();

  return (
    <ScrollArea className="h-full w-full">
      <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
        {/* Header Section */}
        <BannerSliderSection bannerData={bannerData} />

        {/* Search Section */}
        {/* <SearchMentor /> */}

        {/* Mentor Section */}
        <MentorSection mentorings={mentoring} />
      </div>
    </ScrollArea>
  );
};

export default MentoringPage;
