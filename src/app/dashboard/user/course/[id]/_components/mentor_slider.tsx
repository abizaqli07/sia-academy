"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "swiper/css";
import "swiper/css/pagination";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Button } from "~/components/ui/button";
import { type RouterOutputs } from "~/trpc/react";

interface MentorSliderPropsInterface {
  data: RouterOutputs["userRoute"]["course"]["getOneCourse"];
}

const MentorSliderSection = ({ data }: MentorSliderPropsInterface) => {
  return (
    <div className="mt-[40px] flex w-full max-w-[800px] flex-col gap-8">
      <div className="text-xl font-bold">
        <span className="text-sm text-primary">Subject Expert</span>
        <br />
        Get to Know Our Mentor!
      </div>
      <MentoringSlider data={data} />
    </div>
  );
};

const MentoringSlider = ({ data: mentors }: MentorSliderPropsInterface) => {
  return (
    <div className="w-full px-4">
      <Swiper
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation, A11y]}
        slidesPerView={1}
        spaceBetween={60}
        loop={true}
        centeredSlides={true}
        coverflowEffect={{
          slideShadows: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="previous__client"
      >
        {mentors?.mentors !== undefined && mentors?.mentors.length > 0 ? (
          mentors?.mentors.map((data) => (
            <SwiperSlide key={data.mentor.id}>
              <div className="flex w-full flex-col gap-4 rounded-lg border-[1.5px] bg-white dark:bg-primary-dark p-4 sm:flex-row">
                <div className="aspect-square max-w-[280px] flex-1 rounded-lg bg-primary">
                  <div className="relative h-full w-full">
                    <Image
                      alt="Expert Image"
                      src={data.mentor?.image ?? "/images/profile_picture.jpeg"}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <div className="text-lg font-semibold">
                    {data.mentor?.name}
                  </div>
                  <div className="text-sm font-bold text-gray-500">
                    {data.mentor?.title}
                  </div>
                  <div className="text-justify text-gray-700 dark:text-gray-300">
                    {data.mentor?.desc}
                  </div>
                  <div className="flex gap-3">
                    {data.mentor?.github && (
                      <Link href={data.mentor?.github}>
                        <Button variant={"outline"}>
                          <FaGithub className="mr-2 text-2xl" />
                          Github
                        </Button>
                      </Link>
                    )}
                    {data.mentor?.linkedin && (
                      <Link href={data.mentor?.linkedin}>
                        <Button variant={"outline"}>
                          <FaLinkedin className="mr-2 text-2xl" />
                          LinkedIn
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <Link
              href={"/career_guidance/one_on_one"}
              className="mx-auto flex aspect-[3/1] w-full flex-col items-center justify-center gap-4 rounded-lg border-[1.5px] bg-white dark:bg-primary-dark p-4 md:flex-row"
            >
              <div className="text-2xl font-semibold">No Mentor Found</div>
            </Link>
          </SwiperSlide>
        )}

        <NavButton />
      </Swiper>
    </div>
  );
};

const NavButton = () => {
  const swiper = useSwiper();

  return (
    <div className="mb-4 mt-12 flex justify-center gap-28">
      <div className="prev rotate-180" onClick={() => swiper.slidePrev()}>
        <ChevronRight />
      </div>
      <div className="next" onClick={() => swiper.slideNext()}>
        <ChevronRight />
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default MentorSliderSection;
