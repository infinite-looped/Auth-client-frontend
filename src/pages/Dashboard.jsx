import { useAuth } from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "8px",
          width: "360px",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>
          Welcome 
        </h2>

        <p style={{ marginBottom: "20px", color: "#555" }}>
          {user?.email
            ? `You are logged in as ${user.email}`
            : "You are logged in"}
        </p>
        <div style={{ marginBottom: "15px" }}>
          <Link to="/profile">Go to Profile</Link>
        </div>        

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px",
            background: "black",
            color: "white",
            border: "1px solid black",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

