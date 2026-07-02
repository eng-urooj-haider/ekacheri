import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable";
// import {  } from "../../../data/focalPersons";
import { cities } from "../../data/users";

const columns = [
  { accessorKey: "name", header: "Name", meta: { width: "18%" } },
  { accessorKey: "email", header: "Email", meta: { width: "20%" } },
  { accessorKey: "designation", header: "Designation", meta: { width: "16%" } },
  { accessorKey: "department", header: "Department", meta: { width: "16%" } },
  { accessorKey: "mobile", header: "Mobile", meta: { width: "14%" } },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "16%" },
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          to={`/dfps/${row.original.id}`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-[#fab421] ring-1 ring-[#fab421]/25 transition hover:bg-[#fab421]/10"
        >
          View
        </Link>
        <Link
          to={`/dfps/${row.original.id}/edit`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
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
          <h1 className="text-xl font-semibold text-gray-900">
            Department Focal Persons
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all department focal persons.
          </p>
        </div>

        <Link
          to="/dfps/create"
          className="rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add Focal Person
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={cities}
        pageSize={10}
        searchPlaceholder="Search focal persons…"
        showExportButtons = {false}
      />
    </div>
  );
};

export default FocalPersonList;