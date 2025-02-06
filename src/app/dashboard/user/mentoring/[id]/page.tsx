import { api } from "~/trpc/server";
import DetailMentorSection from "./_components/detail_mentor_section";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export const dynamicParams = true;
export const dynamic = 'force-dynamic'

const Aimasterclass = async ({ params }: { params: { id: string } }) => {
  const mentoring = await api.userRoute.mentoring.getOneMentoring({
    mentoringId: params.id,
  });

  const session = await auth();

  if(!mentoring){
    redirect("/404")
  }

  return (
    <div>
      <div className="absolute left-0 top-0 -z-10 h-[25vh] w-full bg-primary-dark"></div>
      <DetailMentorSection data={mentoring} session={session} />
    </div>
  );
};

export default Aimasterclass;
