import { Link } from "react-router";
import DataTable from "../Dashboard/DataTable";
import { getLocations } from "../../api/LocationApi";
const columns = [
  { accessorKey: "city.title", header: "City", meta: { width: "30%" } },
  { accessorKey: "location", header: "Location", meta: { width: "30%" } },
  {
    accessorKey: "created_at_formatted",
    header: "Created At",
    meta: { width: "16%" },
  },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "14%" },
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          to={`/locations/${row.original.id}`}
          className="rounded-lg border border-[#fab421]/40 bg-[#fff8eb] px-2.5 py-1 text-xs font-medium text-[#fab421] transition hover:bg-[#fab421] hover:text-white"
        >
          View
        </Link>
        <Link
          to={`/locations/${row.original.id}/edit`}
          className="rounded-lg border border-[#2F4F7F]/20 px-2.5 py-1 text-xs font-medium text-[#2F4F7F] transition hover:border-[#2F4F7F] hover:bg-[#2F4F7F] hover:text-white"
        >
          Edit
        </Link>
      </div>
    ),
  },
];

const LocationList = () => {
  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">locations</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all locations.
          </p>
        </div>

        <Link
          to="/locations/create"
          className="rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add Location
        </Link>
      </div>
      <DataTable
        columns={columns}
        fetchData={getLocations}
        queryKey="locations"
        pageSize={10}
        searchPlaceholder="Search locations..."
        showExportButtons={false}
      />
    </div>
  );
};

export default LocationList;
