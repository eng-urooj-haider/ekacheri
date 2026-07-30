import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; // ADJUST: match your actual toast library
import DataTable from "../Dashboard/DataTable.jsx";
import { getEkachehries, kachehriComplainReopen } from "../../api/EkacheriApi.js";
import { useUser } from "../../context/UserContext.jsx";
import ActionDropdown from "../../components/common/ActionDropdown.jsx";
import DropdownItem from "../../components/common/DropdownItem.jsx";
import { Eye, Pencil, PlusCircle, RotateCcw, List } from "lucide-react";

const isComplaintAllowed = (kachehriDate, kachehriTime) => {
  const dateTimeString = `${kachehriDate} ${kachehriTime}`;
  const kachehriDateTime = new Date(dateTimeString);

  if (isNaN(kachehriDateTime.getTime())) return false; // NEW: guard invalid dates instead of silently continuing

  const expiryDateTime = new Date(kachehriDateTime.getTime());
  expiryDateTime.setHours(expiryDateTime.getHours() + 48);

  return new Date() <= expiryDateTime;
};

const isReopenComplaintAllowed = (complaintWindowResetAt) => {
  if (!complaintWindowResetAt) return false;

  const reopenDateTime = new Date(complaintWindowResetAt);
  if (isNaN(reopenDateTime.getTime())) return false;

  const expiryDateTime = new Date(reopenDateTime);
  expiryDateTime.setHours(expiryDateTime.getHours() + 48);

  return new Date() <= expiryDateTime;
};

// CHANGED: now accepts handleReopenComplaint as a second parameter
const getColumns = (user, handleReopenComplaint) => [
  {
    accessorKey: "id",
    header: "Kacheri Number",
    meta: { width: "5%" },
    cell: ({ getValue }) => String(getValue()).padStart(5, "0"),
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
    cell: ({ row }) => (row.original.session == 1 ? "Yes" : "No"),
  },
  {
    accessorKey: "session_convened",
    header: "Session Convened",
    meta: { width: "5%" },
  },
  {
    id: "actions",
    header: "Actions",
    meta: { width: "20%" },
    enableSorting: false,
    cell: ({ row }) => {
      const complaintAllowed = isComplaintAllowed(
        row.original.kachehri_date,
        row.original.kachehri_time,
      );
      const reopenComplaintAllowed = isReopenComplaintAllowed(
        row.original.complaint_window_reset_at,
      );

      // NEW: combined into a single flag — avoids rendering "Add Complaint" twice
      const canAddComplaintAsDfp = complaintAllowed || reopenComplaintAllowed;

      return (
        <div className="flex items-center gap-2">
          <ActionDropdown>
            <DropdownItem
              as={Link}
              to={`/kachehries/${row.original.id}`}
              icon={<Eye size={16} className="text-blue-500" />}
            >
              View
            </DropdownItem>

            {user?.roleId !== 2 && (
              <DropdownItem
                as={Link}
                to={`/kachehries/${row.original.id}/edit`}
                icon={<Pencil size={16} className="text-amber-500" />}
              >
                Edit
              </DropdownItem>
            )}
            {user?.roleId !== 2 && (
              <DropdownItem
                as={Link}
                to={`/complaints/create/${row.original.uuid}`}
                icon={<PlusCircle size={16} className="text-green-600" />}
              >
                Add Complaint
              </DropdownItem>
            )}

            <div className="my-1 border-t border-gray-100" />

            {/* CHANGED: single condition instead of two duplicate blocks */}
            {user?.roleId === 2 && canAddComplaintAsDfp && (
              <DropdownItem
                as={Link}
                to={`/complaints/create/${row.original.uuid}`}
                icon={<PlusCircle size={16} className="text-green-600" />}
              >
                Add Complaint
              </DropdownItem>
            )}

            {user?.roleId !== 2 &&
              !complaintAllowed &&
              !row.original.complaint_window_reset_at && (
                <DropdownItem
                  onClick={() => handleReopenComplaint(row.original.id)}
                  icon={<RotateCcw size={16} className="text-orange-500" />}
                >
                  Reopen Complaint
                </DropdownItem>
              )}

            <div className="my-1 border-t border-gray-100" />

            <DropdownItem
              as={Link}
              to={`/complaints/all/${row.original.id}`}
              icon={<List size={16} className="text-indigo-500" />}
            >
              All Complaints
            </DropdownItem>
          </ActionDropdown>
        </div>
      );
    },
  },
];

const EkacheriIndex = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const handleReopenComplaint = async (id) => {
    try {
      const response = await kachehriComplainReopen(id);
      toast.success(
        response?.data?.message || "Complaint window reopened successfully.",
      );
      queryClient.invalidateQueries({ queryKey: ["ekachehries"] });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to reopen complaint.",
      );
      console.error(error);
    }
  };

  const columns = getColumns(user, handleReopenComplaint); // CHANGED: pass the handler through

  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">EKacheri</h1>
          <p className="no-print mt-1 text-sm text-gray-500">
            View and manage all ekacheri.
          </p>
        </div>

        {user?.roleId !== 2 && (
          <Link
            to="/kachehries/create"
            className="no-print rounded-lg bg-[#fab421] px-4 py-2 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
          >
            + Add EKacheri
          </Link>
        )}
      </div>
      <DataTable
        columns={columns}
        fetchData={getEkachehries}
        queryKey="ekachehries"
        pageSize={10}
        searchPlaceholder="Search e-kachehries…"
        showExportButtons={false}
      />
    </div>
  );
};

export default EkacheriIndex;