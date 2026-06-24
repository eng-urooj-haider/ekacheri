import { Link } from "react-router";

const ShowLocation = () => {
  return (
    <div className="mx-auto w-full max-w-2xl min-w-0">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Link to="/locations" className="transition hover:text-gray-300">
          Locations
        </Link>
        <span className="text-gray-600">/</span>
        <span className="text-gray-400">Gulshan-e-Iqbal</span>
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
                d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Gulshan-e-Iqbal
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">Location details</p>
          </div>
        </div>

        <Link
          to="/locations/1/edit"
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
              City
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">Karachi</dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Location
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">
              Gulshan-e-Iqbal
            </dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Created At
            </dt>
            <dd className="col-span-2 text-sm text-gray-200">2023-11-03</dd>
          </div>

          <div className="grid grid-cols-3 gap-4 px-7 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
              Status
            </dt>
            <dd className="col-span-2">
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                Active
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Back link */}
      <div className="mt-5">
        <Link
          to="/locations"
          className="text-sm text-gray-400 transition hover:text-gray-200"
        >
          ← Back to all locations
        </Link>
      </div>
    </div>
  );
};

export default ShowLocation;