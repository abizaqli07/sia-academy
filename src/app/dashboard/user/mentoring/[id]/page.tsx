import { api } from "~/trpc/server";
import DetailMentorSection from "./_components/detail_mentor_section";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export const dynamicParams = true;
export const dynamic = "force-dynamic";

const Aimasterclass = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const mentoring = await api.userRoute.mentoring.getOneMentoring({
    mentoringId: id,
  });

  const session = await auth();

  if (!mentoring) {
    redirect("/404");
  }

  return (
    <div>
      <div className="absolute left-0 top-0 -z-10 h-[25vh] w-full bg-primary-dark dark:bg-primary"></div>
      <DetailMentorSection data={mentoring} session={session} />
    </div>
  );
};

export default Aimasterclass;
