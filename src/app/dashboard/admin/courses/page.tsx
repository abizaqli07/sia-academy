"use client";

import { api } from "~/trpc/react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { Loader2 } from "lucide-react";

const CoursesPage = () => {
  const { data, isLoading, isError } =
    api.adminRoute.course.getAllCourse.useQuery();

  if (isLoading) {
    return (
      <div className="relative h-full w-full">
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-500/20">
          <div className="text-2xl font-semibold">Loading</div>
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (isError || data === undefined) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        Something Wrong Occured
      </div>
    );
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CoursesPage;
