"use client";

import { api } from "~/trpc/react";
import MentoringField from "./_components/mentoring_field";
import { Loader2 } from "lucide-react";

const MentorMentoringPage = () => {
  const mentorData = api.mentorRoute.mentoring.getData.useQuery();
  const categories = api.mentorRoute.mentoring.getCategory.useQuery();

  if (mentorData.isLoading || categories.isLoading) {
    return (
      <div className=" w-full h-full relative">
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-500/20">
          <div className="text-2xl font-semibold">Loading</div>
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (mentorData.isError || categories.isError) {
    return <div>Error</div>;
  }

  return (
    <MentoringField mentorData={mentorData.data} categories={categories.data} />
  );
};

export default MentorMentoringPage;
