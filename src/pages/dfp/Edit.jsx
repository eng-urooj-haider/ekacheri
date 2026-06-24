import { Link } from "react-router";

const AddDepartmentFocalPerson = () => {
  return (
    <div className="mx-auto w-full max-w-2xl min-w-0">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Link to="/focal-persons" className="transition hover:text-gray-300">
          Focal Persons
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Edit Department Focal Person</span>
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
              d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Edit Department Focal Person
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="w-full rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        <form className="px-7 py-7">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Name <span className="text-[#fab421]">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Ahmed Raza"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Email <span className="text-[#fab421]">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@ssgc.com.pk"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Gender <span className="text-[#fab421]">*</span>
              </label>
              <div className="relative">
                <select
                  id="gender"
                  defaultValue=""
                  className="w-full appearance-none rounded-xl bg-white/[0.04] px-3.5 py-2.5 pr-9 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
                >
                  <option value="" disabled className="bg-[#1a1a1b] text-gray-500">
                    Select Gender
                  </option>
                  <option value="male" className="bg-[#1a1a1b] text-gray-200">
                    Male
                  </option>
                  <option value="female" className="bg-[#1a1a1b] text-gray-200">
                    Female
                  </option>
                  <option value="other" className="bg-[#1a1a1b] text-gray-200">
                    Other
                  </option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
              />
            </div>

            {/* Telco */}
            <div>
              <label
                htmlFor="telco"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Telco <span className="text-[#fab421]">*</span>
              </label>
              <div className="relative">
                <select
                  id="telco"
                  defaultValue=""
                  className="w-full appearance-none rounded-xl bg-white/[0.04] px-3.5 py-2.5 pr-9 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
                >
                  <option value="" disabled className="bg-[#1a1a1b] text-gray-500">
                    Select Telco
                  </option>
                  <option value="jazz" className="bg-[#1a1a1b] text-gray-200">
                    Jazz
                  </option>
                  <option value="zong" className="bg-[#1a1a1b] text-gray-200">
                    Zong
                  </option>
                  <option value="ufone" className="bg-[#1a1a1b] text-gray-200">
                    Ufone
                  </option>
                  <option value="telenor" className="bg-[#1a1a1b] text-gray-200">
                    Telenor
                  </option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Mobile <span className="text-[#fab421]">*</span>
              </label>
              <input
                id="mobile"
                type="tel"
                placeholder="e.g. 03001234567"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
              />
            </div>

            {/* Executive number */}
            <div>
              <label
                htmlFor="executive-number"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Executive Number <span className="text-[#fab421]">*</span>
              </label>
              <input
                id="executive-number"
                type="text"
                placeholder="e.g. EXEC-2045"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
              />
            </div>

            {/* Designation */}
            <div>
              <label
                htmlFor="designation"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Designation <span className="text-[#fab421]">*</span>
              </label>
              <input
                id="designation"
                type="text"
                placeholder="e.g. Senior Manager"
                className="w-full rounded-xl bg-white/[0.04] px-3.5 py-2.5 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 placeholder:text-gray-500 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
              />
            </div>

            {/* Department */}
            <div className="sm:col-span-2">
              <label
                htmlFor="department"
                className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500"
              >
                Department <span className="text-[#fab421]">*</span>
              </label>
              <div className="relative">
                <select
                  id="department"
                  defaultValue=""
                  className="w-full appearance-none rounded-xl bg-white/[0.04] px-3.5 py-2.5 pr-9 text-sm text-gray-200 ring-1 ring-white/[0.07] transition-all duration-200 focus:bg-white/[0.06] focus:outline-none focus:ring-[#fab421]/25"
                >
                  <option value="" disabled className="bg-[#1a1a1b] text-gray-500">
                    Select Department
                  </option>
                  <option value="customer-services" className="bg-[#1a1a1b] text-gray-200">
                    Customer Services
                  </option>
                  <option value="field-operations" className="bg-[#1a1a1b] text-gray-200">
                    Field Operations
                  </option>
                  <option value="billing" className="bg-[#1a1a1b] text-gray-200">
                    Billing
                  </option>
                  <option value="it" className="bg-[#1a1a1b] text-gray-200">
                    IT
                  </option>
                </select>
                <svg
                  className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex items-center justify-end gap-3 border-t border-white/[0.06] pt-6">
            <Link
              to="/focal-persons"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-lg bg-[#fab421] px-5 py-2.5 text-sm font-medium text-black shadow-sm transition hover:bg-[#fab421]/90"
            >
              Update Focal Person
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentFocalPerson;