import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable";
// import {  } from "../../../data/focalPersons";
import { cities } from "../../data/users";

const columns = [
  { accessorKey: "complaint_number", header: "Complaint No#", meta: { width: "16%" } },
  { accessorKey: "venue", header: "Venue", meta: { width: "16%" } },
  { accessorKey: "complainant_name", header: "Complainant Name", meta: { width: "16%" } },
  { accessorKey: "complaint_category", header: "Complaint Category", meta: { width: "16%" } },
  { accessorKey: "complaint_type", header: "Complaint Type", meta: { width: "16%" } },
  { accessorKey: "complaint_details", header: "Complaint Details", meta: { width: "16%" } },
  { accessorKey: "status", header: "Status", meta: { width: "16%" } },
  { accessorKey: "created_at", header: "Created At", meta: { width: "16%" } },
  { accessorKey: "created_by", header: "Created By", meta: { width: "14%" } },
  // { accessorKey: "complaint_close", header: "Complaint Close", meta: { width: "14%" } },
  // { accessorKey: "total_complaint", header: "Total Complaint", meta: { width: "14%" } },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "20%" },
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

const ComplaintIndex = () => {
  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            E-Kacheri Complaints
          </h1>
          <p className="no-print mt-1 text-sm text-gray-500">
            View and manage all  E-Kacheri Complaints.
          </p>
        </div>

        {/* <Link
          to="/ekacheries/create"
          className="no-print rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add EKacheri
        </Link> */}
      </div>

      <DataTable
        columns={columns}
        data={cities}
        pageSize={10}
        searchPlaceholder="Search focal persons…"
      />
    </div>
  );
};

export default ComplaintIndex;