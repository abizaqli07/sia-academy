import { api } from "~/trpc/server";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const AdminMentorPage = async () => {
  const mentors = await api.adminRoute.mentor.getAll();

  return (
    <div className="p-6">
      <DataTable columns={columns} data={mentors} />
    </div>
  );
};

export default AdminMentorPage;
