import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable";
import { getComplaints } from "../../api/ComplaintApi.js";

const columns = [
  {
    accessorKey: "ekachehri_id",
    header: "eKachehri No#",
    meta: { width: "20%" },
    cell: ({ getValue }) => String(getValue()).padStart(5, "0"),
  },
  {
    accessorKey: "name",
    header: "Complainant Name",
    meta: { width: "20%" },
  },
  {
    accessorKey: "complaint_category",
    header: "Complaint Category",
    meta: { width: "20%" },
  },
  {
    accessorKey: "complaint_type",
    header: "Complaint Type",
    meta: { width: "20%" },
  },
  {
    accessorKey: "complaint_details",
    header: "Complaint Detail",
    meta: { width: "20%" },
  },
  { accessorKey: "status", header: "Status", meta: { width: "20%" } },
  { accessorKey: "priority", header: "Priority", meta: { width: "20%" } },
  { accessorKey: "closure_date_formatted", header: "Closure Date", meta: { width: "20%" } },
  {
    accessorKey: "createdby",
    header: "Created By",
    cell: ({ row }) => row.original.user?.name || "-",
    meta: { width: "20%" },
  },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "40%" },
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          to={`/complaints/${row.original.id}`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-[#fab421] ring-1 ring-[#fab421]/25 transition hover:bg-[#fab421]/10"
        >
          View
        </Link>
        <Link
          to={`/complaints/${row.original.id}/edit`}
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
            View and manage all E-Kacheri Complaints.
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        fetchData={getComplaints}
        queryKey="complaints"
        pageSize={10}
        searchPlaceholder="Search complaints…"
        showExportButtons={false}
      />
    </div>
  );
};

export default ComplaintIndex;