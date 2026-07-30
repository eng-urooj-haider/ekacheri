import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable";
import { getDFPs } from "../../api/DFPApi";
const columns = [
  { accessorKey: "name", header: "Name", meta: { width: "18%" } },
  { accessorKey: "email", header: "Email", meta: { width: "20%" } },
  {
    accessorKey: "executive_number",
    header: "Executive Number",
    meta: { width: "16%" },
  },
  { accessorKey: "mobile", header: "Mobile", meta: { width: "14%" } },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "16%" },
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          to={`/users/${row.original.id}`}
          className="rounded-lg border border-[#fab421]/40 bg-[#fff8eb] px-2.5 py-1 text-xs font-medium text-[#fab421] transition hover:bg-[#fab421] hover:text-white"
        >
          View
        </Link>
        <Link
          to={`/users/${row.original.id}/edit`}
          className="rounded-lg border border-[#2F4F7F]/20 px-2.5 py-1 text-xs font-medium text-[#2F4F7F] transition hover:border-[#2F4F7F] hover:bg-[#2F4F7F] hover:text-white"
        >
          Edit
        </Link>
      </div>
    ),
  },
];

const FocalPersonList = () => {
  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Admin Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all admin users.
          </p>
        </div>

        <Link
          to="/users/create"
          className="rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add User
        </Link>
      </div>

      <DataTable
        columns={columns}
        fetchData={getDFPs}
        queryKey="locations"
        pageSize={10}
        searchPlaceholder="Search admin..."
        showExportButtons={false}
      />
    </div>
  );
};

export default FocalPersonList;
