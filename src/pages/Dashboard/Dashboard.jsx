/**
 * E-Kachehri Dashboard — stat cards wired to real data, bar chart wired to
 * real monthly kachehri counts, line chart wired to real complaint trend.
 * Light theme matching the SSGC flame color palette.
 */
import {
  getDashboardStats,
  getKachehriMonthly,
  getComplaintMonthly,
  getComplaintStatus,
  getTotalCity,
  getTotalDfp,
} from "../../api/DashboardApi.js";
import { useEffect, useState } from "react";

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

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    total_kachehri: 0,
    kachehri_this_month: 0,
    total_complaint: 0,
    complaint_this_month: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const [barData, setBarData] = useState([]);
  const [loadingBarData, setLoadingBarData] = useState(true);

  const [lineData, setLineData] = useState([]);
  const [loadingLineData, setLoadingLineData] = useState(true);

  const [complaintStatusData, setComplaintStatusData] = useState({
    openCount: 0,
    closeCounts: 0,
  });
  const [loadingStatus, setLoadingStatus] = useState(true);

  const [totalCity, setTotalCity] = useState(0);
  const [loadingCity, setLoadingCity] = useState(true);

  const [totalDfp, setTotalDfp] = useState(0);
  const [loadingDfp, setLoadingDfp] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await getDashboardStats();
        setDashboardStats(response);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const response = await getKachehriMonthly();
        setBarData(response);
      } catch (err) {
        console.error("Failed to load monthly kachehri data:", err);
      } finally {
        setLoadingBarData(false);
      }
    };
    fetchMonthly();
  }, []);

  useEffect(() => {
    const fetchComplaintMonthly = async () => {
      try {
        const response = await getComplaintMonthly();
        setLineData(response);
      } catch (err) {
        console.error("Failed to load monthly complaint data:", err);
      } finally {
        setLoadingLineData(false);
      }
    };
    fetchComplaintMonthly();
  }, []);

  useEffect(() => {
    const fetchComplaintStatus = async () => {
      try {
        const response = await getComplaintStatus();
        setComplaintStatusData(response);
      } catch (err) {
        console.error("Failed to load complaint status breakdown:", err);
      } finally {
        setLoadingStatus(false);
      }
    };
    fetchComplaintStatus();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await getTotalCity();
        setTotalCity(response.city);
      } catch (err) {
        console.error("Failed to load total city count:", err);
      } finally {
        setLoadingCity(false);
      }
    };
    fetchCity();
  }, []);

  useEffect(() => {
    const fetchDfp = async () => {
      try {
        const response = await getTotalDfp();
        setTotalDfp(response.dfp);
      } catch (err) {
        console.error("Failed to load total DFP count:", err);
      } finally {
        setLoadingDfp(false);
      }
    };
    fetchDfp();
  }, []);

  // CHANGED: each stat card now carries its own icon bg/text color pair,
  // matching the reference screenshot's per-category coloring
  const kachehriStatCard = {
    label: "Total E-Kachehris",
    value: loadingStats ? "…" : String(dashboardStats.total_kachehri),
    change: loadingStats ? "" : `↑ ${dashboardStats.kachehri_this_month}% this month`,
    up: true,
    icon: kachehriIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  };

  const complaintStatCard = {
    label: "Total Complaints",
    value: loadingStats ? "…" : String(dashboardStats.total_complaint),
    change: loadingStats ? "" : `↑ ${dashboardStats.complaint_this_month}% this month`,
    up: true,
    icon: complaintIcon,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  };

  const openStatCard = {
    label: "Complaints Open",
    value: loadingStatus ? "…" : String(complaintStatusData.openCount ?? 0),
    change: loadingStatus ? "" : `${complaintStatusData.closeCounts ?? 0} resolved`,
    up: false,
    icon: openIcon,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  };

  const closeStatCard = {
    label: "Complaints Closed",
    value: loadingStatus ? "…" : String(complaintStatusData.closeCounts ?? 0),
    change: loadingStatus ? "" : `${complaintStatusData.openCount ?? 0} still open`,
    up: true,
    icon: complaintIcon,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  };

  const cityStatCard = {
    label: "City",
    value: loadingCity ? "…" : String(totalCity),
    up: true,
    icon: cityIcon,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  };

  const dfpStatCard = {
    label: "Department Focal Persons",
    value: loadingDfp ? "…" : String(totalDfp),
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
        {allStats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
          >
            <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor}`}>
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-500">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              {stat.change && (
                <p className={`mt-1 text-xs font-medium ${stat.up ? "text-emerald-600" : "text-red-500"}`}>
                  {stat.change}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Bar chart */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-800">
              E-Kachehris per Month
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Total sessions held each month in {new Date().getFullYear()}
            </p>
          </div>

          {loadingBarData ? (
            <div className="flex h-48 items-center justify-center text-xs text-gray-400">
              Loading…
            </div>
          ) : (
            <div className="flex items-end gap-2 h-48 px-1">
              {barData.map((d) => (
                <div
                  key={d.month}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                >
                  <span className="text-[10px] text-gray-500">{d.value}</span>
                  <div
                    className="w-full rounded-t-md bg-amber-400 transition-all duration-300"
                    style={{
                      height: `${Math.max((d.value / maxBar) * 100, d.value > 0 ? 4 : 0)}%`,
                    }}
                  />
                  <span className="text-[10px] text-gray-400">{d.month}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Line chart */}
        <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-800">
              Complaints Trend
            </h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Monthly complaint volume over the year
            </p>
          </div>

          {loadingLineData ? (
            <div className="flex h-48 items-center justify-center text-xs text-gray-400">
              Loading…
            </div>
          ) : (
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
          )}

          <div className="mt-2 flex justify-between px-1">
            {lineData.map((d) => (
              <span key={d.month} className="text-[10px] text-gray-400">
                {d.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;