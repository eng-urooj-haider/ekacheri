import { Link } from "react-router";

const Show = () => {
  return (
    <div className="mx-auto w-full max-w-2xl min-w-0">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Link to="/focal-persons" className="transition hover:text-gray-300">
          Focal Persons
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Ahmed Raza</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
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
            <h1 className="text-xl font-semibold text-gray-900">Ahmed Raza</h1>
            <p className="mt-0.5 text-sm text-gray-500">
              Department Focal Person details
            </p>
          </div>
        </div>

        <Link
          to="/focal-persons/1/edit"
          className="shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 ring-1 ring-white/[0.08] transition hover:bg-white/[0.05]"
        >
          Edit
        </Link>
      </div>

      {/* Details card */}
      <div className="w-full rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        <dl className="divide-y divide-white/[0.06]">
          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Name
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">Ahmed Raza</dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Email
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">
              ahmed.raza@ssgc.com.pk
            </dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Gender
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">Male</dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Telco
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">Jazz</dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Mobile
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">03001234567</dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Executive Number
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">EXEC-2045</dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Designation
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">
              Senior Manager
            </dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Department
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">
              Customer Services
            </dd>
          </div>
        </dl>
      </div>

      {/* Back link */}
      <div className="mt-5">
        <Link
          to="/focal-persons"
          className="text-sm text-gray-400 transition hover:text-gray-200"
        >
          ← Back to all focal persons
        </Link>
      </div>
    </div>
  );
};

export default Show;