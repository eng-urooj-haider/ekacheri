import { Link } from "react-router";

export default function LayoutForm({
  heading,
  breadcrumb = "Cities",
  breadcrumbLink = "/cities",
  children,
}) {
  return (
    <div className="mx-auto w-full max-w-lg min-w-0">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Link to={breadcrumbLink} className="transition hover:text-gray-300">
          {breadcrumb}
        </Link>

        <span className="text-gray-600">/</span>

        <span className="text-gray-400">{heading}</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fab421]/10 ring-1 ring-[#fab421]/20">
          <svg
            className="size-5 text-[#fab421]"
            viewBox="0 0 24 24"
            fill="none"
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
            {heading}
          </h1>
        </div>
      </div>

      {/* Form Card */}
      <div className="w-full rounded-2xl bg-[#0c0c0d] ring-1 ring-white/[0.07]">
        {children}
      </div>
    </div>
  );
}