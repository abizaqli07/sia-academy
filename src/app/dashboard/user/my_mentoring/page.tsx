import { api } from "~/trpc/server";
import MyMentoringList from "./_components/my_mentoring_list";

export const dynamic = 'force-dynamic'

const MyMentoringPage = async () => {
  const mymentoring = await api.userRoute.mentoring.getAllMyMentoring();
  return (
    <div className="w-full space-y-12 px-12">
      <div className="text-3xl font-semibold md:text-4xl">Mentoring Saya</div>
      <MyMentoringList data={mymentoring} />
    </div>
  );
};

export default MyMentoringPage;
