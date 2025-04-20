import { api } from "~/trpc/server";
import MyMentoringList from "./_components/my_mentoring_list";
import { ScrollArea } from "~/components/ui/scroll-area";

export const dynamic = "force-dynamic";

const MyMentoringPage = async () => {
  const mymentoring = await api.userRoute.mentoring.getAllMyMentoring();
  return (
    <ScrollArea className="h-full w-full">
      <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
        <div className="text-3xl font-semibold md:text-4xl">Mentoring Saya</div>
        <MyMentoringList data={mymentoring} />
      </div>
    </ScrollArea>
  );
};

export default MyMentoringPage;
