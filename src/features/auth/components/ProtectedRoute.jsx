import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * ProtectedRoute Component
 * Prevents unauthorized users from accessing private routes.
 * Utilizes "Outlet" for nested routing.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 1. Prevent "Flash of Login Page"
  // During initial app load, we must wait for the silent refresh to finish.
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading session...</p> 
      </div>
    );
  }

  // 2. Redirect to Login
  // "state={{ from: location }}" saves the URL the user tried to visit.
  // "replace" prevents the user from hitting "back" into a protected route.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Grant Access
  return <Outlet />;
};

export default ProtectedRoute;