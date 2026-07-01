/**
 * E-Kachehri Dashboard — layout only, no state or logic.
 * Stat cards + bar chart placeholder + line chart placeholder.
 * Matches the dark/amber dashboard theme.
 */

const stats = [
  {
    label: "Total E-Kachehris",
    value: "124",
    change: "+8 this month",
    up: true,
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Total Complaints",
    value: "3,482",
    change: "+142 this month",
    up: true,
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Complaints Resolved",
    value: "2,914",
    change: "83% resolution rate",
    up: true,
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 4 12 14.01l-3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Complaints Open",
    value: "568",
    change: "-23 from last month",
    up: false,
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Total Attendees",
    value: "1,076",
    change: "+64 this month",
    up: true,
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Department Focal Persons",
    value: "38",
    change: "+2 this month",
    up: true,
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
];

const BAR_DATA = [
  { month: "Jan", value: 8 },
  { month: "Feb", value: 12 },
  { month: "Mar", value: 7 },
  { month: "Apr", value: 15 },
  { month: "May", value: 10 },
  { month: "Jun", value: 18 },
  { month: "Jul", value: 14 },
  { month: "Aug", value: 20 },
  { month: "Sep", value: 11 },
  { month: "Oct", value: 16 },
  { month: "Nov", value: 9 },
  { month: "Dec", value: 13 },
];

const LINE_POINTS = [60, 45, 70, 40, 80, 55, 90, 65, 75, 50, 85, 70];
const MAX_BAR = Math.max(...BAR_DATA.map((d) => d.value));

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of E-Kachehri sessions, complaints, and activity.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-start gap-4 rounded-2xl bg-[#0c0c0d] p-5 ring-1 ring-white/[0.07]"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fab421]/10 text-[#fab421] ring-1 ring-[#fab421]/20">
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-100">
                {stat.value}
              </p>
              <p className={`mt-1 text-xs font-medium ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Bar chart — E-Kachehris per month */}
        <div className="rounded-2xl bg-[#0c0c0d] p-5 ring-1 ring-white/[0.07]">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-200">
              E-Kachehris per Month
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Total sessions held each month in 2026
            </p>
          </div>

          {/* Bar chart body */}
          <div className="flex items-end gap-2 h-48 px-1">
            {BAR_DATA.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-md bg-[#fab421]/80 transition-all duration-300"
                  style={{ height: `${(d.value / MAX_BAR) * 100}%` }}
                />
                <span className="text-[10px] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line chart — Complaints trend */}
        <div className="rounded-2xl bg-[#0c0c0d] p-5 ring-1 ring-white/[0.07]">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-200">
              Complaints Trend
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Monthly complaint volume over the year
            </p>
          </div>

          {/* Line chart body — SVG */}
          <div className="h-48 w-full">
            <svg
              viewBox="0 0 300 160"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              {/* Grid lines */}
              {[0, 1, 2, 3].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40 + 10}
                  x2="300"
                  y2={i * 40 + 10}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* Area fill */}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fab421" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#fab421" stopOpacity="0" />
                </linearGradient>
              </defs>

              <polygon
                points={[
                  ...LINE_POINTS.map((y, i) => `${(i / (LINE_POINTS.length - 1)) * 300},${160 - y}`),
                  "300,160",
                  "0,160",
                ].join(" ")}
                fill="url(#areaGrad)"
              />

              {/* Line */}
              <polyline
                points={LINE_POINTS.map(
                  (y, i) => `${(i / (LINE_POINTS.length - 1)) * 300},${160 - y}`
                ).join(" ")}
                fill="none"
                stroke="#fab421"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {LINE_POINTS.map((y, i) => (
                <circle
                  key={i}
                  cx={(i / (LINE_POINTS.length - 1)) * 300}
                  cy={160 - y}
                  r="3"
                  fill="#fab421"
                />
              ))}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="mt-2 flex justify-between px-1">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
              (m) => (
                <span key={m} className="text-[10px] text-gray-500">
                  {m}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;