import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

/**
 * OAuthSuccess Page
 * Finalizes OAuth login after backend redirect
 */
const OAuthSuccess = () => {
  const { refresh } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const finalizeOAuthLogin = async () => {
      try {
        /**
         * Backend already:
         * - Verified OAuth provider
         * - Created / linked user
         * - Set refresh token cookie
         *
         * We now:
         * - Validate session via refresh()
         * - Restore user state
         */
        await refresh();

        // Safe redirect handling
        const redirectTo = searchParams.get("redirect") || "/dashboard";
        navigate(redirectTo, { replace: true });
      } catch (err) {
        console.error("OAuth verification failed:", err);
        navigate("/login", { replace: true });
      }
    };

    finalizeOAuthLogin();
  }, [navigate, refresh, searchParams]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent" />
      <p className="font-medium text-gray-600">
        Completing secure login…
      </p>
    </div>
  );
};

export default OAuthSuccess;
