import { Navigate, Outlet } from "react-router";
import { useUser } from "../../context/UserContext.jsx";

const AuthLoadingScreen = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(250,180,33,0.06),transparent_60%),linear-gradient(180deg,#0c0c0d_0%,#080808_100%)]">
    {/* Spinner: amber arc on a dim ring */}
    <div className="relative size-12">
      <div className="absolute inset-0 rounded-full border-[3px] border-white/[0.08]" />
      <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#fab421]" />
    </div>

    <div className="text-center">
      <p className="text-sm font-medium text-gray-700">Checking your session…</p>
      <p className="mt-1 text-xs text-gray-500">This will only take a moment.</p>
    </div>
  </div>
);

const ProtectedRoute = () => {
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;