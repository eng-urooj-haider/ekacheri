import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable";
// import {  } from "../../../data/focalPersons";
import { useEffect } from "react";
import { allComplaints } from "../../api/ComplaintApi.js";
import { useState } from "react";
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
  { accessorKey: "closure_date_formatted", header: "Closure Date", meta: { width: "16%" } },
  {
    accessorKey: "createdby",
    header: "Created By",
    cell: ({ row }) => row.original.user?.name || "-",
    meta: { width: "14%" },
  },
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
  const [complaints, setComplaints] = useState([]);
  const {id} = useParams()
  useEffect(() => {
    const fetchComplain = async () => {
      const response = await allComplaints(id);
      console.log(response.data)
      setComplaints(response.data);
    };
    fetchComplain();
  }, []);
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

        {/* <Link
          to="/ekacheries/create"
          className="no-print rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add EKacheri
        </Link> */}
      </div>

      <DataTable
        columns={columns}
        data={complaints}
        pageSize={10}
        searchPlaceholder="Search focal persons…"
        showExportButtons={false}
      />
    </div>
  );
};

export default ComplaintIndex;
