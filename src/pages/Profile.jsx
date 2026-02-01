import { useAuth } from "../features/auth/hooks/useAuth";

/**
 * Profile Page
 * Displays authenticated user's profile information
 */
const Profile = () => {
  const { user, loading } = useAuth();

  // Safety: ProtectedRoute already blocks unauth users,
  // this is just a guard against edge cases
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Profile
      </h1>

      <div className="rounded-lg border bg-white p-6 shadow-sm space-y-4">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium text-gray-800">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Roles</p>
          <p className="font-medium text-gray-800">
            {user.roles?.join(", ") || "User"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email Verified</p>
          <p className="font-medium text-gray-800">
            {user.isEmailVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
