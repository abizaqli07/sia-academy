import { api } from "~/trpc/server";
import MenteeScheduleComponent from "./_components/detail_mentee";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { FileUser } from "lucide-react";

const MenteeDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const detailMentee = await api.mentorRoute.mentee.getOneMentee({
    mentoringDataId: id,
  });

  return (
    <div className=" w-[90%] mx-auto max-w-[700px] flex flex-col gap-y-8">
      <div className="flex w-full flex-col gap-4 rounded-lg border-[1.5px] bg-white p-4 sm:flex-row">
        <div className="aspect-square max-w-[280px] flex-1 rounded-lg bg-primary">
          <div className="relative h-full w-full">
            <Image
              alt="Mentee Image"
              src={detailMentee?.user.image ?? "/images/profile_picture.jpeg"}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="text-lg font-semibold">{detailMentee?.user.name}</div>
          <div className="text-sm font-bold text-gray-500">
            {detailMentee?.user.email}
          </div>
          <div className="text-justify text-gray-700">{`Mentee have objective to ${detailMentee?.objective} with position of ${detailMentee?.positionPreference} on industry ${detailMentee?.preference}`}</div>
          <div className="flex gap-3">
            <Link href={detailMentee?.cv ?? ""}>
              <Button variant={"outline"}>
                <FileUser className="mr-2 text-2xl" />
                Download CV
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <MenteeScheduleComponent data={detailMentee} />
    </div>
  );
};

export default MenteeDetailPage;
