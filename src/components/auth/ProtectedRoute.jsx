import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await api.get("/user"); // or "/me"
        console.log(user);
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
