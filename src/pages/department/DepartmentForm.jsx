import { Link } from "react-router";

export default function DepartmentForm({ handleChange, handleSubmit, errors , formData }) {
  return (
    <div>
      <div className="mx-auto w-full max-w-lg min-w-0">
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
          <Link to="/departments" className="transition hover:text-gray-300">
            Departments
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">Add Department</span>
        </div>

        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fab421]/10 ring-1 ring-[#fab421]/20">
            <svg
              className="size-5 text-[#fab421]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="10"
                r="2.4"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Add Department
            </h1>
          </div>
        </div>

        {/* Form card */}
        <div className="w-full rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
          <form className="px-7 py-7" noValidate onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="department-name"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Title <span className="text-[#fab421]">*</span>
              </label>
              <input
                onChange={handleChange}
                id="department-name"
                name="title"
                value={formData.title}
                type="text"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25 disabled:opacity-50"
              />
              {errors && <p className="text-red-600">{errors.title}</p>}
            </div>

            <div className="mt-6">
              <label
                htmlFor="department-email"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Email Addresses <span className="text-[#fab421]">*</span>
              </label>
              <input
                onChange={handleChange}
                id="department-email"
                name="email_addresses"
                type="text"
                value={formData.email_addresses}
                placeholder="e.g. hr@company.com"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25 disabled:opacity-50"
              />
              {errors && <p className="text-red-600">{errors.email_addresses}</p>}
            </div>

            {/* Actions */}
            <div className="mt-7 flex items-center justify-end gap-3 border-t border-white/[0.06] pt-6">
              <Link
                to="/departments"
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-[#fab421] px-5 py-2.5 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Save Department
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
