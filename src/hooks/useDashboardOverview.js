import { useQuery } from "@tanstack/react-query";
import { getDashboardOverview } from "../api/DashboardApi.js";

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: getDashboardOverview,
    staleTime: 60 * 1000, // data considered fresh for 1 min — no refetch on quick revisits
    refetchOnWindowFocus: true, // auto-refresh when user tabs back in
    retry: 1, // retry once on failure before showing an error
  });
};