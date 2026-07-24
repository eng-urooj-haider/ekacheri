import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const AuthLoadingScreen = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(250,180,33,0.06),transparent_60%),linear-gradient(180deg,#0c0c0d_0%,#080808_100%)]">
    <div className="relative size-12">
      <div className="absolute inset-0 rounded-full border-[3px] border-white/[0.08]" />
      <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#fab421]" />
    </div>
    <div className="text-center">
      <p className="text-sm font-medium text-gray-300">
        Checking your session…
      </p>
      <p className="mt-1 text-xs text-gray-500">
        This will only take a moment.
      </p>
    </div>
  </div>
);

const GuestRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/user");
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <AuthLoadingScreen />;
  }

  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;