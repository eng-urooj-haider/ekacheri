import { Link, useNavigate, useParams } from "react-router";
import { getUserById } from "../../data/users";

const DetailRow = ({ label, children }) => (
  <div className="flex flex-col gap-1 border-b border-white/[0.06] px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
      {label}
    </span>
    <span className="text-sm text-gray-200">{children}</span>
  </div>
);

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUserById(id);

  if (!user) {
    return (
      <div className="w-full min-w-0">
        <div className="rounded-2xl bg-[#0c0c0d] px-6 py-12 text-center ring-1 ring-white/[0.07]">
          <p className="text-sm text-gray-400">User not found.</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center rounded-xl bg-[#fab421] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#e5a31e]"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-800"
          >
            <span aria-hidden>←</span>
            Back to Users
          </button>
          <h1 className="text-xl font-semibold text-gray-900">View User</h1>
          <p className="mt-1 text-sm text-gray-500">
            Details for {user.name}
          </p>
        </div>

        <Link
          to={`/users/${user.id}/edit`}
          className="inline-flex items-center rounded-xl bg-[#fab421] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#e5a31e]"
        >
          Edit User
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        <div className="border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#fab421]/10 text-base font-semibold text-[#fab421] ring-1 ring-[#fab421]/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-base font-semibold text-white">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <DetailRow label="Name">{user.name}</DetailRow>
        <DetailRow label="Email">{user.email}</DetailRow>
        <DetailRow label="Status">
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
              user.status === "active"
                ? "bg-emerald-400/10 text-emerald-400"
                : "bg-gray-500/10 text-gray-400"
            }`}
          >
            {user.status}
          </span>
        </DetailRow>
        <DetailRow label="Joined">{user.joined}</DetailRow>
      </div>
    </div>
  );
};

export default ViewUser;
