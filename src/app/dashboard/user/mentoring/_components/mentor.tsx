import Link from "next/link";
import Image from "next/image";
import { IoMdBook } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { Button } from "~/components/ui/button";
import { type RouterOutputs } from "~/trpc/react";

interface mentoringPropsInterface {
  mentorings: RouterOutputs["userRoute"]["mentoring"]["getAllMentoring"];
}

const MentorSection = ({ mentorings }: mentoringPropsInterface) => {
  return (
    <section className=" mt-[100px] w-full">
      <div className="container flex flex-col items-center gap-8">
        <div className="flex w-full max-w-[600px] flex-col gap-4 text-center">
          <div className="text-3xl font-bold lg:text-5xl">
            Pilih <span className="text-primary">Mentor</span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8">
          {/* Search Mentor Section */}
          {/* <SearchMentor /> */}

          {/* List Mentor Section */}
          <div className="flex w-full flex-wrap items-stretch justify-center gap-8">
            {mentorings.length > 0 ? (
              mentorings.map((data) => (
                <Link
                  key={data.id}
                  href={`/mentoring/${data.id}`}
                  className="flex w-full max-w-[330px] flex-col justify-between gap-6 rounded-lg p-4 shadow-md"
                >
                  <div className="w-full space-y-6">
                    <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg bg-gray-500">
                      <Image
                        alt="Course Image"
                        src={
                          data.mentor.image ??
                          "/images/courses/aimasterclass_thumbnail.png"
                        }
                        fill
                        className=" object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-xl font-semibold">
                        {data.mentor.name}
                      </div>
                      <div className="text-base font-semibold">
                        {data.mentor.title}
                      </div>
                      <div className="mt-3 flex items-center gap-3 text-gray-700">
                        <div className="flex items-center gap-2 font-medium">
                          <IoMdBook className="text-xl" /> {data.mentor.company}
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                          <GoPeople className="text-xl" />{" "}
                          {data.mentor.industry}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {data.mentor.expertise
                          .split(",")
                          .map((expert, index) => (
                            <div
                              key={index}
                              className="w-fit rounded-lg bg-primary-dark px-2 py-1 text-sm font-semibold text-white"
                            >
                              {expert}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <Button className="mt-3">Booking Sekarang</Button>
                </Link>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-lg bg-gray-200 px-24 py-4 text-center">
                <div className="text-2xl font-semibold">
                  Belum Ada Mentoring
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentorSection;
