import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable";
import { allComplaints } from "../../api/ComplaintApi.js";
import { useParams } from "react-router";

const columns = [
  {
    accessorKey: "ekachehri_id",
    header: "eKachehri No#",
    meta: { width: "16%" },
    cell: ({ getValue }) => String(getValue()).padStart(5, "0"),
  },
  {
    accessorKey: "name",
    header: "Complainant Name",
    meta: { width: "16%" },
  },
  {
    accessorKey: "complaint_category",
    header: "Complaint Category",
    meta: { width: "16%" },
  },
  {
    accessorKey: "complaint_type",
    header: "Complaint Type",
    meta: { width: "16%" },
  },
  { accessorKey: "status", header: "Status", meta: { width: "16%" } },
  {
    accessorKey: "closure_date_formatted",
    header: "Closure Date",
    meta: { width: "16%" },
  },
  {
    accessorKey: "createdby",
    header: "Created By",
    cell: ({ row }) => row.original.user?.name || "-",
    meta: { width: "14%" },
  },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "20%" },
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
  const { id } = useParams();

  // NEW: wrap allComplaints so DataTable can call it as fetchData(params),
  // while `id` from the URL is bound in via closure
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
        fetchData={allComplaints} // CHANGED: was `complaints` (a resolved/broken Promise)
        queryKey={`all-complaints-${id}`} // CHANGED: unique per id, avoids cache collisions across different ekachehri IDs
        pageSize={10}
        searchPlaceholder="Search complaints…"
        showExportButtons={false}
        id={id}
      />
    </div>
  );
};

export default ComplaintIndex;
