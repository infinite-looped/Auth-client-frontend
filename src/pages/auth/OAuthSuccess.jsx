import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

/**
 * OAuthSuccess Page
 * Finalizes OAuth login after backend redirect
 */
const OAuthSuccess = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {
    // 1. Wait for AuthContext to finish initial load
    if (loading) return;

    // 2. Success Condition
    if (isAuthenticated) {
      const redirectTo = searchParams.get("redirect") || "/dashboard";
      navigate(redirectTo, { replace: true });
      return;
    }

    // 3. Failure Condition
    // Not loading AND not authenticated means login attempt failed
    setLoginFailed(true);
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000); // 3-second delay so user sees the message

    return () => clearTimeout(timer);
  }, [loading, isAuthenticated, navigate, searchParams]);

  if (loginFailed) {
    return (
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <p className="text-lg font-semibold text-red-600">Login Failed</p>
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      <p className="font-medium text-gray-600">Completing secure login…</p>
    </div>
  );
};

export default OAuthSuccess;
