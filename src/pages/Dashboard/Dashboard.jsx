/**
 * E-Kachehri Dashboard — visual refresh: SSGC flame color system, colored
 * accent bars for at-a-glance status recognition, large readable type,
 * still backed by a single React Query call with skeleton loaders.
 */
import { useDashboardOverview } from "../../hooks/useDashboardOverview.js";

const kachehriIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const complaintIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const openIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const closedIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const cityIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const dfpIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

// Small filled triangle that points with the trend, instead of relying on
// a hand-typed "↑" character buried in the change string.
const TrendGlyph = ({ up }) => (
  <svg
    className={`size-4 shrink-0 ${up ? "text-emerald-600" : "text-red-500"}`}
    viewBox="0 0 12 12"
    fill="currentColor"
  >
    {up ? <path d="M6 2l4 6H2l4-6z" /> : <path d="M6 10L2 4h8l-4 6z" />}
  </svg>
);

// Skeleton for a single stat card — mirrors the real card's accent bar
const StatCardSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
    <div className="absolute inset-y-0 left-0 w-1 bg-gray-200" />
    <div className="flex items-start gap-4">
      <div className="size-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
      <div className="min-w-0 flex-1 space-y-2.5">
        <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-20 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  </div>
);

// Skeleton for the bar/line chart panels
const ChartSkeleton = () => (
  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
    <div className="mb-6 space-y-2">
      <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-60 animate-pulse rounded bg-gray-200" />
    </div>
    <div className="flex h-48 items-end gap-2 px-1">
      {[40, 65, 30, 80, 55, 70].map((h, i) => (
        <div
          key={i}
          className="w-full animate-pulse rounded-t-md bg-gray-200"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useDashboardOverview();

  const stats = data?.stats ?? {
    total_kachehri: 0,
    kachehri_this_month: 0,
    total_complaint: 0,
    complaint_this_month: 0,
  };
  const barData = data?.kachehriMonthly ?? [];
  const lineData = data?.complaintMonthly ?? [];
  const complaintStatusData = data?.complaintStatus ?? { openCount: 0, closeCounts: 0 };
  const totalCity = data?.city ?? 0;
  const totalDfp = data?.dfp ?? 0;

  // Each card carries an `accent` key (left border + icon ring color family)
  // so its category reads by color alone, not just by the label text —
  // useful for at-a-glance scanning from a distance.
  const kachehriStatCard = {
    label: "Total E-Kachehris",
    value: String(stats.total_kachehri),
    change: `${stats.kachehri_this_month} kachehris created this month`,
    changeUp: true,
    icon: kachehriIcon,
    accent: "blue",
  };

  const complaintStatCard = {
    label: "Total Complaints",
    value: String(stats.total_complaint),
    change: `${stats.complaint_this_month} complaints created this month`,
    changeUp: true,
    icon: complaintIcon,
    accent: "amber",
  };

  const openStatCard = {
    label: "Complaints Open",
    value: String(complaintStatusData.openCount ?? 0),
    change: `${complaintStatusData.closeCounts ?? 0} complaints resolved`,
    changeUp: true, // this line reports good news (resolved count) — green
    icon: openIcon,
    accent: "red",
  };

  const closeStatCard = {
    label: "Complaints Closed",
    value: String(complaintStatusData.closeCounts ?? 0),
    change: `${complaintStatusData.openCount ?? 0} still open`,
    changeUp: false, // the one line that's a warning — red
    icon: closedIcon,
    accent: "emerald",
  };

  const cityStatCard = {
    label: "Cities Covered",
    value: String(totalCity),
    icon: cityIcon,
    accent: "orange",
  };

  const dfpStatCard = {
    label: "Department Focal Persons",
    value: String(totalDfp),
    icon: dfpIcon,
    accent: "indigo",
  };

  const allStats = [
    kachehriStatCard,
    complaintStatCard,
    openStatCard,
    closeStatCard,
    cityStatCard,
    dfpStatCard,
  ];

  // Tailwind needs full class names present in source to generate them —
  // this map keeps every accent's classes static and greppable.
  const ACCENTS = {
    blue: { bar: "bg-blue-500", iconBg: "bg-blue-50", iconText: "text-blue-600", ring: "ring-blue-100" },
    amber: { bar: "bg-amber-500", iconBg: "bg-amber-50", iconText: "text-amber-600", ring: "ring-amber-100" },
    red: { bar: "bg-red-500", iconBg: "bg-red-50", iconText: "text-red-600", ring: "ring-red-100" },
    emerald: { bar: "bg-emerald-500", iconBg: "bg-emerald-50", iconText: "text-emerald-600", ring: "ring-emerald-100" },
    orange: { bar: "bg-orange-500", iconBg: "bg-orange-50", iconText: "text-orange-600", ring: "ring-orange-100" },
    indigo: { bar: "bg-indigo-500", iconBg: "bg-indigo-50", iconText: "text-indigo-600", ring: "ring-indigo-100" },
  };

  const maxBar = Math.max(1, ...barData.map((d) => d.value));
  const maxLine = Math.max(1, ...lineData.map((d) => d.value));
  const linePoints = lineData.map((d) => 10 + (d.value / maxLine) * 80);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        </div>
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
          <p className="text-base text-red-600">
            Couldn't load dashboard data{error?.message ? `: ${error.message}` : "."}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <div className="mt-2 h-1 w-14 rounded-full bg-gradient-to-r from-[#F5821F] to-[#D9631A]" />
          <p className="mt-3 text-sm text-gray-500">
            Overview of E-Kachehri sessions, complaints, and activity.
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-100">
            <span className="size-1.5 animate-pulse rounded-full bg-[#F5821F]" />
            Refreshing
          </span>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
          : allStats.map((stat) => {
              const a = ACCENTS[stat.accent];
              return (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className={`absolute inset-y-0 left-0 w-1.5 ${a.bar}`} />
                  <div className="flex items-start gap-4">
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-full ${a.iconBg} ${a.iconText} ring-4 ${a.ring}`}>
                      {stat.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-bold uppercase tracking-wide text-gray-500">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-5xl font-extrabold tracking-tight tabular-nums text-gray-900">
                        {stat.value}
                      </p>
                      {stat.change && (
                        <p className={`mt-2 flex items-center gap-1.5 text-lg font-semibold ${stat.changeUp ? "text-emerald-700" : "text-red-600"}`}>
                          <TrendGlyph up={stat.changeUp} />
                          {stat.change}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            {/* Bar chart */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    E-Kachehris per Month
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Total sessions held each month in {new Date().getFullYear()}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  Sessions
                </span>
              </div>

              <div className="flex items-end gap-2 h-48 px-1">
                {barData.map((d) => (
                  <div
                    key={d.month}
                    className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                  >
                    <span className="text-sm font-semibold text-gray-600">{d.value}</span>
                    <div
                      className="w-full rounded-t-md bg-amber-400 transition-all duration-300 group-hover:bg-[#F5821F]"
                      style={{
                        height: `${Math.max((d.value / maxBar) * 100, d.value > 0 ? 4 : 0)}%`,
                      }}
                    />
                    <span className="text-sm font-medium text-gray-400">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Line chart */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Complaints Trend
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Monthly complaint volume over the year
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-500">
                  <span className="size-2.5 rounded-full bg-[#F5821F]" />
                  Complaints
                </span>
              </div>

              <div className="h-48 w-full">
                <svg viewBox="0 0 300 160" preserveAspectRatio="none" className="h-full w-full">
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={i * 40 + 10}
                      x2="300"
                      y2={i * 40 + 10}
                      stroke="rgba(0,0,0,0.06)"
                      strokeWidth="1"
                    />
                  ))}

                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F5821F" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#F5821F" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <polygon
                    points={[
                      ...linePoints.map((y, i) => `${(i / (linePoints.length - 1)) * 300},${160 - y}`),
                      "300,160",
                      "0,160",
                    ].join(" ")}
                    fill="url(#areaGrad)"
                  />

                  <polyline
                    points={linePoints
                      .map((y, i) => `${(i / (linePoints.length - 1)) * 300},${160 - y}`)
                      .join(" ")}
                    fill="none"
                    stroke="#F5821F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {linePoints.map((y, i) => (
                    <circle
                      key={i}
                      cx={(i / (linePoints.length - 1)) * 300}
                      cy={160 - y}
                      r="3.5"
                      fill="white"
                      stroke="#F5821F"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              </div>

              <div className="mt-2 flex justify-between px-1">
                {lineData.map((d) => (
                  <span key={d.month} className="text-sm font-medium text-gray-400">
                    {d.month}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;