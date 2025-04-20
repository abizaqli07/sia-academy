import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

const UserDashboardSkeleton = () => {
  return (
    <div className="flex h-fit w-full max-w-[350px] md:max-w-[500px] md:h-[250px] flex-col gap-4 rounded-lg border-[1.5px] bg-white dark:bg-primary-dark p-4 md:flex-row">
      <div className="aspect-square flex-[2]">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-[3] flex-col gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-12 w-full" />
        <Separator />
        <Skeleton className="h-8" />
      </div>
    </div>
  );
};

export default UserDashboardSkeleton;
