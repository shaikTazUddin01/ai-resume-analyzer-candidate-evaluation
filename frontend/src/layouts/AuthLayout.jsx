import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthLayout = () => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default AuthLayout;