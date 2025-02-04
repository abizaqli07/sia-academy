import { api } from "~/trpc/server";
import MyMentoringList from "./_components/my_mentoring_list";

const MyMentoringPage = async () => {
  const mymentoring = await api.userRoute.mentoring.getAllMyMentoring();
  return (
    <div className="w-full space-y-12 px-12">
      <div className="text-3xl font-semibold md:text-4xl">My Mentoring</div>
      <MyMentoringList data={mymentoring} />
    </div>
  );
};

export default MyMentoringPage;
