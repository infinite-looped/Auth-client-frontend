import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";



const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where the user wanted to go before being redirected to login
  const from = location.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handles controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Sanitize input
    const sanitizedData = {
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };

    try {
      await login(sanitizedData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth login (redirect path handled safely)
  const handleGoogleLogin = () => {
    const redirect = encodeURIComponent(from);
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/oauth/google?redirect=${redirect}`;
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-96 rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full rounded border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black py-3 font-medium text-white transition hover:bg-gray-800 disabled:bg-gray-400"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded border border-gray-300 py-3 font-medium transition hover:bg-gray-50 disabled:opacity-50"
        >
          Google
        </button>
        <p style={{ marginTop: 16 }}>
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "blue" }}>
            Sign up
          </a>
        </p>

      </form>
    </div>
  );
};

export default Login;
