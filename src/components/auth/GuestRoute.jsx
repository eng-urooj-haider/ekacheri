import { Navigate, Outlet } from "react-router";
import { useUser } from "../../context/UserContext.jsx";

const AuthLoadingScreen = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[radial-gradient(ellipse_120%_60%_at_50%_-10%,rgba(245,130,31,0.08),transparent_60%),linear-gradient(180deg,#FAFAF8_0%,#F3F2EF_100%)]">
    <div className="relative size-12">
      <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
      <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#F5821F]" />
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
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;