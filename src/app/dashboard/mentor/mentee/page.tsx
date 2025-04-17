import { api } from "~/trpc/server";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export const dynamic = 'force-dynamic'

const MenteePage = async () => {
  const mentees = await api.mentorRoute.mentee.getAllMentee()
  
    return (
      <div className="p-6">
        <DataTable columns={columns} data={mentees} />
      </div>
    );
}

export default MenteePage