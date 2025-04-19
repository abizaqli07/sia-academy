import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/server";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const AdminMentorPage = async () => {
  const mentors = await api.adminRoute.mentor.getAll();

  return (
    <ScrollArea className="h-full w-full">
      <div className="p-6">
        <DataTable columns={columns} data={mentors} />
      </div>
    </ScrollArea>
  );
};

export default AdminMentorPage;
