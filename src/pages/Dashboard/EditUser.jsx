import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getUserById } from "../../data/users";

const inputClassName =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500 transition focus:border-[#fab421]/40 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[#fab421]/20";

const labelClassName =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-gray-500";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUserById(id);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    status: user?.status ?? "active",
    joined: user?.joined ?? "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with API call when backend is ready
    console.log("Updated user:", { id: user.id, ...form });
    navigate(`/users/${user.id}`);
  };

  return (
    <div className="w-full min-w-0">
      <div className="mb-6">
        <button
          type="button"
          onClick={() => navigate(`/users/${user.id}`)}
          className="mb-3 inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-gray-800"
        >
          <span aria-hidden>←</span>
          Back to User
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Edit User</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update details for {user.name}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]"
      >
        <div className="grid gap-5 border-b border-white/[0.06] p-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClassName}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="status" className={labelClassName}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClassName}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label htmlFor="joined" className={labelClassName}>
              Joined Date
            </label>
            <input
              id="joined"
              name="joined"
              type="date"
              value={form.joined}
              onChange={handleChange}
              required
              className={inputClassName}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 px-5 py-4">
          <Link
            to={`/users/${user.id}`}
            className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 ring-1 ring-white/[0.08] transition hover:bg-white/[0.04] hover:text-gray-200"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center rounded-xl bg-[#fab421] px-4 py-2.5 text-sm font-medium text-black transition hover:bg-[#e5a31e]"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
