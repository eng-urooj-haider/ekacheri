import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable";
// import {  } from "../../../data/focalPersons";
import { cities } from "../../data/users";

const columns = [
  { accessorKey: "kacheri_number", header: "Kacheri Number", meta: { width: "16%" } },
  { accessorKey: "venue", header: "Venue", meta: { width: "16%" } },
  { accessorKey: "kacheri_date", header: "Kacheri Date", meta: { width: "16%" } },
  { accessorKey: "kacheri_time", header: "Kacheri Time", meta: { width: "16%" } },
  { accessorKey: "location", header: "Location", meta: { width: "16%" } },
  { accessorKey: "live_session", header: "Live Session", meta: { width: "16%" } },
  { accessorKey: "session_convened", header: "Session Convened", meta: { width: "16%" } },
  // { accessorKey: "complaint_received", header: "Complaint Received", meta: { width: "16%" } },
  // { accessorKey: "complaint_open", header: "Complaint Open", meta: { width: "14%" } },
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
        <Link
          to={`/complaints/create`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
        >
          Add Complaint
        </Link>
      </div>
    ),
  },
];

const EkacheriIndex = () => {
  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            EKacheri
          </h1>
          <p className="no-print mt-1 text-sm text-gray-500">
            View and manage all ekacheri.
          </p>
        </div>

        <Link
          to="/ekacheries/create"
          className="no-print rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add EKacheri
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={cities}
        pageSize={10}
        searchPlaceholder="Search focal persons…"
        showExportButtons = {true}
      />
    </div>
  );
};

export default EkacheriIndex;