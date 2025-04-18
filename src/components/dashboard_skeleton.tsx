import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

const UserDashboardSkeleton = () => {
  return (
    <div className="flex h-[300px] w-full flex-col gap-4 rounded-lg border-[1.5px] bg-white p-4 md:flex-row">
      <div className="aspect-square flex-[2] md:aspect-[3/2]">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-[3] flex-col gap-3">
        <Skeleton className="h-12 w-full max-w-[250px]" />
        <Skeleton className="h-16 w-full max-w-[230px]" />
        <Skeleton className="h-14 w-full max-w-[200px]" />
        <Separator />
        <Skeleton className="h-8 w-12" />
      </div>
    </div>
  );
};

export default UserDashboardSkeleton;
