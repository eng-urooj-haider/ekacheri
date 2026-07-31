import api from "./axios.js";

// Single combined call — replaces the previous 6 separate functions.
export const getDashboardOverview = async () => {
  const response = await api.get("/dashboard/overview");
  return response.data;
  // {
  //   stats: { total_kachehri, kachehri_this_month, total_complaint, complaint_this_month },
  //   kachehriMonthly: [{ month, value }],
  //   complaintMonthly: [{ month, value }],
  //   complaintStatus: { openCount, closeCounts },
  //   city: number,
  //   dfp: number,
  // }
};