import { useLoading } from "../../context/LoadingContext";

const GlobalLoader = () => {
  const { loading } = useLoading();

  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#fab421] border-t-transparent"></div>
    </div>
  );
};

export default GlobalLoader;