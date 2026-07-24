import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable.jsx";
// import {  } from "../../../data/focalPersons";
import { useEffect , useState} from "react";
import { getEkachehries } from "../../api/EkacheriApi.js";

const columns = [
  {
    accessorKey: "id",
    header: "Kacheri Number",
    meta: { width: "5%" },
  },
  { accessorKey: "venue", header: "Venue", meta: { width: "10%" } },
  {
    accessorKey: "kachehri_date_formatted",
    header: "Kachehri Date",
    meta: { width: "10%" },
  },
  {
    accessorKey: "kachehri_time_formatted",
    header: "Kachehri Time",
    meta: { width: "10%" },
  },
  { accessorKey: "location", header: "Location", meta: { width: "16%" } },
  {
    accessorKey: "session",
    header: "Live Session",
    meta: { width: "5%" },
    cell: ({ row }) => (
    row.original.session == 1 ? "Yes" : "No"
  ),
  },
  {
    accessorKey: "session_convened",
    header: "Session Convened",
    meta: { width: "5%" },
  },
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
          to={`/kachehries/${row.original.id}`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-[#fab421] ring-1 ring-[#fab421]/25 transition hover:bg-[#fab421]/10"
        >
          View
        </Link>
        <Link
          to={`/kachehries/${row.original.id}/edit`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
        >
          Edit
        </Link>
        <Link
          to={`/complaints/create/${row.original.uuid}`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
        >
          Add Complaint
        </Link>
          <Link
          to={`/complaints/all/${row.original.id}`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
        >
          All Complaint
        </Link>
      </div>
    ),
  },
];

const EkacheriIndex = () => {
  const [kachehries , setKachehries] = useState([])
  useEffect(() => {
    const fetchKacheries = async () => {
      const response = await getEkachehries();
      setKachehries(response.data.data)
    };
    fetchKacheries();
  }, []);
  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">EKacheri</h1>
          <p className="no-print mt-1 text-sm text-gray-500">
            View and manage all ekacheri.
          </p>
        </div>

        <Link
          to="/kachehries/create"
          className="no-print rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add EKacheri
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={kachehries}
        pageSize={10}
        searchPlaceholder="Search focal persons…"
        showExportButtons={true}
      />
    </div>
  );
};

export default EkacheriIndex;
