import DataTable from "../Dashboard/DataTable";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { getDepartments } from "../../api/DepartmentApi";
const columns = [
  { accessorKey: "title", header: "Title", meta: { width: "30%" } },
  { accessorKey: "email_addresses", header: "Email", meta: { width: "16%" } },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "14%" },
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          to={`/departments/${row.original.id}`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-[#fab421] ring-1 ring-[#fab421]/25 transition hover:bg-[#fab421]/10"
        >
          View
        </Link>
        <Link
          to={`/departments/${row.original.id}/edit`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
        >
          Edit
        </Link>
      </div>
    ),
  },
];

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      const data = await getDepartments();
      setDepartments(data.data || []);
    };
    fetchCities();
  }, []);

  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Cities</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all Departments.
          </p>
        </div>

        <Link
          to="/departments/create"
          className="rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add Department
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={departments}
        pageSize={10}
        searchPlaceholder="Search cities…"
        showExportButtons={false}
      />
    </div>
  );
};

export default DepartmentList;
