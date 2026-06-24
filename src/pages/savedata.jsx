import { Link } from "react-router";
import DataTable from "../DataTable";
import { users } from "../../../data/users";

const columns = [
  { accessorKey: "name", header: "Name", meta: { width: "22%" } },
  { accessorKey: "email", header: "Email", meta: { width: "28%" } },
  {
    accessorKey: "status",
    header: "Status",
    meta: { width: "16%" },
    cell: (info) => (
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
          info.getValue() === "active"
            ? "bg-emerald-400/10 text-emerald-400"
            : "bg-gray-500/10 text-gray-400"
        }`}
      >
        {info.getValue()}
      </span>
    ),
  },
  { accessorKey: "joined", header: "Joined", meta: { width: "18%" } },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "16%" },
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          to={`/users/${row.original.id}`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-[#fab421] ring-1 ring-[#fab421]/25 transition hover:bg-[#fab421]/10"
        >
          View
        </Link>
        <Link
          to={`/users/${row.original.id}/edit`}
          className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
        >
          Edit
        </Link>
      </div>
    ),
  },
];

const Home = () => {
  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all registered users.
          </p>
        </div>

        <Link
          to="/cities/new"
          className="rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
        >
          + Add City
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={users}
        pageSize={10}
        searchPlaceholder="Search users…"
      />
    </div>
  );
};

export default Home;