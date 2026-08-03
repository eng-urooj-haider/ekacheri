import { Link } from "react-router";

export default function FormLayout({ heading, icon, listPath, listLabel, children, wide = false }) {
  return (
    <div>
      <div className={`mx-auto w-full min-w-0 ${wide ? "max-w-2xl" : "max-w-lg"}`}>
        {/* Breadcrumb */}
        <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
          <Link to={listPath} className="transition hover:text-[#F5821F]">
            {listLabel}
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-400">{heading}</span>
        </div>

        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F5821F]/10 ring-1 ring-[#F5821F]/20">
            <span className="flex size-5 items-center justify-center text-[#F5821F] [&_svg]:size-5">
              {icon}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{heading}</h1>
          </div>
        </div>

        {/* Form card */}
        <div className="w-full rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}