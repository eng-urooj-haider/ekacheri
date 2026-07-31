/**
 * E-Kachehri Dashboard — now backed by a single React Query call
 * (getDashboardOverview) instead of 6 separate useEffect fetches,
 * with skeleton loaders instead of "…" / "Loading…" text.
 */
import { useDashboardOverview } from "../../hooks/useDashboardOverview.js";

const kachehriIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const complaintIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const openIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const cityIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const dfpIcon = (
  <svg className="size-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

// Skeleton for a single stat card
const StatCardSkeleton = () => (
  <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
    <div className="size-12 shrink-0 animate-pulse rounded-full bg-gray-200" />
    <div className="min-w-0 flex-1 space-y-2">
      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
      <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-28 animate-pulse rounded bg-gray-200" />
    </div>
  </div>
);

// Skeleton for the bar/line chart panels
const ChartSkeleton = () => (
  <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
    <div className="mb-4 space-y-2">
      <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-56 animate-pulse rounded bg-gray-200" />
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

  const kachehriStatCard = {
    label: "Total E-Kachehris",
    value: String(stats.total_kachehri),
    change: `↑ ${stats.kachehri_this_month} kachehries created this month`,
    changeUp: true,
    icon: kachehriIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  };

  const complaintStatCard = {
    label: "Total Complaints",
    value: String(stats.total_complaint),
    change: `↑ ${stats.complaint_this_month} complaints created this month`,
    changeUp: true,
    icon: complaintIcon,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  };

  const openStatCard = {
    label: "Complaints Open",
    value: String(complaintStatusData.openCount ?? 0),
    change: `${complaintStatusData.closeCounts ?? 0} complaints resolved`,
    changeUp: true, // green — resolved is good news
    icon: openIcon,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
  };

  const closeStatCard = {
    label: "Complaints Closed",
    value: String(complaintStatusData.closeCounts ?? 0),
    change: `${complaintStatusData.openCount ?? 0} still open`,
    changeUp: false, // red — the only warning line
    icon: complaintIcon,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  };
  const cityStatCard = {
    label: "City",
    value: String(totalCity),
    up: true,
    icon: cityIcon,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  };

  const dfpStatCard = {
    label: "Department Focal Persons",
    value: String(totalDfp),
    up: true,
    icon: dfpIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  };

  const allStats = [
    kachehriStatCard,
    complaintStatCard,
    openStatCard,
    closeStatCard,
    cityStatCard,
    dfpStatCard,
  ];

  const maxBar = Math.max(1, ...barData.map((d) => d.value));
  const maxLine = Math.max(1, ...lineData.map((d) => d.value));
  const linePoints = lineData.map((d) => 10 + (d.value / maxLine) * 80);

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100">
          <p className="text-sm text-red-600">
            Couldn't load dashboard data{error?.message ? `: ${error.message}` : "."}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of E-Kachehri sessions, complaints, and activity.
          </p>
        </div>
        {isFetching && !isLoading && (
          <span className="text-xs text-gray-400">Refreshing…</span>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
          : allStats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100"
            >
              <div className={`flex size-12 shrink-0 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor}`}>
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-lg font-semibold uppercase tracking-[0.08em] text-gray-500">
                  {stat.label}
                </p>
                <p className="mt-1 text-4xl font-bold text-gray-900">
                  {stat.value}
                </p>
                {stat.change && (
                  <p className={`mt-1.5 text-lg font-semibold ${stat.changeUp ? "text-emerald-700" : "text-red-600"}`}>
                    {stat.change}
                  </p>
                )}
              </div>
            </div>
          ))}
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
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  E-Kachehris per Month
                </h2>
                <p className="mt-0.5 text-lg text-gray-500">
                  Total sessions held each month in {new Date().getFullYear()}
                </p>
              </div>

              <div className="flex items-end gap-2 h-48 px-1">
                {barData.map((d) => (
                  <div
                    key={d.month}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                  >
                    <span className="text-lg text-gray-500">{d.value}</span>
                    <div
                      className="w-full rounded-t-md bg-amber-400 transition-all duration-300"
                      style={{
                        height: `${Math.max((d.value / maxBar) * 100, d.value > 0 ? 4 : 0)}%`,
                      }}
                    />
                    <span className="text-lg text-gray-400">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Line chart */}
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Complaints Trend
                </h2>
                <p className="mt-0.5 text-lg text-gray-500">
                  Monthly complaint volume over the year
                </p>
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
                      <stop offset="0%" stopColor="#fab421" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#fab421" stopOpacity="0" />
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
                    stroke="#fab421"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {linePoints.map((y, i) => (
                    <circle
                      key={i}
                      cx={(i / (linePoints.length - 1)) * 300}
                      cy={160 - y}
                      r="3"
                      fill="#fab421"
                    />
                  ))}
                </svg>
              </div>

              <div className="mt-2 flex justify-between px-1">
                {lineData.map((d) => (
                  <span key={d.month} className="text-lg text-gray-400">
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